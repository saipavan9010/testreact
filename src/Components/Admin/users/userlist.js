import React from "react";
import Menu from '../layout/menu';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Button,Modal } from 'react-bootstrap';


class UserList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    userlist:[],
    lgShow:false,
    setLgShow:false
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
     this.setState({userlist:res.data.data.user,show: true});
     }).catch(function (error) {
      console.log(error.response.data.message);
   });
}

userEdit=(id)=>{
  const headertoken = localStorage.getItem("token");
  axios.get(this.ApiUrl+`/user/detail/${id}`,{headers:{'Authorization': `Bearer ${headertoken}`}})
  .then(res => {
  console.log(res)
   }).catch(function (error) {
    console.log(error);
 });
}
setLgShow=(bool)=>{
  this.setState({lgShow:bool})
}

UserTableData() {
  return this.state.userlist.map((user, index) => {
     const { _id,first_name, last_name, mobile_no,email } = user //destructuring
     return (
        <tr key={index}>
           <td>{index+1}</td>
           <td>{first_name}</td>
           <td>{last_name}</td>
           <td>{mobile_no}</td>
           <td>{email}</td>
           <td><i className="fa fa-pencil-square-o"   aria-hidden="true" onClick={()=>this.userEdit(_id)}>Edit</i></td>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {this.UserTableData()}
            </tbody>
          </table>
        
        </div>
        <Button onClick={() => this.setLgShow(true)}>Large modal</Button>
        <Modal size="lg" show={this.state.lgShow} onHide={() => this.setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      </div>
    );
  }

} 

export default UserList
