import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Spinner, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "routes";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { AuthService } from "service/auth";
import validator from "validator";
import useAuth from "context/auth";
import Toast from "components/Toast";


export default () => {

  const { Authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [toastError, setToastError] = useState("")

  const SubmitSigIn = ({ username, password }) => {
    setLoading(true)
    setToastError("")
    AuthService.login(username, password)
      .then(({ data }) => {
        if (data) {
          Authenticate(data)
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setToastError("Credenciais invalidas.")
          return
        }
        setToastError('Erro ao realizar login, contate o suporte caso o problema persista!')
      })
      .finally(() => setLoading(false))
  }

  return (
    <main>
      <Toast
        show={!!toastError}
        header={'Erro ao realizar login'}
        body={toastError}
        variant={'danger'}
        onClose={() => setToastError("")}
      />
      <section className="d-flex align-items-center vh-lg-100 mt-5 mt-lg-0 bg-soft">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Faça login em nossa plataforma</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(SubmitSigIn)}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Seu Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <MailIcon className="icon icon-xs text-gray-600" />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        {...register("username", {
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
                        placeholder="example@email.com" />

                    </InputGroup>
                    <Form.Text className="text-danger">{errors?.username?.message ?? ""}</Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Sua Senha</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <LockClosedIcon className="icon icon-xs text-gray-600" />
                        </InputGroup.Text>
                        <Form.Control
                          {...register("password", {
                            minLength: {
                              value: 4,
                              message: "Senha deve ter no mínimo 4 caracteres"
                            },
                            required: {
                              value: true,
                              message: "Senha requerida!"
                            }
                          })}
                          type="password" placeholder="Password" />
                      </InputGroup>
                      <Form.Text className="text-danger">{errors?.password?.message ?? ""}</Form.Text>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-top mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Lembrar de min</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Esqueçeu a senha?</Card.Link>
                    </div>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant={loading ? "gray-400" : "gray-800"} type="submit">
                      {loading ? <Spinner size="sm" animation="border" /> : "Entrar"}
                    </Button>
                  </div>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">Siga-nos nas redes sociais</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-gray-500" className="btn-icon-only btn-pill me-2 p-2">
                    <FaInstagram size="xs" color="currentColor" />
                  </Button>
                  <Button variant="outline-gray-500" className="btn-icon-only btn-pill me-2 p-2">
                    <FaYoutube size="xs" color="currentColor" />
                  </Button>
                  <Button variant="outline-gray-500" className="btn-icon-only btn-pill p-2">
                    <FaFacebook size="xs" color="currentColor" />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Acesse nosso site
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` hotlinetecnologia.com.br`}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
