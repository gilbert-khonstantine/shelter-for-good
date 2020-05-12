import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import dashboardPage from "./components/dashboard.component";
import shelterPage from "./components/shelter-list.component"
import detailedPage from "./components/edit-uploads.component"
function Admin() {
  function logOut() {
    localStorage.clear()
  }
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/admin" className="navbar-brand">Admin</Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/shelterList">Data Collected</Link>
            </li>
          </ul>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="my-2 my-lg-0">
                <a href="/" onClick={logOut}>Log Out</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* this is the main structure for the user  */}
        <Route path="/admin/dashboard" component={dashboardPage} />
        <Route path="/admin/shelterList" component={shelterPage} />
        <Route path="/admin/view/:id" component={detailedPage} />
      </div>
    </Router>
  );
}

export default Admin;
