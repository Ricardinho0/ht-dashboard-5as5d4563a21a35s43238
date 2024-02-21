import { resaleApi } from "../api";

export class ContributorService {
    static async contributor(id){
        return await resaleApi.get('/contribuinte/get_all', {
            params: {
                idRevenda: id 
            }
        })
    }

    static async create(data){
        return await resaleApi.post('/contribuinte/revenda/create', data)
    }
} 