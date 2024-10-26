import { createContext, useEffect, useState } from "react";
import axios from "../libs/axios";

interface AuthContextType {
	login: (email: string, password: string) => void;
	logout: () => void;
	user: any;
}

export const AuthContext = createContext<AuthContextType>({
	login: () => {},
	logout: () => {},
	user: null,
});

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState(true);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
	}, []);

	const login = (email: string, password: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			axios
				.post("/auth/local", { email, password })
				.then((res) => {
					setUser(res.data.user);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					resolve(res.data.message || "Logged in successfully");
				})
				.catch((err) => {
					reject(err.response.data.message || "An error occurred");
				});
		});
	};

	const logout = () => {
		setUser(false);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
