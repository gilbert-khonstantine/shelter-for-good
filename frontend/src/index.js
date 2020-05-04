import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from './Login'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/login" component={Login} />
      <Redirect to="/login" component={Login} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
