import { api } from "../config/axiosConfig";

export const healthCheckApi = async () => await api.get("/server/hc");