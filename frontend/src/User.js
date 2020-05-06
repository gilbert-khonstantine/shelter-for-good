import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import aboutUsPage from "./components/about-us.component"
import uploadPage from "./components/upload-portal.component"
import historicalPage from "./components/historical-upload.component"

function User() {
    function logOut() {
        localStorage.clear()
    }
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/user" className="navbar-brand">User</Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/about-us">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/upload">Uploads</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/historical-uploads">Historical Uploads</Link>
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
                <h1> Welcome to user page </h1>

                {/* this is the main structure for the user  */}
                <Route path="/user/about-us" component={aboutUsPage} />
                <Route path="/user/upload" component={uploadPage} />
                <Route path="/user/historical-uploads" component={historicalPage} />
            </div>
        </Router>
    );
}

export default User;
