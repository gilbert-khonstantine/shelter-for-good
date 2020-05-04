import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import aboutUsPage from "./components/about-us.component"
import uploadPage from "./components/upload-portal.component"

function User() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/user/upload" className="navbar-brand">Share</Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/about-us">About Us</Link>
                        </li>
                    </ul>
                </nav>
                <h1> Welcome to user page </h1>

                {/* this is the main structure for the user  */}
                <Route path="/user/about-us" component={aboutUsPage} />
                <Route path="/user/upload" component={uploadPage} />
            </div>
        </Router>
    );
}

export default User;
