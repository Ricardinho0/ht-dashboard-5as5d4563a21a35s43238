import axios from "axios";
import Utils from "utils";
import StorageService from "./storage";

const api = axios.create({
    baseURL: Utils.URLSBases.api
});
async function intercepter(config) {
    const user = await StorageService.getToken();
        if(user){
            config.headers.Authorization = `Bearer ${user}`;
        }
    return config;
}

api.interceptors.request.use(intercepter);
export default api;