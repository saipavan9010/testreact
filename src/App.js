import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './StudentList.jsx';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {Modal,Form,Container,Col,Row,Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import {AddData,deleteStudent,updateStudent,listStudent} from './actions/studentActions'

class App extends Component { 
  constructor(props)
  {
    super(props);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.editStudentSubmit = this.editStudentSubmit.bind(this);
    this.ApiUrl=process.env.REACT_APP_API_URL;    
    this.state = {
      lgShow:false,
      setLgShow:false,id: '',country_id: '',city_name:''
    };
  this.validator = new SimpleReactValidator();

  }
  componentWillMount(){

axios.get(this.ApiUrl+`/users/userslist`)
    .then(res => {
      this.props.listStudent(res.data.data.user);
     }).catch(function (error) {
      console.log(error);
   });

}

handleChange= (event) => {
  this.setState({[event.target.name]: event.target.value});
}

setLgShow=(bool)=>{
  
  this.setState({lgShow:bool})
}

  addNewStudent()
  {
  this.setState({lgShow:true});
    
// this.props.addStudent({id:Math.max(...this.props.studentList.map(function(o){return o.id})) + 1,name:'',grade:1,school:''});
  }

  deleteStudent(id)
  {
    let r = window.confirm("Do you want to delete this item");
    if( r === true)
    {
    this.props.deleteStudent(id);
   
  }
  }
  editStudentSubmit(id,name,grade,school)
  {
    console.log("2");

this.props.updateStudent({id:id,name:name,grade:grade,school:school});
  }

  handleSubmit= (event)=> {
    alert();
    event.preventDefault();

    if (this.validator.allValid()) {
       const headertoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGVlMDM0NGUyZjA3M2IwOGY1MmVlMSIsImlhdCI6MTU2OTQ2OTkyMiwiZXhwIjoxNTY5NTEzMTIyfQ.rntvggGCorEHdnke1kf8v3qIsJseNSDHBpekGEAVeQA"; 
       
       const url= this.state.id ? this.ApiUrl+`/user/city/update/${this.state.id}`:this.ApiUrl+`/user/city/create`;
       
       axios.post(url, this.state,{headers:{'Authorization': `Bearer ${headertoken}`}})
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
   }



  render() {
    return (
      <div className="container-fluid">
      <div className="row mt-3"><div className="col-lg-12">
      <div className="card">
  <div className="card-header">
    Student Registry
  </div>
  <div className="card-body">
  <table className="table table-hover">
          <thead className="thead-dark"><tr><th>Name</th><th>Grade</th><th>School</th><th>Edit/Save</th><th>Delete</th></tr></thead>
          <StudentList deleteStudent={this.deleteStudent} studentList={this.props.studentList} editStudentSubmit={this.editStudentSubmit}/>
        </table>
        <button className="btn btn-dark pull-left" onClick={this.addNewStudent}>Add New</button>
      </div></div></div></div>
      <Modal size="lg" show={this.state.lgShow} onHide={() => this.setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Country Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                    
                            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                              <Form.Label>Country</Form.Label>
                              <Form.Control as="select" name="country_id" value={this.state.country_id} onChange={this.handleChange}>
                                <option >--Please Select --</option>
                              </Form.Control>
                            </Form.Group>
                    
                    
                            <Form.Group as={Col} controlId="formGroupEmail">
                              <Form.Label >City Name</Form.Label>
                              <Form.Control  type="text" name="city_name" placeholder="Enter Country Name" value={this.state.city_name} onChange={this.handleChange}/>
                            </Form.Group>
                    
                    </Form.Row>
                   
                     <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Submit</Button>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    studentList : state
  }
}

const mapDispatchToProps = (dispatch) => {
 
  return bindActionCreators({
    AddData:AddData,
    deleteStudent:deleteStudent,
    updateStudent:updateStudent,
    listStudent:listStudent
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);