import Sidebar from "../components/Sidebar";

function Main() {
	return (
		<div className="bg-slate-100">
			<button
				data-drawer-target="sidebar"
				data-drawer-toggle="sidebar"
				aria-controls="sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>

			<Sidebar />

			<div className="p-4 sm:ml-64">
				<div className="p-4">
					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
							<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
								Need a help in Claim?
							</h5>
							<p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-l">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
								iusto repudiandae illum quos consequuntur eaque deserunt saepe
								magni minima ipsa.
							</p>
							<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
								<div
									className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
									style={{ width: "45%" }}
								></div>
							</div>
							<div className="mx-3 my-1 text-gray-600 font-medium dark:text-light-600">
								7 hours left
							</div>
							<button
								type="button"
								className="text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2"
							>
								Button
							</button>
							<div className="flex flex-row justify-between items-center divide-x">
								<div className="flex flex-row flex-nowrap divide-x">
									<input
										id="default-checkbox"
										type="checkbox"
										value=""
										className="w-4 h-4 align-center justify-center bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<input
										id="default-checkbox"
										type="checkbox"
										value=""
										className="w-4 h-4 align-center justify-center bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
								</div>
								<div className="flex flex-row divide-x bg-blue-400">
									<div className="p-1">i</div>
									<div className="p-1">j</div>
									<div className="p-1">k</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
