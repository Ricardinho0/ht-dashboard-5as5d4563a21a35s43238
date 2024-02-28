
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";
import { Button, Breadcrumb } from 'react-bootstrap';
import { Col, Row, Card, Nav, Tab } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "context/auth";
import ProfilePage from "./profile";
import List from "./list";

export default function DetailsClientPage() {
    const AuthUser = useAuth().user;

    const location = useLocation();
    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        if (location?.state) {
            setUser(location?.state)
        }
    }, [location])

    return (
        < >
            <div className="py-4">
                <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                    <Breadcrumb.Item><HomeIcon className="icon icon-xs" /></Breadcrumb.Item>
                    <Breadcrumb.Item>Clientes</Breadcrumb.Item>
                    <Breadcrumb.Item active>Detalhes</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex w-100 flex-wrap bg-white rounded shadow p-3 mb-4 mt-4">
                    <div className="d-inline-flex align-items-center gap-2 mb-2">
                        <Button
                            onClick={() => history.goBack()}
                            variant="text-gray-600"
                            className="d-inline-flex align-items-center">
                            <FaArrowLeft className="icon icon-xs me-2" />
                        </Button>
                        <span className="fs-5">
                            {user?.razao_social}
                        </span>
                    </div>
                    <div className="w-100 d-inline-flex align-items-center gap-2">
                        <span className="text-gray-700 fs-6">
                            <span className="text-gray-500 fs-6">Cnpj:</span>
                            {user?.cnpj}
                        </span>
                        <span className="text-gray-700 pr-1 fs-6">
                            <span className="text-gray-500"> Cidade:</span>
                            {user?.cidade}
                        </span>
                        <span className="text-gray-700 pr-1 fs-6">
                            <span className="text-gray-500">  Email: </span>
                            {user?.email}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-2">
                <Tab.Container defaultActiveKey="home">
                    <Row>
                        <Col lg={12}>
                            <Nav className="nav-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
                                        Listagem de clientes
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
                                        Cobranças
                                    </Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="data" className="mb-sm-3 mb-md-0">
                                        Dados do cliente
                                    </Nav.Link>
                                </Nav.Item> */}
                            </Nav>
                        </Col>
                        <Col lg={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="home" className="py-4">
                                    <List user={user} teste={user}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="profile" className="py-4">
                                    <p>Cobranças</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="data" className="py-4">
                                    <ProfilePage user={user} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        </>
    );
};
