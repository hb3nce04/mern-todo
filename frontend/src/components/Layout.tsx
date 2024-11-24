import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from "../components/Spinner";

function Layout() {
	const { user } = useContext(AuthContext);
	const { promiseInProgress } = usePromiseTracker();
	return (
		<>
			{promiseInProgress && <Spinner />}
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
