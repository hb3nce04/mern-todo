import express, { Request, Response } from "express";

import userRoute from "./user.route";
import authRoute from "./auth.route";
import tasksRoute from "./task.route";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
	res.send("OK");
});
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/tasks", tasksRoute);

export default router;
