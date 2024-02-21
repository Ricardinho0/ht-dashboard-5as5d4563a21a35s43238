import { api } from "../api";

export class UserService {
    static async listResales(id){
        return await api.get('/user/get_all_users_revenda', {
            params: {
                idRevenda: id 
            }
        })
    }

    static async createResale(data){
        return await api.post('/user/revenda/create', data)
    }

    static async listContributor(id){
        return await api.get('/user/get_all_users_contribuinte', {
            params: {
                idContribuinte : id
            }
        })
    }

    static async createContributor(data){
        return await api.post('/user/revenda/create', data)
    }
} 