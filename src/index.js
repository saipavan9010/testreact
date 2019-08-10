import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import Dashboard from './Components/Admin/dashboard';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route  path="/login" component={Login} />
        <Route  path="/register" component={Register} />
        <Route  path="/dashboard" component={Dashboard} />
        
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); 
