import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {first_name: '',last_name:'',mobile_no:'',mobile_noerror:'',email:'',emailerror:'',user_name:'',user_nameerror:'',password:'',passworderror:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    if (this.validator.allValid()) {
      axios.post(`http://localhost:3001/users/create`, this.state)
      .then(res => {
        alert(res.data.message);
        window.location.reload();
      }).catch(function (error) {
        alert(error.response.data.message);
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
      <h3>Register Form</h3>
      <form onSubmit={this.handleSubmit}>
        
        <div className="form-group col-md-6">
          <label >First Name:</label>
          <input type="text" className="form-control "  name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
        </div>

        <div className="form-group col-md-6">
          <label >Last Name:</label>
          <input type="text" className="form-control "  name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
        </div>

        <div className="form-group col-md-6">
          <label >Mobile No:</label>
          <input type="number" className="form-control "  name="mobile_no" value={this.state.mobile_no} onChange={this.handleChange}/>
          {this.validator.message('mobile_no', this.state.mobile_no, 'required|phone')}     
        </div>


        <div className="form-group col-md-6">
          <label >Email:</label>
          <input type="text" className="form-control "  name="email" value={this.state.email} onChange={this.handleChange}/>
          {this.validator.message('email', this.state.email, 'required|email')}    
        
        </div>

        <div className="form-group col-md-6">
          <label >User Name:</label>
          <input type="text" className="form-control "  name="user_name" value={this.state.user_name} onChange={this.handleChange}/>
          {this.validator.message('user_name', this.state.user_name, 'required|min:3')}    
             
        
        </div>



        <div className="form-group col-md-6">
          <label >Password:</label>
          <input type="password" className="form-control "  name="password" value={this.state.password} onChange={this.handleChange}/>
          {this.validator.message('password', this.state.password, 'required|min:6')}      
           
        </div>
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    );
  }
}
export default Register
