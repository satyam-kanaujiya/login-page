import express from "express";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
// app.use(cookieParser());

app.use("/api/v1/users",userRoute);

export default app;
