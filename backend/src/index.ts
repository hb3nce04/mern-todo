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

// TODO: Creating specification for the API
// TODO: Implement logging to file and console
// TODO - implementing auth.service.ts methods
// TODO - implementing custom errors to separate business logic in the application
// TODO - add unique check for Task(mongoose)
// TODO - make decisions about informing user (What message to send back?)
// TODO - thinking about the importance of backend localization
// TODO - localization
