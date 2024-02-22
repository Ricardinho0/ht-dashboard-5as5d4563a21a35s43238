import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Col, Row, Form, Modal, Button, Card, Spinner } from 'react-bootstrap';
import validator from "validator";
import { UserService } from "service/users";
import { toast } from "../../../../node_modules/sonner/dist";
import { validarCNPJ } from "utils/validators";

const NewContributor = (props) => {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm()

    const { show = false } = props;

    const [loading, setLoading] = useState(false);

    const [cnpj, setCnpj] = useState('')
    const [fantasia, setFantasia] = useState('')
    const [razao_social, setRazao_social] = useState('')
    const [email, setEmail] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [celular, setCelular] = useState('')
    const [contato, setContato] = useState('')
    const [observacao, setObservacao] = useState('')

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
                        Novo contribuinte
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
                                            <Form.Label>CNPJ</Form.Label>
                                            <Form.Control
                                                {...register("cnpj", {
                                                    required: {
                                                        value: true,
                                                        message: "Nome de do cliente requerido!"
                                                    },
                                                    validate: (value) => {
                                                        if (!validarCNPJ(value)) {
                                                            return "CNPJ inválido."
                                                        }
                                                    }
                                                })}
                                                type="number"
                                                placeholder="Digite o CNPJ" />
                                            <Form.Text className="text-danger">{errors?.cnpj?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="Fantasia">
                                            <Form.Label>Fantasia</Form.Label>
                                            <Form.Control
                                                {...register("fantasia", {
                                                    required: {
                                                        value: true,
                                                        message: "Fantasia requerido."
                                                    }
                                                })}
                                                type="text"
                                                placeholder="Fantasia" />
                                            <Form.Text className="text-danger">{errors?.fantasia?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="razao_social">
                                            <Form.Label>Razão social</Form.Label>
                                            <Form.Control
                                                {...register("razao_social", {
                                                    required: {
                                                        value: true,
                                                        message: "Razão social requerido."
                                                    }
                                                })}
                                                type="number"
                                                placeholder="Razão social" />
                                            <Form.Text className="text-danger">{errors?.razao_social?.message ?? ""}</Form.Text>
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
                                        <Form.Group id="cep">
                                            <Form.Label>CEP</Form.Label>
                                            <Form.Control
                                                {...register("cep", {
                                                    required: {
                                                        value: true,
                                                        message: "CEP requerido."
                                                    },
                                                    validate: (value) => {
                                                        if (!validator.isPostalCode(value, 'BR')) {
                                                            return "CEP inválido."
                                                        }
                                                    }
                                                })}
                                                type="number"
                                                placeholder="CEP" />
                                            <Form.Text className="text-danger">{errors?.cep?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control
                                                disabled
                                                placeholder="Cidade"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="cep">
                                            <Form.Label>Logradouro</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Logradouro" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Complemento</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Complemento"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="cep">
                                            <Form.Label>Bairro</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register("bairro", {
                                                    required: {
                                                        value: true,
                                                        message: "Bairro requerido."
                                                    }
                                                })}
                                                placeholder="Logradouro" />
                                            <Form.Text className="text-danger">{errors?.bairro?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Numero</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="numero"
                                            />
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
                                        <Form.Group id="contato">
                                            <Form.Label>Contato</Form.Label>
                                            <Form.Control
                                                {...register("contato", {
                                                    required: {
                                                        value: true,
                                                        message: "Contato requerido!"
                                                    }
                                                })}
                                                type="text"
                                                placeholder="Contato" />
                                            <Form.Text className="text-danger">{errors?.contato?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Observações" />
                                <div className="mt-3 d-flex justify-content-end">
                                    <Button
                                        disabled={loading}
                                        onClick={handleSubmit(handleCreate)}
                                        variant={loading ? "gray-400" : "gray-800"}
                                        type="submit">
                                        {loading ? <Spinner size="sm" animation="border" /> : " Criar contribuinte"}
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

export default NewContributor;