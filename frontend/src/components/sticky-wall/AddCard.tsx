import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function AddCard() {
	return (
		<Card className="w-1/4 max-w-sm flex justify-center items-center bg-slate-200 dark:bg-slate-800">
			<Link to={"/sticky"}>
				<FaPlus className="font-normal text-gray-700 dark:text-gray-400 text-5xl" />
			</Link>
		</Card>
	);
}

export default AddCard;
