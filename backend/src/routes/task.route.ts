import express from "express";

import {
	getMyTasks,
	getMyTaskById,
	createMyTask,
	deleteMyTask,
	updateMyTask,
} from "../controllers/task.controller";
import { verifyJwtToken } from "../middlewares/jwt.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { taskSchema } from "../utils";

const router = express.Router();

// All routes in this file are protected
router.use(verifyJwtToken);

// Task routes
router.get("/", getMyTasks);
router.get("/:id", getMyTaskById);
router.post("/", validationMiddleware(taskSchema), createMyTask);
router.delete("/:id", deleteMyTask);
router.put("/:id", validationMiddleware(taskSchema), updateMyTask);

export default router;
