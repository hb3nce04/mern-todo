import { createLogger, format, transports, log } from "winston";

const { Console } = transports;

const formats = [format.errors({ stack: true }), format.json()];

if (process.env.NODE_ENV !== "production") {
	formats.push(format.colorize());
}

const logger = createLogger({
	level: process.env.LOG_LEVEL || "info",
	format: format.combine(...formats),
	transports: [new transports.File({ dirname: "logs", filename: "log" })],
});

export default logger;
