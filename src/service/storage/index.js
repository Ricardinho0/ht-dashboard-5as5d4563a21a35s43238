import Utils from "utils";

export default class StorageService {
    static getUser() {
        const user = localStorage.getItem(Utils.storageLocales.HTRtoken)
        if(user){
            return JSON.parse(user)
        }
        return null
    }

    static async saveToken(data){
        if(!data){
            return
        }
        localStorage.setItem(Utils.storageLocales.HTRtoken, JSON.stringify(data));
    }

    static async getToken(){
        const user = localStorage.getItem(Utils.storageLocales.HTRtoken)
        if(user){
            const user_json = JSON.parse(user)
            return user_json?.access_token
        }
        return null
    }
}