import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { ContributorService } from "service/contributor"
const List = (props) => {

    const [user, setUser] = useState();

    const GetContributors = () => {
        console.log(props)
        ContributorService.contributor(user?.id_revenda)
            .catch(() => { })
    }

    const CreateContributor = () => {
        ContributorService.create({
            "id_revenda": user?.id_revenda,
            "id_cidade": 0,
            "cnpj": "string",
            "ie": "string",
            "email": "string@string.com",
            "fantasia": "string",
            "razao_social": "string",
            "status": "string",
            "cep": "48970000",
            "logradouro": "string",
            "complemento": "string",
            "numero": "string",
            "bairro": "string",
            "telefone": "74999076528",
            "celular": "74999076528",
            "observacao": "string",
            "contato": "TESTE"
        })
            .catch(() => { })
    }

    useEffect(() => {
        if (user) {
            GetContributors()
        }
    }, [user])

    useEffect(() => {
        if (props?.user) {
            setUser(props?.user)
        }
    }, [props])

    return (
        <div className="w-100 p-2">
            <div className="d-inline-flex align-items-center justify-content-between w-100">
                <div>Clientes</div>
                <Button onClick={CreateContributor}>Novo cliente</Button>
            </div>
        </div>
    )
}

export default List;