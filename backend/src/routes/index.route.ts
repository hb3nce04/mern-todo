import express from "express";

import authRoute from "./auth.route";
import tasksRoute from "./task.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/tasks", tasksRoute);

export default router;
