import express from 'express';     // nạp thư viện express
import dotenv from "dotenv";
import taskRoute from "./routers/tasksRouters.js"
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';
const app=express();               // gọi thư viện 
dotenv.config();                  // nạp file .env

const __dirname=path.resolve();
if(process.env.NODE_ENV !== "production"){
      app.use(cors({
      origin:"http://localhost:5173"
}))
}
app.use(express.json());                      // middwave kiểm tra có phải json không
app.use("/api/tasks",taskRoute)   

if(process.env.NODE_ENV === 'production'){
      app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
})

}
//thiết lập host và port và local
const port=process.env.PORT
connectDB().then(()=>{         //kết nôi rồi mới cho chạy port
      app.listen(port,()=>{
            console.log(`Example app listening ${port}`);
      })
})
