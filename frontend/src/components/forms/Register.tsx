import { Card, Button, Label, TextInput } from "flowbite-react";

import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Hibás e-mail cím")
		.required("E-mail cím megadása kötelező"),
	password: yup
		.string()
		.min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie")
		.required("Jelszó megadása kötelező"),
	password2: yup
		.string()
		.min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie")
		.oneOf([yup.ref("password"), null], "A jelszavaknak egyezniük kell")
		.required("Jelszó megadása kötelező"),
});

function Register({ changeForm }) {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			password2: "",
		},
		validationSchema: validationSchema,
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
				className="flex max-w flex-col gap-2"
				onSubmit={formik.handleSubmit}
			>
				<Label htmlFor="email1" value="Email address" />
				<TextInput
					id="email"
					type="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					required
					color={
						formik.errors.email ? "red" : formik.touched.email ? "success" : ""
					}
					helperText={
						formik.errors.email && (
							<>
								<span className="font-small p-0">{formik.errors.email}</span>{" "}
							</>
						)
					}
				/>
				<Label htmlFor="password" value="Password" />
				<TextInput
					id="password"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password}
					color={formik.errors.password ? "red" : "success"}
					helperText={
						formik.errors.password && (
							<>
								<span className="font-small">{formik.errors.password}</span>{" "}
							</>
						)
					}
				/>
				<Label htmlFor="password2" value="Password confirmation" />
				<TextInput
					id="password2"
					type="password"
					required
					onChange={formik.handleChange}
					value={formik.values.password2}
					color={formik.errors.password2 ? "red" : "success"}
					helperText={
						formik.errors.password2 && (
							<>
								<span className="font-small">{formik.errors.password2}</span>{" "}
							</>
						)
					}
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
