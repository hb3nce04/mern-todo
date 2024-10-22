function Sidebar() {
	return (
		<aside
			id="sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
				<a
					href="https://flowbite.com/"
					className="flex items-center ps-2.5 mb-5 px-4"
				>
					<span className="self-center text-xl text-sky-500 font-semibold whitespace-nowrap dark:text-white">
						TODO
					</span>
				</a>
				<ul className="space-y-4 font-medium">
					<li>
						<a
							href="#"
							className="flex bg-blue-500:active items-center px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<span className="ms-3">My Day</span>
							<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
								Pro
							</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex bg-blue-500:active items-center px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<span className="ms-3">Important</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex bg-blue-500:active items-center px-4 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<span className="ms-3">Tasks</span>
						</a>
					</li>
				</ul>
				<ul className="pt-4 mt-auto space-y-4 font-medium border-t border-gray-200 dark:border-gray-700">
					<li>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
						>
							<span className="ms-3">Setting</span>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
						>
							<img
								className="w-10 h-10 rounded-full"
								src="img/pic.jpg"
								alt="Jese Leos"
							/>
							<span className="ms-3">scarlett johansson</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
	);
}

export default Sidebar;
