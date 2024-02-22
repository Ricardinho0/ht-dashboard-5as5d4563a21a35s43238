import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Col, Row, Form, Modal, Button, Card, Spinner } from 'react-bootstrap';
import validator from "validator";
import { UserService } from "service/users";
import { toast } from "../../../../node_modules/sonner/dist";
import { validarCNPJ } from "utils/validators";
import { ExternalService } from "service/external";
import { ContributorService } from "service/contributor";

const NewContributor = (props) => {

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        clearErrors,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    const { show = false, onClose, user } = props;

    const [loading, setLoading] = useState(false);
    const [loadingGetCNPJ, setLoadingGetCNPJ] = useState(false);

    const [id_cidade, setid_cidade] = useState(false);

    const [cnpj, setCnpj] = useState('')
    const [observacao, setObservacao] = useState('')

    const onHide = () => props.onClose();

    const handleCreate = (data) => {
        setLoading(true)
        ContributorService.create({
            ...data,
            observacao,
            id_cidade,
            id_revenda: user?.id_revenda,
            ei: "",
            cnpj: data?.cnpj?.replace(/\D/g, '', '')
        })
            .then(() => {
                toast("Contribuinte criado com sucesso!");
                reset();
                onHide();
            })
            .catch(() => toast.error("Erro ao criar cliente!"))
            .finally(() => {
                setLoading(false)
            })
    }

    const GetCNPJ = (cnpj) => {
        setLoadingGetCNPJ(true)
        ExternalService.cnpj(cnpj)
            .then(({ data }) => {
                const { razao_social: razao, estabelecimento, socios } = data
                setValue("razao_social",razao ?? "")
                setValue("fantasia", estabelecimento?.nome_fantasia ?? "")
                setValue("email", estabelecimento?.email ?? "")
                setValue("cep", estabelecimento?.cep ?? "")
                setValue("cidade", estabelecimento?.cidade?.nome ?? "" )
                setid_cidade(estabelecimento?.cidade?.id)
                setValue("logradouro", estabelecimento?.logradouro)
                setValue("complemento", estabelecimento?.complemento ?? "")
                setValue("bairro", estabelecimento?.bairro ?? "")
                setValue("numero", estabelecimento?.numero ?? "")
                setValue("celular", estabelecimento?.ddd1 + estabelecimento?.telefone1 ?? "")
                setValue("contato", socios[0]?.nome ?? "")
            })
            .catch(() => {

            })
            .finally(() => setLoadingGetCNPJ(false))
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
                                                disabled={loadingGetCNPJ}
                                                value={cnpj}
                                                {...register("cnpj", {
                                                    onChange: (e) => {
                                                        const { value } = e.target
                                                        const _v = value?.replace(/\D/g, '', '')?.replace("-", '')
                                                        if (_v?.length === 14 || _v?.length === 13) {
                                                            GetCNPJ(_v)
                                                        }
                                                        setCnpj(value)
                                                    },
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
                                                type="text"
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
                                                    },
                                                    setValueAs: value => value
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
                                                type="text"
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
                                                {...register("cidade", {

                                                })}
                                                disabled
                                                placeholder="Cidade" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="cep">
                                            <Form.Label>Logradouro</Form.Label>
                                            <Form.Control
                                             {...register("logradouro", {

                                             })}
                                                type="text"
                                                placeholder="Logradouro" />

                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Complemento</Form.Label>
                                            <Form.Control
                                             {...register("complemento", {

                                             })}
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
                                                {...register("bairro", {
                                                    required: {
                                                        value: true,
                                                        message: "Bairro requerido."
                                                    }
                                                })}
                                                type="text"
                                                placeholder="Bairro" />
                                            <Form.Text className="text-danger">{errors?.bairro?.message ?? ""}</Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Numero</Form.Label>
                                            <Form.Control
                                                {...register("numero", {

                                                })}
                                                type="text"
                                                placeholder="Número" />
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
                                                type="text"
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
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
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