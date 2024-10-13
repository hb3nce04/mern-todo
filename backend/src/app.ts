import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import routes from "./routes/index.route";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/error-handler.middleware";
import createHttpError from "http-errors";
import { _ } from "./helpers/locale.helper";

const app = express();

var corsOptions = {
	origin: "*",
};

const limiter = rateLimit({
	windowMs: 1000,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(
	process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);
app.use(limiter);
app.use(compression());

app.use("/api", routes);

app.get("*", (req: Request, res: Response, next) => {
	throw createHttpError(
		StatusCodes.NOT_FOUND,
		_(req, "other", "RESOURCE_NOT_FOUND")
	);
});

app.use(errorHandler);

const createApp = async (mongoUri: string): Promise<Express> => {
	await mongoose.connect(mongoUri, {
		dbName: "todo",
	});
	return app;
};

export default createApp;
