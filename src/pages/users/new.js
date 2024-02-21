
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel, Card } from 'react-bootstrap';

import KanbanAvatar from "components/KanbanAvatar";
import { Members as BoardMembers, Labels as BoardLabels } from "data/kanban";
import { UserService } from "service/users";

const NewClient = (props) => {

    const { show = false, edit = false, id } = props;

    const onHide = () => props.onClose();

    const onSubmitUser = () => {
        UserService.createContributor({
            id_revenda: 1,
            id_contribuinte: 1,
            nome_usuario: "usuario",
            email: "email@teste.com",
            whatsapp: "74 999999999",
            celular: "74 999999999",
            senha: "123456",
            nivel: "Operador"
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Modal size="lg" as={Modal.Dialog} centered show={show} onHide={onHide}>
            <Form className="modal-content p-3">
                <Modal.Header className="pb-0 border-0">
                    <h5 as={Modal.Title} className="fw-normal">
                        Novo usuário
                    </h5>
                    <Button variant="close" onClick={onHide} />
                </Modal.Header>
                <Modal.Body className="pb-0">
                    <Card border="0" className="mb-4">
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="firstName">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control required type="text" placeholder="Digite o nome" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="email" placeholder="exemplo@email.com" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phone">
                                            <Form.Label>Celular</Form.Label>
                                            <Form.Control required type="number" placeholder="(00) 9 9999-0000" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="gender">
                                            <Form.Label>Nível</Form.Label>
                                            <Form.Select defaultValue="0" className="mb-0">
                                                <option value="0">Administrador</option>
                                                <option value="1">Supervisor</option>
                                                <option value="2">Operador</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>


                                <h5 className="my-4">Segurança</h5>
                                <Row>
                                    <Col sm={9} className="mb-3">
                                        <Form.Group id="address">
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control required type="password" placeholder="••••" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3} className="mb-3">
                                        <Form.Group id="addressNumber">
                                            <Form.Label>Repita a senha</Form.Label>
                                            <Form.Control required type="password" placeholder="••••" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-end">
                                    <Button 
                                    onClick={onSubmitUser}
                                    variant="gray-800" type="submit" className="mt-2 animate-up-2">
                                        Criar cliente
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

export default NewClient;