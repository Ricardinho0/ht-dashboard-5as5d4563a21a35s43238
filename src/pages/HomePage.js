
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "routes";
import Signin from "pages/auth/login";

import Sidebar from 'components/Sidebar';
import Topbar from 'components/Topbar';
import Footer from 'components/Footer';

import useAuth from 'context/auth';
import ClientsPage from './clients';
import UsersPage from 'pages/users';
import DetailsClientPage from './clients/details';
import DetailsUsersPage from './users/details';


const RouteWithSidebar = ({ component: Component, ...rest }) => {

  const resize = () => {
    var resize = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
    setTimeout(function () {
      clearInterval(resize);
    }, 301);
  }

  const localStorageIsContracted = () => {
    return localStorage.getItem('sidebarContracted') === 'true' ? true : false
  }

  const [contracted, setContracted] = useState(localStorageIsContracted());
  const [contractSidebar, setContractSidebar] = useState(localStorageIsContracted());

  const toggleMouseOver = () => {
    if (contracted) {
      setContractSidebar(!contractSidebar);
    }
    resize();
  };

  const toggleContracted = () => {
    setContracted(!contracted);
    setContractSidebar(!contracted);
    localStorage.setItem('sidebarContracted', !contracted);
    resize();
  };

  return (
    <Route {...rest} render={props => (
      <>
        <Sidebar
          contracted={contractSidebar}
          onMouseEnter={toggleMouseOver}
          onMouseLeave={toggleMouseOver}
        />

        <main className="content">
          <Topbar toggleContracted={toggleContracted} />
          <Component {...props} />
          {/* <Footer /> */}
        </main>
      </>
    )}
    />
  );
};

export default () => {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route exact path={Routes.Signin.path} component={Signin} />
        <Redirect to={Routes.Signin.path} />
      </Switch>
    )
  }

  return (
    <Switch>
      <RouteWithSidebar exact path={Routes.Clients.path} component={ClientsPage} />
      <RouteWithSidebar exact path={Routes.Clients.details} component={DetailsClientPage} />
      <RouteWithSidebar exact path={Routes.Users.path} component={UsersPage} />
      <RouteWithSidebar exact path={Routes.Users.details} component={DetailsUsersPage} />


      <Redirect to={Routes.Clients.path} />
    </Switch>
  )
};
