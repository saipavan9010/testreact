import React from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import SimpleReactValidator from 'simple-react-validator';
// import '../../login.css'; 
import { Route, Link,Redirect, BrowserRouter as Router } from 'react-router-dom'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '',password:''};
    this.validator = new SimpleReactValidator();
    this.ApiUrl=process.env.REACT_APP_API_URL;
   
  }
  handleChange= (event) => {
    
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit= (event)=> {
    console.log(this.state);
   if (this.validator.allValid()) {
     
      axios.post(this.ApiUrl+`/users/login`, this.state)
        .then(res => {
          alert(res.data.message);
          localStorage.setItem('token',res.data.data.token);
          this.props.history.push('/dashboard'); 
        }).catch(function (error) {
          console.log(error);
        });
   } else {
      this.validator.showMessages();
      this.forceUpdate();
   }  
   event.preventDefault();
  }
 
  render() {
    return (
      <div className="Container">
        <h3>Login Form</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-md-6">
              <label >Email:</label>
              <input type="text" className="form-control "  name="email" value={this.state.email} onChange={this.handleChange}/>
              {this.validator.message('email', this.state.email, 'required|email')}    
          </div>
          <div className="form-group col-md-6">
            <label >Password:</label>
            <input type="password" className="form-control "  name="password" value={this.state.password} onChange={this.handleChange}/>
            {this.validator.message('password', this.state.password, 'required|min:6')}      
         </div>
          <div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link  className="underlineHover" to="register">Sign Up</Link>
          </div>
        </form>
      </div>
      
    );
  }
}
export default Login
