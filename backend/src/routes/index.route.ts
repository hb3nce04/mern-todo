import express, { Request, Response } from "express";

import authRoute from "./auth.route";
import tasksRoute from "./task.route";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
	res.send("OK");
});
router.use("/auth", authRoute);
router.use("/tasks", tasksRoute);

export default router;
