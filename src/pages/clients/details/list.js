import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import { ContributorService } from "service/contributor"
import NewUser from "./newUser";
import Table from "components/table";
import { Routes } from "routes";
import { IoMenu } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { UserService } from "service/users";
import toast from 'react-hot-toast';
const List = (props) => {

    const history = useHistory();

    const columns = [
        { dataField: "id", text: "ID", hidden: true },
        { dataField: "nome_usuario", text: "Nome" },
        { dataField: "email", text: "Email" },
        { dataField: "whatsapp", text: "Celular" },
        { dataField: "nivel", text: "Nível" },
        // {
        //     dataField: "id", text: "Ação",
        //     formatter: (cell, data) => <Button className="p-1" 
        //     onClick={() => history.push({
        //         pathname: Routes.Clients.details,
        //         state: data
        //     })}
        //     variant=""> <IoMenu size={22} /></Button>, align: 'start'
        // },
    ];



    const [user, setUser] = useState();

    const [showNewUser, setshowNewUser] = useState(false);

    const [contributors, setContributors] = useState([]);

    const [pageSize, setPageSize] = useState(100);
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(0);


    const GetContributors = () => {
        UserService.listContributor(user?.id)
            .then(({ data }) => {
                if (data?.contribuintes) {
                    setContributors(data.contribuintes)
                    setCount(data?.countfull ?? 0)
                }
            })
            .catch((err) => { 
                 toast.error(err?.response?.data?.detail ?? "Erro ao buscar clientes")
            })
    }

    useEffect(() => {
        if (user) {
            GetContributors()
        }
    }, [user, pageSize, pageNumber])

    useEffect(() => {
        if (props?.user) {
            setUser(props?.user)
        }
    }, [props])

    return (
        <div className="w-100 p-2">
            <div className="d-inline-flex align-items-center justify-content-between w-100 my-2">
                <div>Clientes</div>
                <Button onClick={setshowNewUser}>Novo cliente</Button>
            </div>
            <Table
                data={contributors}
                totalSize={count ?? 0}
                columns={columns}
                onPageSizeChange={(page) => setPageSize(page)}
                perPage={pageSize}
                onPageChange={(_page) => setPageNumber(_page)}
                page={pageNumber}
            />
            <NewUser
                show={showNewUser}
                user={user}
                onClose={(created) => {
                    if(created){
                        GetContributors()
                    }
                    setshowNewUser(false)
                }}
            />
        </div>
    )
}

export default List;
