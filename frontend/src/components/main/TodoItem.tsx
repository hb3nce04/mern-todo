import { Button } from "flowbite-react";

export interface TodoItemProps {
	title: string;
	description: string;
	leftTime: string;
}

function TodoItem({ title, description, leftTime }: TodoItemProps) {
	return (
		<div className="max-w-sm bg-white/50 border shadow border-gray-200/75 rounded-lg dark:bg-gray-800/50 dark:border-gray-700/75 p-4 w-full">
			<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{title}
			</h5>
			<p className="my-2 font-normal text-justify text-gray-900 dark:text-gray-200 text-l">
				{description}
			</p>
			<div className="w-full dark:bg-gray-700 bg-gray-400 rounded-full h-1.5">
				<div
					className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
					style={{ width: "50%" }}
				></div>
			</div>
			<div className="m-1 text-gray-900 dark:text-gray-200 font-medium">
				{leftTime}
			</div>
			<div className="flex gap-2">
				<Button color="success" size="sm" pill>
					Complete
				</Button>
				<Button color="blue" size="sm" pill>
					Edit
				</Button>
				<Button color="failure" size="sm" pill>
					Delete
				</Button>
			</div>
		</div>
	);
}

export default TodoItem;
