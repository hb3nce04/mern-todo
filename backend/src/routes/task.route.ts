import express from "express";

import { getTasks, addTask, deleteTask } from "../controllers/task.controller";

const router = express.Router();

router.get("/", getTasks);

router.post("/", addTask);

router.delete("/:id", deleteTask);

//router.put("/", addTask);

export default router;
