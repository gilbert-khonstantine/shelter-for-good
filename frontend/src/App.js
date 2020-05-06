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
            if (decoded.exp < currentTime) {
                return (
                    <Router>
                        <div className="App">
                            <Route exact path="/" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/login" component={Login} />
                        </div>
                    </Router>
                );
            }
            else {
                if (localStorage.getItem("token") && localStorage.domain == "user") {
                    return (<Router>
                        <Route path="/user" component={userPage} />
                        <Redirect to="/user" component={userPage} />
                    </Router>)
                }
                else if (localStorage.getItem("token") && localStorage.domain == "admin") {
                    return (<Router>
                        <Route path="/admin" component={adminPage} />
                        <Redirect to="/admin" component={adminPage} />
                    </Router>)
                }
            }
        }
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}
export default App;