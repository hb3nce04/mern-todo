import { Button } from "flowbite-react";
import Sidebar from "../components/Sidebar";
import TodoItem from "../components/TodoItem";

function Main() {
	return (
		<>
			<Sidebar />
			<div className="min-h-screen ml-52 p-12">
				<div className="flex flex-wrap gap-4 justify-items-center">
					<TodoItem title={"Teszt"} description={"Teszt"} leftTime={"7 perc"} />
				</div>
			</div>
			<Button className="fixed bottom-20 right-5" color="dark" size="lg" pill>
				+
			</Button>
		</>
	);
}

export default Main;
