import { useContext, ReactNode } from "react";
import { AuthContext } from "../contexts/Auth";
import { Navigate } from "react-router-dom";

export const NotProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useContext(AuthContext);
	return !user ? children : <Navigate to="/home" />;
};
