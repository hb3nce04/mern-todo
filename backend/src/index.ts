import "dotenv/config";
import createApp from "./app";

const PORT = process.env.PORT || 3000;

createApp(process.env.MONGO_URI || "")
	.then((app) => {
		app.listen(PORT, () => {
			console.log(`Running on: http://localhost:${PORT}`);
			console.log(`Environment: ${process.env.NODE_ENV}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
