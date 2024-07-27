import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJwt = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ","")
    ||req.body?.accessToken || req.headers["Authorization"];


    if(!token){
        return res.status(404).json({
            message:"token not found",
            success:false
        })
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

   const user = await User.findById(decodedToken?._id).select("-password");

   if(!user){
      return res.send(400).json({
        message:"incorrect token",
        success:false
      })
   }

   req.user = user;
   next();

});

export {verifyJwt};