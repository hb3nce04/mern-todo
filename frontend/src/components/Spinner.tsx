import { Spinner } from "flowbite-react";

export default function Component() {
	return (
		<div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 gap-3 text-white font-light text-2xl">
			<Spinner size={"xl"} color={"info"} />
			<div className="flex flex-column">
				<span>Please wait patiently</span>
			</div>
		</div>
	);
}
