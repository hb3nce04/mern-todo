import { Badge, Sidebar } from "flowbite-react";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { VscSettings } from "react-icons/vsc";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import { LuListChecks } from "react-icons/lu";

function Component() {
	const location = useLocation();
	const currentPath = location.pathname;

	const isActive = (path) =>
		currentPath === path
			? "transition duration-200 bg-gray-200 dark:bg-slate-600"
			: "";

	return (
		<>
			<button
				data-drawer-target="Sidebar"
				data-drawer-toggle="Sidebar"
				aria-controls="Sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<IoMenuOutline className="text-2xl" />
			</button>
			<Sidebar className="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0">
				<Sidebar.Logo href="/">
					<div className="flex gap-2 text-primary-300">
						<LuListChecks className="my-auto" />
						<span className="font-bold">ToDo App</span>
					</div>
				</Sidebar.Logo>

				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item
							label="13"
							icon={MdKeyboardDoubleArrowRight}
							className={isActive("/upcoming")}
						>
							<Link to={"/upcoming"}>Upcoming</Link>
						</Sidebar.Item>
						<Sidebar.Item label="5" icon={FaTasks}>
							<Link to={"/today"}>Today</Link>
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaCalendarAlt}>
							<Link to={"/calendar"}>Calendar</Link>
						</Sidebar.Item>
						<Sidebar.Item
							href="#"
							icon={FaStickyNote}
							className={isActive("/sticky")}
						>
							<Link to={"/sticky"}>Sticky Wall</Link>
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={FaFolder}>
							<Link to={"/folders"}>Folders</Link>
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={FaPlus}>
							Add new list
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
				<Sidebar.CTA>
					<div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
						Preview the new Flowbite dashboard navigation! You can turn the new
						navigation off for a limited time in your profile.
					</div>
					<a
						className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
						href="#"
					>
						Turn new navigation off
					</a>
				</Sidebar.CTA>
				<Sidebar.Items className="mb-0">
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
