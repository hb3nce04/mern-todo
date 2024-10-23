import { useState } from "react";
import LoginForm from "../components/forms/Login";
import RegisterForm from "../components/forms/Register";
import { Card } from "flowbite-react";

function SignIn() {
	const [login, setLogin] = useState(true);

	const changeForm = () => {
		setLogin(!login);
	};

	return (
		<div className="min-h-screen flex justify-center items-center ">
			<Card className="bg-slate-300 shadow-2xl rounded-xl border-none w-full max-w-xs h-full max-h-lg">
				{login ? (
					<LoginForm changeForm={changeForm} />
				) : (
					<RegisterForm changeForm={changeForm} />
				)}
			</Card>
		</div>
	);
}

export default SignIn;
