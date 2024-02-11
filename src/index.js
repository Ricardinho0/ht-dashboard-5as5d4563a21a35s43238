import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from '../node_modules/sonner/dist/index';
import "./scss/volt.scss";

import "leaflet/dist/leaflet.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from 'context/auth';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <HomePage />
      <Toaster />
    </BrowserRouter>
  </AuthProvider>
  , document.getElementById("root")
);
