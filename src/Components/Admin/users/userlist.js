import React from "react";
import ReactDOM from "react-dom";
import Menu from '../layout/menu';
// import UserForm from './userform';
import axios from 'axios';
import {Modal,Form,Container,Col,Row,Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';


class UserList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    userlist:[],
    lgShow:false,
    setLgShow:false,id: '',first_name: '',last_name:'',mobile_no:'',email:'',user_name:'',password:''
  };
  this.ApiUrl=process.env.REACT_APP_API_URL;
  this.validator = new SimpleReactValidator();
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
      console.log(error);
   });
}

userEdit=(id)=>{
  const headertoken = localStorage.getItem("token");
  this.setState({lgShow:true,id:id});
  axios.get(this.ApiUrl+`/user/detail/${id}`,{headers:{'Authorization': `Bearer ${headertoken}`}})
  .then(res => {
      this.setState(res.data.data.user);
      

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

handleChange= (event) => {
  this.setState({[event.target.name]: event.target.value});
}

handleSubmit= (event)=> {
  if (this.validator.allValid()) {
     const headertoken = localStorage.getItem("token"); 
     axios.post(this.ApiUrl+`/user/update/${this.state.id}`, this.state,{headers:{'Authorization': `Bearer ${headertoken}`}})
       .then(res => {
         alert(res.data.message);
         this.setState({lgShow:false});
         this.getData();
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
  const {id}=this.state;
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
                <th>Mobile</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {this.UserTableData()}
            </tbody>
          </table>
        
        </div>
       
        <Modal size="lg" show={this.state.lgShow} onHide={() => this.setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            User Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                    
                            <Form.Group as={Col}  controlId="formGroupEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter First Name" value={this.state.first_name} onChange={this.handleChange}/>
                            </Form.Group>
                    
                    
                            <Form.Group as={Col} controlId="formGroupEmail">
                            <Form.Label >Last Name</Form.Label>
                            <Form.Control  type="text" name="last_name" placeholder="Enter Last Name" value={this.state.last_name} onChange={this.handleChange}/>
                            </Form.Group>
                    
                    </Form.Row>
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
                            {this.validator.message('email', this.state.email, 'required|email')}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGroupEmail">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="number" name="mobile_no" placeholder="Enter Mobile No" value={this.state.mobile_no} onChange={this.handleChange}/>
                            {this.validator.message('mobile_no', this.state.mobile_no, 'required|phone')}
                            </Form.Group>
                        </Form.Row>
                     <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Sign in</Button>
                            </Col>
                        </Form.Group>  

                    </Form>
                </Container> 

          {/* <UserForm  id={id}/> */}

        </Modal.Body>
      </Modal>
      </div>
    );
  }

} 

export default UserList
