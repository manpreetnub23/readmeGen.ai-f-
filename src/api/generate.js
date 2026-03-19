import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const generateReadme = async (repoUrl) => {
	const res = await API.post("/api/generate", { repoUrl });
	return res.data;
};
