import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import adminPage from './Admin';
import userPage from './User';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        let choice = document.getElementById("loginDomain");
        let domain = choice.options[choice.selectedIndex].text;
        // remember to check the username and password to match in the db
        if (domain === "User") {
            ReactDOM.render(
                <Router>
                    <Route path="/user" component={userPage} />
                    <Redirect to="/user" component={userPage} />
                </Router>
                ,
                document.getElementById('root')
            );

        }

        else if (domain === "Admin") {
            ReactDOM.render(
                <React.StrictMode>
                    <Router>
                        <Route path="/admin" component={adminPage} />
                        <Redirect to="/admin" component={adminPage} />
                    </Router>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    }
    render() {
        return (
            <Router>
                <h1> LOGIN PAGE </h1>
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <label>Email:</label>
                        <input id="loginEmail" type="text" className="form-control" />
                        <label>Password:</label>
                        <input type="password" className="form-control" />
                        <label>Domain</label>
                        <select className="form-control" id="loginDomain">
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                </div>
            </Router >
        )
    }
}