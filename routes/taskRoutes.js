import {Router} from 'express';
import { GetTasks, CreateTask, GetTaskbyId, UpdateTask, DeleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get("/", authMiddleware, GetTasks)

router.post("/create", authMiddleware, CreateTask)

router.get("/:id",authMiddleware, GetTaskbyId)

router.put("/update/:id", authMiddleware, UpdateTask)

router.delete("/delete/:id", authMiddleware, DeleteTask)

export default router;