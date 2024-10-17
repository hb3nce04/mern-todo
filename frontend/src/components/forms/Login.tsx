import { Button, HR, Label, TextInput } from "flowbite-react";

import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "../../libs/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

function Login({ changeForm }) {
	const [buttonState, setButtonState] = useState({});
	const navigate = useNavigate();

	const handleButton = (id, state) => {
		setButtonState({
			...buttonState,
			[id]: state,
		});
	};

	const isLoading = (id) => {
		return buttonState[id] || false;
	};

	//const { login, logout } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			if (!isLoading("login")) {
				handleButton("login", true);
				//login(values.email, values.password, setIsLoading);
			}
		},
	});

	const handleGoogleAuth = async () => {
		if (!isLoading("google")) {
			handleButton("google", true);
			await axios.get("http://localhost:3000/api/auth/google").then((res) => {
				window.open(res.data.url, "_target");
			});
		}
	};

	return (
		<>
			<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
				Welcome to <span className="text-primary-500">TODO!</span>
			</h1>
			<form
				className="flex max-w flex-col gap-4"
				onSubmit={formik.handleSubmit}
			>
				<Label htmlFor="name" value="Your email" />
				<TextInput
					id="name"
					type="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					required
				/>
				<Label htmlFor="password" value="Your password" />
				<TextInput
					id="password"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Button
					color="blue"
					fullSized
					isProcessing={isLoading("login")}
					type="submit"
				>
					Log in
				</Button>
				<Button color="light" fullSized onClick={changeForm}>
					Sign up
				</Button>
				<HR.Text
					text="OR"
					theme={{
						text: "dark:bg-gray-800 bg-slate-300 p-2 left-50",
					}}
				/>
				<Button
					color="blue"
					fullSized
					isProcessing={isLoading("google")}
					onClick={handleGoogleAuth}
				>
					<FaGoogle className="my-auto mx-2 text-xl" />
					Sign in with Google
				</Button>
				<Button color="blue" fullSized>
					<FaFacebook className="my-auto mx-2 text-xl" />
					Sign in with Facebook
				</Button>
			</form>
		</>
	);
}

export default Login;
