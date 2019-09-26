import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import {PrivateRoute} from './Helpers/PrivateRoute';
import './index.css';
import App from './App';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import Dashboard from './Components/Admin/dashboard';
import Userlist from './Components/Admin/users/userlist';
import Countrylist from './Components/Admin/country/countrylist';
import Citylist from './Components/Admin/city/citylist';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'
import {createStore} from 'redux';
import studentReducer from './reducers/studentReducer';
import {Provider} from 'react-redux'

const routing = (
    <Router >
      <div>
        <Switch>
        <Route exact path="/" component={App} />
        <Route  path="/login" component={Login} />
        <Route  path="/register" component={Register} />
        <PrivateRoute  path="/dashboard" component={Dashboard} />
        <PrivateRoute  path="/userlist" component={Userlist} />
        <PrivateRoute  path="/countrylist" component={Countrylist} />
        <PrivateRoute  path="/citylist" component={Citylist} />
        </Switch>
      </div>
    </Router>
  )

  let initialState = [];
const store = createStore(studentReducer,initialState);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); 
