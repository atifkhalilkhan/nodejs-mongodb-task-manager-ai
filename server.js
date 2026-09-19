import express from "express";
import {config} from "dotenv";
import ConnectDB from "./config/db.js";
config();
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

await ConnectDB()


app.use(express.json());
app.use(cookieParser())

app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)

app.get("/",(req, res)=>{
    res.send("Hello Todo App")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})



