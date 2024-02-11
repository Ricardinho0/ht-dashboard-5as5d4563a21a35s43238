
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "routes";

import DashboardOverview from "pages/dashboard/DashboardOverview";
import DashboardTraffic from "pages/dashboard/DashboardTraffic";
import DashboardProductAnalysis from "pages/dashboard/DashboardProductAnalysis";
import Kanban from 'pages/Kanban';
import Messages from "pages/Messages";
import SingleMessage from "pages/SingleMessage";
import Users from "pages/Users";
import Transactions from "pages/Transactions";
import Tasks from "pages/Tasks";
import Settings from "pages/Settings";
import Calendar from "pages/Calendar";
import MapPage from "pages/Map";
import Datatables from "pages/tables/Datatables";
import BootstrapTables from "pages/tables/BootstrapTables";
import Pricing from "pages/examples/Pricing";
import Billing from "pages/examples/Billing";
import Invoice from "pages/examples/Invoice";
import Signin from "pages/auth/login";
import Signup from "pages/examples/Signup";
import ForgotPassword from "pages/examples/ForgotPassword";
import ResetPassword from "pages/examples/ResetPassword";
import Lock from "pages/examples/Lock";
import NotFoundPage from "pages/examples/NotFound";
import ServerError from "pages/examples/ServerError";


// components
import Sidebar from 'components/Sidebar';
import Topbar from 'components/Topbar';
import Footer from 'components/Footer';

import useAuth from 'context/auth';
import ClientsPage from './clients';


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

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
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
          <Footer />
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

      <Route exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
      <Route exact path={Routes.ResetPassword.path} component={ResetPassword} />
      <Route exact path={Routes.Lock.path} component={Lock} />
      <Route exact path={Routes.NotFound.path} component={NotFoundPage} />
      <Route exact path={Routes.ServerError.path} component={ServerError} />

      {/* pages */}
      <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
      <RouteWithSidebar exact path={Routes.DashboardTraffic.path} component={DashboardTraffic} />
      <RouteWithSidebar exact path={Routes.DashboardProductAnalysis.path} component={DashboardProductAnalysis} />
      <RouteWithSidebar exact path={Routes.Kanban.path} component={Kanban} />
      <RouteWithSidebar exact path={Routes.Messages.path} component={Messages} />
      <RouteWithSidebar exact path={Routes.SingleMessage.path} component={SingleMessage} />
      <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
      <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
      <RouteWithSidebar exact path={Routes.Tasks.path} component={Tasks} />
      <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
      <RouteWithSidebar exact path={Routes.Calendar.path} component={Calendar} />
      <RouteWithSidebar exact path={Routes.Map.path} component={MapPage} />
      <RouteWithSidebar exact path={Routes.Datatables.path} component={Datatables} />
      <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
      <RouteWithSidebar exact path={Routes.Pricing.path} component={Pricing} />
      <RouteWithSidebar exact path={Routes.Billing.path} component={Billing} />
      <RouteWithSidebar exact path={Routes.Invoice.path} component={Invoice} />

      <Redirect to={Routes.DashboardOverview.path} />
    </Switch>
  )
};
