import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import "./scss/volt.scss";

import "leaflet/dist/leaflet.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from 'context/auth';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <HomePage />
      <Toaster 
       position="bottom-center"
       reverseOrder={false}
      />
    </BrowserRouter>
  </AuthProvider>
  , document.getElementById("root")
);
