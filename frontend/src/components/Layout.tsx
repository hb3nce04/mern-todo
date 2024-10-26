import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

function Layout() {
	const { user } = useContext(AuthContext);
	return (
		<>
			{user && <Sidebar />}
			{user ? (
				<div className="min-h-screen ml-60 p-5">
					<Outlet />
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
}

export default Layout;
