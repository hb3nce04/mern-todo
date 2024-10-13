import express from "express";

import { getTasks, addTask, deleteTask } from "../controllers/task.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { taskSchema } from "../utils/validation.util";

const router = express.Router();

router.get("/", getTasks);

router.post("/", validationMiddleware(taskSchema), addTask);

router.delete("/:id", deleteTask);

//router.put("/", addTask);

export default router;
