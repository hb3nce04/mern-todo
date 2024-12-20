import { Button, Label, TextInput } from "flowbite-react";

import { useState } from "react";
import { useFormik } from "formik";
import axios from "../../libs/axios";
import toast from "react-hot-toast";
import { registerSchema } from "../../utils/validationSchema";

function Register({ changeForm }) {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			password2: "",
		},
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			setIsLoading(true);
			await axios
				.post("/users", {
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					setIsLoading(false);
					toast.success(res.data.message);
					console.log(res);
				})
				.catch((err) => {
					setIsLoading(false);
					toast.error(err.response.data.message);
					console.error(err);
				});
		},
	});

	return (
		<>
			<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
				Create <span className="text-primary-500">an account</span>
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
				<div className="flex flex-col relative h-20">
					<Label
						htmlFor="password2"
						value="Password confirmation"
						style={{ marginBottom: 5 }}
						color={
							formik.errors.password2
								? "failure"
								: formik.touched.password2
								? "success"
								: undefined
						}
					/>
					<TextInput
						id="password2"
						type="password"
						required
						onChange={formik.handleChange}
						value={formik.values.password2}
						onBlur={formik.handleBlur}
						color={
							formik.errors.password2
								? "failure"
								: formik.touched.password2
								? "success"
								: undefined
						}
					/>
					{formik.errors.password2 && (
						<span className="text-xs p-1 text-red-800">
							{formik.errors.password2}
						</span>
					)}
				</div>
				<div className="flex flex-col gap-1 relative py-2">
					<Button color="blue" fullSized isProcessing={isLoading} type="submit">
						Register
					</Button>
					<Button color="light" fullSized onClick={changeForm}>
						Sign in
					</Button>
				</div>
			</form>
		</>
	);
}

export default Register;
