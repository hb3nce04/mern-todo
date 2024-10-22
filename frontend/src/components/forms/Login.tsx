import { Button, HR, Label, TextInput } from "flowbite-react";

import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "../../libs/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { loginSchema } from "../../utils/validationSchema";
import toast from "react-hot-toast";

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

	const { login } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			handleButton("local", true);
			login(values.email, values.password)
				.then((res) => {
					toast.success(res);
					navigate("/home");
				})
				.catch((err) => {
					toast.error(err);
				})
				.finally(() => {
					handleButton("local", false);
				});
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
				className="flex max-w flex-col gap-2"
				onSubmit={formik.handleSubmit}
			>
				<div className="flex flex-col relative h-20">
					<Label
						htmlFor="email1"
						value="Email address"
						style={{ marginBottom: 5 }}
						color={
							formik.errors.email
								? "failure"
								: formik.touched.email
								? "success"
								: ""
						}
					/>
					<TextInput
						id="email"
						type="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						onBlur={formik.handleBlur}
						required
						color={
							formik.errors.email
								? "failure"
								: formik.touched.email
								? "success"
								: ""
						}
					/>
					{formik.errors.email && (
						<span className="text-xs p-1 text-red-800">
							{formik.errors.email}
						</span>
					)}
				</div>
				<div className="flex flex-col relative h-20">
					<Label
						htmlFor="password"
						value="Password"
						style={{ marginBottom: 5 }}
						color={
							formik.errors.password
								? "failure"
								: formik.touched.password
								? "success"
								: ""
						}
					/>
					<TextInput
						id="password"
						type="password"
						required
						onChange={formik.handleChange}
						value={formik.values.password}
						onBlur={formik.handleBlur}
						color={
							formik.errors.password
								? "failure"
								: formik.touched.password
								? "success"
								: ""
						}
					/>
					{formik.errors.password && (
						<span className="text-xs p-1 text-red-800">
							{formik.errors.password}
						</span>
					)}
				</div>
				<Button
					color="blue"
					fullSized
					isProcessing={isLoading("local")}
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
			</form>
		</>
	);
}

export default Login;
