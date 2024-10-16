import express from "express";

import {
	getUserTasks,
	getUserTaskById,
	createUserTask,
	deleteUserTask,
	updateUserTask,
} from "../controllers/task.controller";
import verifyJwtToken from "../middlewares/jwt.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { taskSchema } from "../utils/validation.util";

const router = express.Router();

// All routes in this file are protected
router.use(verifyJwtToken);

// Task routes
router.get("/", getUserTasks);
router.get("/:id", getUserTaskById);
router.post("/", validationMiddleware(taskSchema), createUserTask);
router.delete("/:id", deleteUserTask);
router.put("/:id", validationMiddleware(taskSchema), updateUserTask);

export default router;
