import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { connectToMongo } from './db.js';
import dotenv from 'dotenv'
dotenv.config();

connectToMongo;

const app=express();
app.use(cors({
        origin:'http://localhost:3000/',
        credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//Routes
import userRouter from './routes/user.route.js'
import taskRouter from './routes/task.route.js'
import subTaskRouter from './routes/subtask.route.js'

app.use("/api/user",userRouter);
app.use("/api/task",taskRouter);
app.use("/api/subtask",subTaskRouter);

// Schedulars using Cron
import { updatingTaskPriority,callBasedOnUserPriority } from './schedulers/task.scheduler.js';
updatingTaskPriority();
callBasedOnUserPriority();

app.listen(process.env.PORT,()=>{
    console.log("Server running");
});