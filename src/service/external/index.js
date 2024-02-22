import axios from "axios";

export class ExternalService {
    static async cnpj(cnpj){
        return await axios.get(`https://comercial.cnpj.ws/cnpj/${cnpj}?token=rJr7ibUAQJrzBRIxGZumyWpveyvMzjA0mAjNXwDrpTs4`)
    }
} 