import { useRouteError } from "react-router-dom";

function Error() {
	const error = useRouteError();

	return (
		<div className="flex flex-col items-center p-5 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
			<p className="text-5xl font-bold">
				OOPS! {error.statusText || error.message}
			</p>
			<p className="text-2xl font-light italic">
				Sorry, an unexpected error has occurred.
			</p>
		</div>
	);
}

export default Error;
