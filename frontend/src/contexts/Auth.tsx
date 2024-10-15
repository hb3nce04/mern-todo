import { createContext, useEffect, useState } from "react";
import axios from "../libs/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
	}, [localStorage.getItem("user")]);

	const login = (name: string, password: string, loading: any) => {
		loading(true);
		axios
			.post("/auth/login", { name, password })
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				toast.success(res.data.message);
				navigate.push("/home");
				loading(false);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				loading(false);
			});
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
	);
};
