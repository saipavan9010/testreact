import React from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import './login.css';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '',password:''};
   
  }
  

  handleChange= (event) => {
    
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit= (event)=> {
    axios.post(`http://localhost:3001/users/login`, this.state)
      .then(res => {
        alert(res.data.message);
       // window.location.reload();
      }).catch(function (error) {
        console.log(error);
      });
   event.preventDefault();
  }
 
  render() {
    return (
      <div className="wrapper fadeInDown">
         <div id="formContent">
          <div className="fadeIn first">
          <img src={logo} className="App-logo" alt="logo" />
          </div>
           
          <form onSubmit={this.handleSubmit}>
          <input type="text" id="login" className="fadeIn second"name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
          <input type="password" id="password" className="fadeIn third" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password"/>
          <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>

          <div id="formFooter">
            <Link  className="underlineHover" to="register">Sign Up</Link>
          </div>

          </div>
/
       </div>
    );
  }
}
export default Login
