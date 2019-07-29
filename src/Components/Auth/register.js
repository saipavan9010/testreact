import React from 'react';
import axios from 'axios';
class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {first_name: '',last_name:'',mobile_no:'',email:'',user_name:'',password:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    axios.post(`http://localhost:3001/users/create`, this.state)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    event.preventDefault();
  }
 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Frist Name:
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Last Name:
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
         Mobile No:
          <input type="number" name="mobile_no" value={this.state.mobile_no} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
         Email:
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          User Name:
          <input type="text" name="user_name" value={this.state.user_name} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Register
