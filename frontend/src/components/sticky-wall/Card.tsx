import { Card } from "flowbite-react";

function CardComp({ title, description, color }) {
	return (
		<Card className="w-1/4 max-w-sm shadow-md transform transition-transform duration-200 hover:-translate-y-3">
			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{title}
			</h5>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				{description}
			</p>
		</Card>
	);
}

export default CardComp;
