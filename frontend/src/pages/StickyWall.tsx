import AddCard from "../components/sticky-wall/AddCard";
import Card from "../components/sticky-wall/Card";

function StickyWall() {
	return (
		<>
			<h1 className="mb-10 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
				Sticky Wall
			</h1>

			<div className="flex flex-row gap-5 flex-wrap justiy-center max-w-full">
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<Card
					title="teszt"
					description={"Lorem ipsum ala mata pala kaka"}
					color="#030"
				/>
				<AddCard />
			</div>

			{/* <div className="flex flex-wrap gap-4 justify-items-center">
            <TodoItem title={"Teszt"} description={"Teszt"} leftTime={"7 perc"} />
        </div> */}
		</>
	);
}

export default StickyWall;
