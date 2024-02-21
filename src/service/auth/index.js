import { api } from "../api";

export class AuthService {
    static async login(username, password){
        return await api.post('/auth/user/web/revenda/login',{ username, password, grupo: 'Revenda' })
    }
} 