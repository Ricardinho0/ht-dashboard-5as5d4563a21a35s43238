
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArchiveIcon, CalendarIcon, CameraIcon, CheckIcon, ClipboardCheckIcon, ClockIcon, EyeIcon, PaperClipIcon, PlusIcon, SelectorIcon, ShareIcon, TagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Col, Row, Form, Modal, Button, InputGroup, Image, Badge, FloatingLabel, Card } from 'react-bootstrap';

import KanbanAvatar from "components/KanbanAvatar";
import { Members as BoardMembers, Labels as BoardLabels } from "data/kanban";

const NewClient = (props) => {
    const [title, setTitle] = useState(props.title);
    const [start, setStart] = useState(props.start);
    const [end, setEnd] = useState(props.end);

    const [birthday, setBirthday] = useState("");

    const { show = false, edit = false, id } = props;
    const startDate = start ? moment(start).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const endDate = end ? moment(end).format("YYYY-MM-DD") : moment(start).format("YYYY-MM-DD");

    const onHide = () => props.onClose();
    

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
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter your first name" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control required type="text" placeholder="Also your last name" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="birthday">
                                            <Form.Label>Birthday</Form.Label>
                                            <Datetime
                                                timeFormat={false}
                                                onChange={setBirthday}
                                                renderInput={(props, openCalendar) => (
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <CalendarIcon className="icon icon-xs" />
                                                        </InputGroup.Text>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
                                                            placeholder="dd/mm/yyyy"
                                                            onFocus={openCalendar}
                                                            onChange={() => { }} />
                                                    </InputGroup>
                                                )} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="gender">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select defaultValue="0" className="mb-0">
                                                <option value="0">Gender</option>
                                                <option value="1">Female</option>
                                                <option value="2">Male</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="email" placeholder="name@company.com" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group id="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control required type="number" placeholder="+12-345 678 910" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <h5 className="my-4">Location</h5>
                                <Row>
                                    <Col sm={9} className="mb-3">
                                        <Form.Group id="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter your home address" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3} className="mb-3">
                                        <Form.Group id="addressNumber">
                                            <Form.Label>Number</Form.Label>
                                            <Form.Control required type="number" placeholder="No." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4} className="mb-3">
                                        <Form.Group id="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control required type="text" placeholder="City" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Form.Group className="mb-2">
                                            <Form.Label>Select state</Form.Label>
                                            <Form.Select id="state" defaultValue="0">
                                                <option value="0">State</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Group id="zip">
                                            <Form.Label>ZIP</Form.Label>
                                            <Form.Control required type="tel" placeholder="ZIP" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <Button variant="gray-800" type="submit" className="mt-2 animate-up-2">
                                        Save All
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