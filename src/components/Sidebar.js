
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { CSSTransition } from 'react-transition-group';
import { UserIcon, CalendarIcon, ChartBarIcon, ChartPieIcon, ChevronRightIcon, ClipboardListIcon, CogIcon, CreditCardIcon, InboxIcon, InformationCircleIcon, LocationMarkerIcon, NewspaperIcon, TableIcon, TemplateIcon, UsersIcon, ViewGridIcon, XIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { Nav, Badge, Image, Button, Dropdown, Navbar, Collapse, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FaUserShield, FaUsers, FaUsersCog } from "react-icons/fa"

import { Routes } from "routes";
import ReactHero from "assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const [collapsedItems, setCollapsedItems] = useState([pathname]);
  const contracted = props.contracted ? "contracted" : "";
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);
  const onMouseEnter = () => props.onMouseEnter && props.onMouseEnter();
  const onMouseLeave = () => props.onMouseLeave && props.onMouseLeave();

  const onNavItemCollapse = (itemKey) => {
    const isCollapsed = collapsedItems.some(item => item.includes(itemKey));
    const newCollapsedItems = isCollapsed ? collapsedItems.filter(item => !item.includes(itemKey)) : [...collapsedItems, itemKey];
    setCollapsedItems(newCollapsedItems);
  };

  const events = isMobile ? {} : { onMouseEnter, onMouseLeave };

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon: NavItemIcon, children = null } = props;
    const isOpened = collapsedItems.some(item => item.includes(eventKey));

    return (
      <Nav.Item>
        <Nav.Link
          onClick={() => onNavItemCollapse(eventKey)}
          aria-expanded={isOpened}
          aria-controls={eventKey}
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <span className="sidebar-icon">
              <NavItemIcon className="icon icon-xs me-2" />
            </span>
            <span className="sidebar-text">
              {title}
            </span>
          </span>
          <span className="link-arrow">
            <ChevronRightIcon className="icon icon-sm" />
          </span>
        </Nav.Link>
        <Collapse in={isOpened} className="multi-level">
          <div id={eventKey}>
            {children}
          </div>
        </Collapse>
      </Nav.Item>
    );
  };

  const NavItem = (props) => {
    const { title, link, target, icon: NavItemIcon, image, badgeText, badgeBg, badgeColor = "white" } = props;
    const classNames = badgeText ? "d-flex align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link as={Link} to={link} target={target} className={classNames}>
          <span>
            {NavItemIcon && (
              <span className="sidebar-icon">
                <NavItemIcon className="icon icon-xs me-2" size={20} />
              </span>
            )}

            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            {!show && contracted && !NavItemIcon && !image ? (
              <span className="sidebar-text-contracted">
                {title[0]}
              </span>
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>

          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-sm notification-count">
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar as={Col} xs={12} expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-lg-none">
        <Navbar.Brand as={Link} to={Routes.DashboardOverview.path} className="me-lg-5">
          <Image src={ReactHero} className="navbar-brand-dark" />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Navbar.Toggle as={Button} onClick={onCollapse}>
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
        </div>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar {...events} className={`${contracted} ${showClass} sidebar d-lg-block bg-gray-800 text-white collapse`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="avatar-lg me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h5 className="mb-3">Hi, Jane</h5>
                  <Button as={Link} variant="secondary" size="sm" to={Routes.Signin.path} className="d-inline-flex align-items-center">
                    <LogoutIcon className="icon icon-xxs me-1" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <XIcon className="icon icon-xs" />
              </Nav.Link>
            </div>
            <div className="d-inline-flex align-items-center gap-4 pt-2 pb-5">
              <Image src={"https://frontrevenda.alphapdv.com.br/static/media/logo_small.70834d4243518f8b9e1b.png"}
                width={30} height={30} className="sidebar-icon svg-icon" />
              <div >
                <div>Alpha</div>
                <span>Tecnologia</span>
              </div>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">

              <CollapsableNavItem eventKey="dashboard/" title="Dashboard" icon={ChartBarIcon}>
                <NavItem title="Overview" link={Routes.DashboardOverview.path} />
                <NavItem title="All Traffic" link={Routes.DashboardTraffic.path} />
                <NavItem title="Product Analysis" link={Routes.DashboardProductAnalysis.path} />
              </CollapsableNavItem>
              <NavItem title="Clientes" icon={FaUsers} link={Routes.Clients.path} />
              <NavItem title="Usuários" icon={FaUsersCog} link={Routes.Billing.path} />
              {/* 
              <NavItem title="Kanban" icon={ViewGridIcon} link={Routes.Kanban.path} />
              <NavItem title="Messages" icon={InboxIcon} badgeText="4" badgeBg="danger" link={Routes.Messages.path} />
              <NavItem title="Users List" icon={UsersIcon} link={Routes.Users.path} />
              <NavItem title="Transactions" icon={CreditCardIcon} link={Routes.Transactions.path} />
              <NavItem title="Task List" icon={ClipboardListIcon} link={Routes.Tasks.path} />
              <NavItem title="Settings" icon={CogIcon} link={Routes.Settings.path} />
              <NavItem title="Calendar" icon={CalendarIcon} link={Routes.Calendar.path} />
              <NavItem title="Map" icon={LocationMarkerIcon} link={Routes.Map.path} />

              <CollapsableNavItem eventKey="tables/" title="Tables" icon={TableIcon}>
                <NavItem title="DataTables" link={Routes.Datatables.path} />
                <NavItem title="Bootstrap Tables" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>
              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={NewspaperIcon}>
                <NavItem title="Pricing" link={Routes.Pricing.path} />
                <NavItem title="Billing" link={Routes.Billing.path} />
                <NavItem title="Invoice" link={Routes.Invoice.path} />
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
