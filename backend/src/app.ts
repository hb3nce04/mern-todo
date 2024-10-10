import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";

import routes from "./routes/index.route";
import { StatusCodes } from "http-status-codes";
import rateLimit from "express-rate-limit";

const app = express();

var corsOptions = {
	origin: "*",
};

const limiter = rateLimit({
	windowMs: 1000,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(
	process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);
app.use(limiter);
app.use(compression());
//passport.use();

app.use("/api", routes);

app.get("*", (req: Request, res: Response, next) => {
	res.sendStatus(StatusCodes.NOT_FOUND);
});

const createApp = async (mongoUri: string): Promise<Express> => {
	await mongoose.connect(mongoUri);
	return app;
};

export default createApp;
