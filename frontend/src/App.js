import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import Signup from "./Signup";
import Login from "./Login";
import userPage from "./User";
import adminPage from "./Admin";
class App extends Component {
    render() {
        if (localStorage.getItem("token")) {
            const decoded = jwt_decode(localStorage.getItem("token"));
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp >= currentTime) {
                return (
                    <Router>
                        <Route path={localStorage.domain === "user" ? "/user" : "/admin"} component={localStorage.domain === "user" ? userPage : adminPage} />
                        <Redirect to={localStorage.domain === "user" ? "/user" : "/admin"} component={localStorage.domain === "user" ? userPage : adminPage} />
                    </Router>
                )
            }
        }
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router >
        );
    }
}
export default App;