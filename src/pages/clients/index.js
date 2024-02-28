import React, { useEffect, useState } from "react"
import { Breadcrumb, Button, Col, Row } from "react-bootstrap";
import { ContributorService } from "service/contributor"
import NewContributor from "./newCliente";
import Table from "components/table";
import { Routes } from "routes";
import { IoMenu } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import useAuth from "context/auth";
import { FaPlusCircle } from "react-icons/fa";
import { HomeIcon } from "@heroicons/react/solid";
const List = () => {

    const { user, search } = useAuth();

    const history = useHistory();

    const columns = [
        { dataField: "id", text: "ID" },
        { dataField: "cnpj", text: "CNPJ" },
        {
            dataField: "fantasia", text: "Fantasia/Razão social",
            formatter: (cell, data) => <Col>
                <Row>{data?.fantasia}</Row>
                <Row>{data?.razao_social}</Row>
            </Col>
        },
        { dataField: "email", text: "Email" },
        {
            dataField: "cidade", text: "CEP/CIDADE",
            formatter: (cell, data) => <Col>
                <Row>{data?.cep}</Row>
                <Row>{data?.cidade}</Row>
            </Col>
        },
        { dataField: "status", text: "STATUS" },
        {
            dataField: "id", text: "Ação",
            formatter: (cell, data) => <Button className="p-1"
                onClick={() => history.push({
                    pathname: Routes.Clients.details,
                    state: data
                })}
                variant=""> <IoMenu size={22} /></Button>, align: 'start'
        },

    ];

    const [showNewContributor, setshowNewContributor] = useState(false);

    const [contributors, setContributors] = useState([]);

    const [pageSize, setPageSize] = useState(100);
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(0);


    const GetContributors = () => {
        ContributorService.contributor({
            id: user?.id_revenda,
            page_size: pageSize,
            page_number: pageNumber,
            fragment: search ?? undefined
        })
            .then(({ data }) => {
                if (data?.contribuintes) {
                    setContributors(data.contribuintes)
                    setCount(data?.countfull ?? 0)
                }
            })
            .catch(() => { })
    }

    useEffect(() => {
        if (user) {
          
            GetContributors()
        }
    }, [user, pageSize, pageNumber, search])

    return (
        <div className="w-100 p-2">
            <div className="py-4">
                <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                    <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
                    <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-between w-100 flex-wrap">
                    <div className="mb-3 mb-lg-0">
                        <h4>Lista de cliente</h4>
                        <p className="mb-0">
                            Dados essenciais sobre os clientes.
                        </p>
                    </div>
                    <div>
                        <div className="d-inline-flex align-items-center gap-4">
                                <div>
                                    {contributors?.length} de {count} Registros
                                </div>
                            <div>
                                <Button 
                                variant="outline-gray-600" 
                                className="d-inline-flex align-items-center w-100" onClick={setshowNewContributor}>
                                    <FaPlusCircle className="icon icon-xs me-2" /> Adicionar novo cliente
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="d-inline-flex align-items-center justify-content-between w-100 my-2">
                <div>Clientes</div>
                <Button onClick={setshowNewContributor}>Novo cliente</Button>
            </div> */}
            <Table
                data={contributors}
                totalSize={count ?? 0}
                columns={columns}
                onPageSizeChange={(page) => setPageSize(page)}
                perPage={pageSize}
                onPageChange={(_page) => setPageNumber(_page)}
                page={pageNumber}
            />
            <NewContributor
                show={showNewContributor}
                user={user}
                onClose={(created) => {
                    if(created){
                        GetContributors();
                    }
                    setshowNewContributor(false)
                }}
            />
        </div>
    )
}

export default List;
