import { resaleApi } from "../api";

export class ContributorService {
    static async contributor({ id, page_size, page_number, fragment }){
        return await resaleApi.get('/contribuinte/get_all', {
            params: {
                idRevenda: id,
                page_size: page_size ?? 100,
                page_number: page_number ?? 1,
                fragment
            }
        })
    }
    static async create(data){
        return await resaleApi.post('/contribuinte/revenda/create', data)
    }
} 