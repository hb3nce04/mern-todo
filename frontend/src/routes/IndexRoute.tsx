import { useContext, ReactNode } from "react";
import { AuthContext } from "../contexts/Auth";
import { Navigate } from "react-router-dom";

export const IndexRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useContext(AuthContext);
	return user ? <Navigate to="/home" /> : <Navigate to="/signin" />;
};
