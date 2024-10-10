import "dotenv/config";
import createApp from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;

createApp(process.env.MONGO_URI || "")
	.then((app) => {
		app.listen(PORT, () => {
			console.log(`Running on: http://localhost:${PORT}`);
			console.log(`Environment: ${process.env.NODE_ENV}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
