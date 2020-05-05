import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
class App extends Component {
    render() {
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