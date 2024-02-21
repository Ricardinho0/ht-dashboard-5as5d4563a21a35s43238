import axios from "axios";
import Utils from "utils";
import StorageService from "./storage";

const api = axios.create({
    baseURL: Utils.URLSBases.api
});
async function intercepter(config) {
    const token = await StorageService.getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    return config;
}

const resaleApi = axios.create({
    baseURL: Utils.URLSBases.resaleAPI
});
async function intercepterResale(config) {
    const token = await StorageService.getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    return config;
}

resaleApi.interceptors.request.use(intercepterResale);

api.interceptors.request.use(intercepter);
export {
    api, 
    resaleApi
};