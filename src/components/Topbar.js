
import React, { useState } from "react";
import moment from "moment-timezone";
import { BellIcon, CogIcon, InboxIcon, MenuAlt1Icon, SearchIcon, SupportIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Row, Col, Nav, Form, Image, Button, Navbar, Dropdown, Container, ListGroup, InputGroup } from 'react-bootstrap';

import { userNotifications } from "data/notifications";
import Profile3 from "assets/img/team/profile-picture-3.jpg";
import useAuth from "context/auth";
import { FaUser } from "react-icons/fa";


export default (props) => {

  const { user } = useAuth();

  const [notifications, setNotifications] = useState(userNotifications);
  const allNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

  const toggleContracted = () => props.toggleContracted && props.toggleContracted();
  return (
    <Navbar expand variant="dark" className="navbar-top navbar-dashboard ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Button
              size="lg"
              id="sidebar-toggle"
              variant="icon-only"
              className="sidebar-toggle d-none d-lg-inline-block align-items-center justify-content-center me-3"
              onClick={toggleContracted}
            >
              <MenuAlt1Icon className="toggle-icon" />
            </Button>
            <Form className="navbar-search form-inline">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><SearchIcon className="icon icon-xs" /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item} className="ms-lg-3">
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  {
                    user?.avatar_base64 ?
                      <Image src={user.avatar_base64} className="avatar rounded-circle" /> :
                      <div className="avatar rounded-circle bg-primary d-flex align-items-center justify-content-center">
                        <FaUser />
                      </div>

                  }
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">{user?.nome_usuario}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <Dropdown.Item className="d-flex align-items-center">
                  <UserCircleIcon className="dropdown-icon text-gray-400 me-2" /> Meu perfil
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <SupportIcon className="dropdown-icon text-gray-400 me-2" /> Supporte
                </Dropdown.Item>
                <Dropdown.Divider as="div" className="my-1" />

                <Dropdown.Item className="d-flex align-items-center">
                  <LogoutIcon className="dropdown-icon text-danger me-2" /> Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
