import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
	const { tasks, setTasks } = useState([]);

	useEffect(() => {
		document.title = "Todo List";
	}, []);

	return tasks.map((task) => {
		return (
			<TodoItem
				key={task.id}
				title={"Teszt"}
				description={"Teszt"}
				leftTime={"Teszt"}
			/>
		);
	});
}

export default TodoList;
