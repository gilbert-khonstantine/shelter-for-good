import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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
        this.props.signUpUser(domain, newUser, this.props.history);
        console.log(newUser)
        // axios.post("/api/" + domain.toLowerCase() + "/signup", newUser)
        //     .then((res) => {
        //         console.log("Post Request Sent Successfully!")
        //         this.setState({
        //             errors: {},
        //             goToLogin: true
        //         })
        //     })
        //     .catch((err) => {
        //         this.setState({
        //             errors: err.response.data
        //         })
        //     })
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
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            type="text"
                            id="name"
                            placeholder={errors.name}
                            className={classnames("", {
                                invalid: errors.name
                            })}
                        />

                        <span className="red-text">{errors.name}</span>

                        <label>Email</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            type="text"
                            id="email"
                            placeholder={errors.email}
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <span className="red-text">{errors.email}</span>
                        <label>Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            type="password"
                            id="password"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <span className="red-text">{errors.password}</span>

                        <label>Confirm Password</label>
                        <input
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            type="password"
                            id="password2"
                        />
                        <span className="red-text">{errors.passwor2}</span>

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
SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { signUpUser }
)(withRouter(SignUp));