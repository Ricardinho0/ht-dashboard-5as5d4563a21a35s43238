import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Col, Row, Form, Modal, Button, Card, Spinner } from 'react-bootstrap';
import validator from "validator";
import { UserService } from "service/users";
import { toast } from "../../../node_modules/sonner/dist";

const NewClient = (props) => {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm()

    const { show = false } = props;

    const [loading, setLoading] = useState(false);

    const onHide = () => props.onClose();

    const handleCreate = (data) => {
        setLoading(true)
        UserService.createResale(data)
            .then(() => {
                toast("Cliente criado com sucesso!");
                onHide(true);
            })
            .catch(() => toast.error("Erro ao criar cliente!"))
    }


    return (
        <Modal size="lg" as={Modal.Dialog} centered show={show} onHide={onHide}>
            <Form className="modal-content p-3">
                <Modal.Header className="pb-0 border-0">
                    <h5 as={Modal.Title} className="fw-normal">
                        Novo cliente
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
                                            <Form.Control
                                                {...register("nome_usuario", {
                                                    required: {
                                                        value: true,
                                                        message: "Nome de do cliente requerido!"
                                                    }
                                                })}
                                                type="text"
                                                placeholder="Digite o nome" />
                                            <Form.Text className="text-danger">{errors?.nome_usuario?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "Email requerido!"
                                                    },
                                                    validate: (value) => {
                                                        if (!validator.isEmail(value)) {
                                                            return "Email inválido"
                                                        }
                                                    }
                                                })}
                                                type="email"
                                                placeholder="exemplo@email.com" />
                                            <Form.Text className="text-danger">{errors?.email?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phone">
                                            <Form.Label>Celular</Form.Label>
                                            <Form.Control
                                                {...register("celular", {
                                                    required: {
                                                        value: true,
                                                        message: "Celular requerido!"
                                                    },
                                                    validate: (value) => {
                                                        if (!validator.isMobilePhone(value, "pt-BR")) {
                                                            return "Celular inválido"
                                                        }
                                                    }
                                                })}
                                                type="number"
                                                placeholder="(00) 9 9999-0000" />
                                            <Form.Text className="text-danger">{errors?.celular?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="gender">
                                            <Form.Label>Nível</Form.Label>
                                            <Form.Select
                                                {...register("nivel", {
                                                    required: {
                                                        value: true,
                                                        message: "Nível requerido!"
                                                    }
                                                })}
                                                defaultValue="0" className="mb-0">
                                                <option value="0">Administrador</option>
                                                <option value="1">Supervisor</option>
                                                <option value="2">Operador</option>
                                            </Form.Select>
                                            <Form.Text className="text-danger">{errors?.nivel?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h5 className="my-4">Segurança</h5>
                                <Row>
                                    <Col sm={9} className="mb-3">
                                        <Form.Group id="address">
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control
                                                {...register("senha", {
                                                    required: {
                                                        value: true,
                                                        message: "Senha requerido!"
                                                    },
                                                    minLength: {
                                                        value: 4,
                                                        message: "Senha deve ter no mínimo 4 caracteres!"
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: "Senha deve ter no máximo 16 caracteres!"
                                                    },
                                                })}
                                                required
                                                type="password"
                                                placeholder="••••" />
                                            <Form.Text className="text-danger">{errors?.senha?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3} className="mb-3">
                                        <Form.Group id="addressNumber">
                                            <Form.Label>Repita a senha</Form.Label>
                                            <Form.Control
                                                {...register("repetir_senha", {
                                                    required: {
                                                        value: true,
                                                        message: "Senha requerida!"
                                                    },
                                                    validate: value => {
                                                        if (value !== getValues("senha")) {
                                                            return "Senhas devem ser iguais!"
                                                        }
                                                    }
                                                })}
                                                type="password" placeholder="••••" />
                                            <Form.Text className="text-danger">{errors?.repetir_senha?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3 d-flex justify-content-end">
                                    <Button
                                        disabled={loading}
                                        onClick={handleSubmit(handleCreate)}
                                        variant={loading ? "gray-400" : "gray-800"}
                                        type="submit">
                                        {loading ? <Spinner size="sm" animation="border" /> : " Criar cliente"}
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