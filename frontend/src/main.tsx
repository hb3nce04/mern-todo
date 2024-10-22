import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error.tsx";
import SignInPage from "./pages/SignIn.tsx";
import MainPage from "./pages/Main.tsx";
import { Toaster } from "react-hot-toast";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { AuthProvider } from "./contexts/Auth.tsx";
import { NotProtectedRoute } from "./routes/NotProtectedRoute.tsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.tsx";
import { IndexRoute } from "./routes/IndexRoute.tsx";

// https://www.behance.net/gallery/207897075/To-Do-List-Dashboard?tracking_source=search_projects|todo+list&l=1

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/signin",
		element: (
			<NotProtectedRoute>
				<SignInPage />
			</NotProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/home",
		element: (
			<ProtectedRoute>
				<MainPage />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster position="bottom-right" />{" "}
		<AuthProvider>
			<Flowbite>
				<DarkThemeToggle className="fixed bottom-5 right-5" />
				<RouterProvider router={router}></RouterProvider>
			</Flowbite>
		</AuthProvider>
	</StrictMode>
);
