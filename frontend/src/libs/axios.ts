import axios, { AxiosRequestConfig } from "axios";
import { trackPromise } from "react-promise-tracker";

const instance = axios.create({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
	},
	baseURL: "http://localhost:3000/api",
	timeout: 1000,
});

const trackedInstance = {
	get: (url: string, config?: AxiosRequestConfig<unknown>) =>
		trackPromise(instance.get(url, config)),
	post: (url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) =>
		trackPromise(instance.post(url, data, config)),
	put: (url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) =>
		trackPromise(instance.put(url, data, config)),
	delete: (url: string, config?: AxiosRequestConfig<unknown>) =>
		trackPromise(instance.delete(url, config)),
};

export default trackedInstance;
