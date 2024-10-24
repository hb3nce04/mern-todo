import { Sidebar } from "flowbite-react";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { VscSettings } from "react-icons/vsc";
import { FaSignOutAlt } from "react-icons/fa";

function Component() {
	return (
		<>
			<button
				data-drawer-target="Sidebar"
				data-drawer-toggle="Sidebar"
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
			<Sidebar className="fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0">
				<Sidebar.Logo
					href="/"
					img="https://jameslex.com/content/images/2022/02/MS-To-Do-Icon-MacOS-512x512@2x-1.png"
				>
					TODO App
				</Sidebar.Logo>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={MdKeyboardDoubleArrowRight}>
							Upcoming
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaTasks}>
							Today
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaCalendarAlt}>
							Calendar
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaStickyNote}>
							Sticky Wall
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaFolder}>
							Folders
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={FaPlus}>
							Add new list
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={VscSettings}>
							Settings
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaSignOutAlt}>
							Sign out
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</>
	);
}

// TODO: TAGS

export default Component;
