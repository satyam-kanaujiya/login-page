import dbConnect from "./src/db/dbConnect.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000

//db connection
dbConnect()
.then(
    app.listen(PORT,()=>{
        console.log(`Server is listening at port ${PORT}`);
    })
)
.catch((error)=>{
    console.log("Connection failed!");
    console.log(error);
})