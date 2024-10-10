import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error.tsx";
import SignInPage from "./pages/SignIn.tsx";
import MainPage from "./pages/Main.tsx";
import { Toaster } from "react-hot-toast";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

// https://www.behance.net/gallery/207897075/To-Do-List-Dashboard?tracking_source=search_projects|todo+list&l=1

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Home</div>,
		errorElement: <ErrorPage />,
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/home",
		element: <MainPage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Flowbite>
			<DarkThemeToggle className="fixed bottom-5 right-5" />
			<RouterProvider router={router} />
			<Toaster position="bottom-right" />
		</Flowbite>
	</StrictMode>
);
