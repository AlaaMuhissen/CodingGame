import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import blocksRouter from './routes/blocks.routes.js'
import questionRouter from './routes/questions.routes.js'
import userRouter from './routes/users.routes.js'
import syllabusRouter from './routes/syllabus.routes.js'

import cors from 'cors'
const server = express();
server.use(cors({ origin: 'http://localhost:5173', credentials: true }));

dotenv.config();
server.use(express.json());

//Routers

server.use("/api/blocks" , blocksRouter)
server.use("/api" , questionRouter)
server.use("/api/user" , userRouter)
server.use("/api/syllabus" , syllabusRouter)
// server.use("/api/users" , )
// server.use("/api/questions" , )


//errors
server.use(errorHandler);

const PORT = process.env.PORT || 3000 ;
connectDB().then(()=>{
    console.log("connected to mongoo!")
    server.listen(PORT, ()=>
    console.log(`Server online at port ${PORT}`)
    )
})