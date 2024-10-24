import { Button } from "flowbite-react";
import Sidebar from "../components/Sidebar";
import TodoItem from "../components/TodoItem";

function Main() {
	return (
		<>
			<Sidebar />
			<div className="min-h-screen ml-52 p-4">
				<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
					Today
				</h1>

				<div className="flex flex-row">
					<div className="max-w-sm bg-zinc-950 h-50">asd</div>
				</div>

				{/* <div className="flex flex-wrap gap-4 justify-items-center">
					<TodoItem title={"Teszt"} description={"Teszt"} leftTime={"7 perc"} />
				</div> */}
			</div>
			<Button className="fixed bottom-20 right-5" color="dark" size="lg" pill>
				+
			</Button>
		</>
	);
}

export default Main;
