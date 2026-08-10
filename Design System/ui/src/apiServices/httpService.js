import axios from "axios";

const httpService = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default httpService;
