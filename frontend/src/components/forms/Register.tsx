import { Card, Button, Label, TextInput } from "flowbite-react";

import { useState } from "react";
import { useFormik } from "formik";

function Register({ changeForm }) {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			password2: "",
		},
		onSubmit: (values) => {
			setIsLoading(true);
		},
	});

	return (
		<>
			<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
				Create an <span className="text-primary-500">account</span>
			</h1>
			<form
				className="flex max-w flex-col gap-4"
				onSubmit={formik.handleSubmit}
			>
				<Label htmlFor="username" value="Username" />
				<TextInput
					id="username"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.username}
					required
				/>
				<Label htmlFor="email1" value="Email address" />
				<TextInput
					id="email"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.email}
					required
				/>
				<Label htmlFor="password" value="Password" />
				<TextInput
					id="password"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Label htmlFor="password2" value="Password confirmation" />
				<TextInput
					id="password2"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password2}
				/>
				<Button color="blue" fullSized isProcessing={isLoading} type="submit">
					Register
				</Button>
				<Button color="light" fullSized onClick={changeForm}>
					Sign in
				</Button>
			</form>
		</>
	);
}

export default Register;
