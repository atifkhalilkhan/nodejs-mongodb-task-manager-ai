import express from "express";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Hello Todo App");
});

export default app;