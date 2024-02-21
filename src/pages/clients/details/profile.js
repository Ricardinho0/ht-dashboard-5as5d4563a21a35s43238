import { ProfileCardWidget } from "components/Widgets";
import Profile1 from "assets/img/team/profile-picture-1.jpg";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
const ProfilePage = (props) => {

    const user = props?.user;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [nivel, setNivel] = useState("");

    useEffect(() => {
        if(user){
            setName(user?.nome_usuario)
            setEmail(user?.email)
            setCelular(user?.celular)
            setNivel(user?.nivel)
        }
    }, [user])

    return (
        <Row className="d-inline-flex align-items-center gap-2 w-100 mt-6">
            <Col md={2} className="d-inline-flex flex-column align-items-start p-4">
                <div className="position-relative">
                    <Card.Img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&usqp=CAU"}
                        className="avatar-xl rounded-circle mx-auto mt-n7 mb-4" />
                    <input type="file" className="h-100 w-100 position-absolute top-0 start-0" style={{ marginTop: '-100%', padding: '50px', display: 'none' }} />
                </div>
                <h4 className="text-gray-700 fs-5 fw-bolder">{user?.nome_usuario}</h4>
                <span className="text-gray-700 fs-6">
                    <span className="text-gray-500 fs-6">Celular:</span>
                    {user?.celular}
                </span>
                <span className="text-gray-700 pr-1 fs-6">
                    <span className="text-gray-500"> Whatsapp:</span>
                    {user?.whatsapp}
                </span>
                <span className="text-gray-700 pr-1 fs-6">
                    <span className="text-gray-500">  Email: </span>
                    {user?.email}
                </span>
            </Col>
            <Col md={6}>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    value={name}
                                    type="text"
                                    placeholder="Digite o nome" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    type="email"
                                    placeholder="exemplo@email.com" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control
                                    value={celular}
                                    type="number"
                                    placeholder="(00) 9 9999-0000" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="gender">
                                <Form.Label>Nível</Form.Label>
                                <Form.Select
                                    value={nivel}
                                    defaultValue="0" className="mb-0">
                                    <option value="0">Administrador</option>
                                    <option value="1">Supervisor</option>
                                    <option value="2">Operador</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3 d-flex justify-content-end">
                        <Button
                            // disabled={loading}
                            // onClick={handleSubmit(handleCreate)}
                            variant={"gray-800"}
                            type="submit">
                            {/* {loading ? <Spinner size="sm" animation="border" /> : " Criar cliente"} */}
                            Atualizar
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
export default ProfilePage;