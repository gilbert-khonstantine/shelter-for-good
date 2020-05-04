import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import dashboardPage from "./components/dashboard.component";
import shelterPage from "./components/shelter-list.component"

function Admin() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/admin/dashboard" className="navbar-brand">Dashboard</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/shelterList">Data Collected</Link>
            </li>
          </ul>
        </nav>
        <h1> Welcome to admin page </h1>

        {/* this is the main structure for the user  */}
        <Route path="/admin/dashboard" component={dashboardPage} />
        <Route path="/admin/shelterList" component={shelterPage} />
      </div>
    </Router>
  );
}

export default Admin;
