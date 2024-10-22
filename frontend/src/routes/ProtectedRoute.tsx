import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useContext(AuthContext);
	return user ? children : <Navigate to="/signin" />;
};
