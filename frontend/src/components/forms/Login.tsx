import { Button, HR, Label, TextInput } from "flowbite-react";

import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { useFormik } from "formik";
import axios from "../../libs/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { loginSchema } from "../../utils/validationSchema";
import toast from "react-hot-toast";

// TODO: AUTH implementation
function Login({ changeForm }) {
	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			login(values.email, values.password)
				.then((res) => {
					toast.success(res);
					navigate("/dashboard");
				})
				.catch((err) => {
					toast.error(err);
				});
		},
	});

	const handleGoogleAuth = async () => {
		await axios.get("/auth/google").then((res) => {
			window.open(res.data.url, "_target");
		});
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
								: undefined
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
								: undefined
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
								: undefined
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
								: undefined
						}
					/>
					{formik.errors.password && (
						<span className="text-xs p-1 text-red-800">
							{formik.errors.password}
						</span>
					)}
				</div>
				<Button color="blue" fullSized type="submit">
					Log in
				</Button>
				<Button color="light" fullSized onClick={changeForm}>
					Sign up
				</Button>
				<HR.Text
					text="OR"
					theme={{
						text: "absolute left-1/2 -translate-x-1/2 bg-slate-300 font-medium dark:bg-gray-800 text-gray-900 dark:bg-gray-800 dark:text-white",
					}}
				/>
				<Button color="blue" fullSized onClick={handleGoogleAuth}>
					<FaGoogle className="my-auto mx-2 text-xl" />
					Sign in with Google
				</Button>
			</form>
		</>
	);
}

export default Login;
