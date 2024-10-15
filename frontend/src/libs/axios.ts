import axios from "axios";

export default axios.create({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
	},
	baseURL: "http://localhost:3000/api",
	timeout: 1000,
});
