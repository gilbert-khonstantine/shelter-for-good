import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import adminPage from './Admin';
import userPage from './User';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            login: false,
            email: "",
            password: "",
            domain: "User"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    handleSubmit(e) {
        e.preventDefault();
        let choice = document.getElementById("loginDomain");
        let domain = choice.options[choice.selectedIndex].text;
        let details = {
            email: this.state.email,
            password: this.state.password,
            domain: domain
        }
        axios.post("/api/" + domain.toLowerCase() + "/login", details)
            .then((res) => {
                console.log("Post Request Sent Successfully!")
                this.setState({
                    errors: {},
                    login: true,
                    domain: domain
                })
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("id", res.data.id)
                localStorage.setItem("domain", res.data.domain)
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data
                })
            })
    }
    render() {
        const { errors } = this.state;
        if (this.state.login) {
            if (this.state.domain === "Admin") {
                return (
                    <Router>
                        <Route path="/admin" component={adminPage} />
                        <Redirect to="/admin" component={adminPage} />
                    </Router>
                )
            }
            else if (this.state.domain === "User") {
                return (<Router>
                    <Route path="/user" component={userPage} />
                    <Redirect to="/user" component={userPage} />
                </Router>)
            }
        }

        return (
            <div className="container">
                <h3> LOGIN </h3>
                <p>Does not have account yet? sign up <Link to="/signup"> here </Link></p>
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <label>Email:</label>
                        <input id="email" type="text" className="form-control" onChange={this.onChange} />
                        <p style={{ color: 'red' }}>{errors.email}</p>
                        <label>Password:</label>
                        <input id="password" type="password" className="form-control" onChange={this.onChange} />
                        <p style={{ color: 'red' }}>{errors.password}</p>
                        <p style={{ color: 'red' }}>{errors.passwordincorrect}</p>
                        <label>Domain</label>
                        <select className="form-control" id="loginDomain">
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}