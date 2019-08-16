import React from "react";
import Menu from '../layout/menu';
import axios from 'axios';

class UserList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    userlist:[]
  };
  this.ApiUrl=process.env.REACT_APP_API_URL;
}

componentWillMount(){
this.getData();
}  

getData(){
  const headertoken = localStorage.getItem("token");
  axios.get(this.ApiUrl+`/user/userslist`,{headers:{'Authorization': `Bearer ${headertoken}`}})
    .then(res => {
     this.setState({userlist:res.data.data.user});
     }).catch(function (error) {
      console.log(error.response.data.message);
   });
}


UserTableData() {
  return this.state.userlist.map((user, index) => {
     const { first_name, last_name, mobile_no,email } = user //destructuring
     return (
        <tr key={index}>
           <td>{index+1}</td>
           <td>{first_name}</td>
           <td>{last_name}</td>
           <td>{mobile_no}</td>
           <td>{email}</td>
        </tr>
     )
  });
}



render() {
  return (
     
    <div>
      <Menu/>
        <div className="container">
        <h3>UserList</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sno</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
             {this.UserTableData()}
            </tbody>
          </table>
        
        </div>
      </div>
    );
  }

} 

export default UserList
