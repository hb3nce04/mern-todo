import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
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

const app = express();

// TODO: http://localhost:5173
const corsOptions = { credentials: true, origin: "*" };

const limiter = rateLimit({
	windowMs: 1000,
});

app.use(
	process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.use("/api", routes);

app.get("*", (req: Request, res: Response, next) => {
	throw createHttpError(
		StatusCodes.NOT_FOUND,
		"The requested resource currently is not available"
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
