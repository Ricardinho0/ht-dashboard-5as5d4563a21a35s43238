import api from "../api";

export class AuthService {
    static async login(username, password){
        return await api.post('/auth/user/login',{ username, password, grupo: 'Revenda' })
    }
} 