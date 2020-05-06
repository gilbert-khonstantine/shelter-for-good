import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            domain: "",
            errors: {},
            goToLogin: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    handleSubmit = e => {
        e.preventDefault();
        let choice = document.getElementById("domain");
        let domain = choice.options[choice.selectedIndex].text;
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            domain: domain
        };
        this.setState({
            newUser
        })
        axios.post("/api/" + domain.toLowerCase() + "/signup", newUser)
            .then((res) => {
                console.log("Post Request Sent Successfully!")
                this.setState({
                    errors: {},
                    goToLogin: true
                })
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data
                })
            })
    };
    render() {
        const { errors } = this.state;
        if (this.state.goToLogin) {
            return <Redirect to='/login' />;
        }
        return (
            <div className="container">
                <h4>
                    <b>Register</b>
                </h4>
                <div className="row">
                    <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            type="text"
                            id="name"
                            placeholder={errors.name}
                        />
                        <p style={{ color: 'red' }}>{errors.name}</p>
                        <label>Email</label>
                        <input
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            type="text"
                            id="email"
                            placeholder={errors.email}
                        />
                        <p style={{ color: 'red' }}>{errors.email}</p>
                        <label>Password</label>
                        <input
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            type="password"
                            id="password"
                        />
                        <p style={{ color: 'red' }}>{errors.password}</p>
                        <label>Confirm Password</label>
                        <input
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            type="password"
                            id="password2"
                        />
                        <p style={{ color: 'red' }}>{errors.password2}</p>
                        <label>Domain</label>
                        <select className="form-control" id="domain">
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Sign Up" />
                    </form>
                </div>
            </div >
        );
    }
}