import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessAndRefreshToken = (async(userId)=>{
    try {
        const user = await User.findById(userId);
    
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
    
        return {accessToken,refreshToken};
    } catch (error) {
        res.status(400).json({
            message:"something went wrong while generating tokens",
            success:false
        })
    }
})

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password,role} = req.body;

    //check if fields are empty
    if([username,email,password,role].some((field)=>{
            return field?.trim()==="";
        }))
    {
        // throw new ApiError(400,"Please fill all the field");
        return res.status(400).json({
            message:"Please fill all fields",
            success:false
        })
    }

    //check email is correct or not
    if(!email.includes('@'))
    {
        // throw new ApiError(400,"Please enter valid email");
        return res.status(400).json({
            message:"Please enter valid email",
            success:false
        })
    };

    //check existing user
    const existUser = await User.findOne({
        $and:[{username},{email}]
    });

    if(existUser)
    {
        return res.status(400).json({
            message:"user already exist",
            success:false
        })
    }

    const profileUrl = "";
    const user = await User.create(
        {
            username,
            email,
            password,
            role,
            profile:profileUrl
        }
    );

    const getUser = await User.findById(user._id).select("-password");

    if(!user){
        return res.status(400).json({
            message:"something went wrong while registering user",
            success:false
        })
    }
    res.status(201).json({
        message:"user registered successfully",
        data:getUser,
        success:true
    }
    );

});

const loginUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    //validation empty
    if([username,email,password].some((field)=>{
        return field?.trim()===""
    })){
        // throw new ApiError(401,"Please fill all the fields");
        return res.status(400).json({
            message:"please fill all the field",
            success:false
        })
    }

    //email verification
    if(!email.includes('@'))
    {
        throw new ApiError(401,"Please fill correct email");
    }

    //user exist or not

    const checkUser = await User.findOne({
        $and:[{username},{email}]
    });

    if(!checkUser)
    {
        return res.status(404).json({
            message:"user not found!",
            success:false
        })
    }

    //check password
    const checkPassword = await checkUser.isPosswordCorrect(password);

    if(!checkPassword)
    {
        return res.status(401).json({
            message:"Incorrect password",
            success:false
        })
    }

    const options = {
        httpOnly:true,
        secure:true
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(checkUser._id);
    

    const sendUser = await User.findById(checkUser._id).select(" -password -refreshToken");

    return res.cookie("refreshToken",refreshToken,options).status(200).cookie("accessToken",accessToken,options)
    .json({
        message:"user logged in successfully",
        data:sendUser,
        success:true,
        accessToken,
        refreshToken
    })

});

const logoutUser = asyncHandler(async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $set:{
                refreshToken : undefined
            }
        },
        {new:true});
        const options ={
            httpOnly:true,
            secure:true
        }
        res.clearCookie("accessToken",options).clearCookie("refreshToken").status(201).json({
            message:`${req.user.username} logged out successfully`,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:"logout failed!",
            success:false
        })
    }
});

const deleteUser = asyncHandler(async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.user._id,{new:true});

        const options = {
            httpOnly:true,
            secure:true
        }

        //optional
        // req.user = undefined; 
        
        res.status(201).clearCookie("accessToken",options).clearCookie("refreshToken",options).json({
            message:`${req.user?.username}'s account deleted and cookies cleared successfully`,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:"deletion failed!",
            success:false
        })
    }
});

const refreshUserToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.header("Authorization")?.replace("Bearer ","");


    if(!incomingRefreshToken){
        return res.status(401).json({
              message:"Refresh token expired or used",
              success:false
          })
      }

    const decoded = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded?._id);
    
    if(!user){
      return res.status(401).json({
            message:"Invalid token",
            success:false
        })
    }


    if(incomingRefreshToken!==user?.refreshToken)
    {
        return res.status(401).json({
            message:"Incorrect token",
            success:false
        })
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

    user.refreshToken = refreshToken // optional
    const options = {
        httpOnly:true,
        secure:true
    }

   return res.status(201).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({
        message:"access token refreshed successfully",
        success:true,
        accessToken,
        refreshToken:refreshToken
    })

});

export {registerUser,loginUser,logoutUser,deleteUser,refreshUserToken};