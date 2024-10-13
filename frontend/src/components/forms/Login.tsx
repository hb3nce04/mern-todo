import { Button, HR, Label, TextInput } from "flowbite-react";

import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";

function Login({ changeForm }) {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			if (!isLoading) {
				toast.success("Logged in successfully!");
				setIsLoading(true);
			}
		},
	});

	return (
		<>
			<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
				Welcome to <span className="text-primary-500">TODO!</span>
			</h1>
			<form
				className="flex max-w flex-col gap-4"
				onSubmit={formik.handleSubmit}
			>
				<Label htmlFor="email1" value="Your email" />
				<TextInput
					id="email"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.email}
					required
				/>
				<Label htmlFor="email1" value="Your password" />
				<TextInput
					id="password"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Button color="blue" fullSized isProcessing={isLoading} type="submit">
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
				<Button color="blue" fullSized>
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
