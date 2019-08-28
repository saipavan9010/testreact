import React from "react";
import ReactDOM from "react-dom";
import Menu from '../layout/menu';
// import UserForm from './userform';
import axios from 'axios';
import {Modal,Form,Container,Col,Row,Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';


class CountryList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    countrylist:[],
    lgShow:false,
    setLgShow:false,id: '',country_code: '',country_name:''
  };
  this.ApiUrl=process.env.REACT_APP_API_URL;
  this.validator = new SimpleReactValidator();
}


componentWillMount(){ 
this.getData();
}  

getData(){
  const headertoken = localStorage.getItem("token");
  axios.get(this.ApiUrl+`/user/countrylist`,{headers:{'Authorization': `Bearer ${headertoken}`}})
    .then(res => {
     this.setState({userlist:res.data.data.user,show: true});
     }).catch(function (error) {
      console.log(error);
   });
}

countryEdit=(id)=>{
  const headertoken = localStorage.getItem("token");
  this.setState({lgShow:true,id:id});
  axios.get(this.ApiUrl+`/user/country/detail/${id}`,{headers:{'Authorization': `Bearer ${headertoken}`}})
  .then(res => {
      this.setState(res.data.data.user);
    }).catch(function (error) {
      console.log(error);
 });
}
setLgShow=(bool)=>{
  
  this.setState({lgShow:bool})
}

CountryTableData() {
  return this.state.countrylist.map((user, index) => {
     const { _id,country_code, country_name} = user //destructuring
     return (
        <tr key={index}>
           <td>{index+1}</td>
           <td>{country_code}</td>
           <td>{country_name}</td>
           <td><i className="fa fa-pencil-square-o"   aria-hidden="true" onClick={()=>this.countryEdit(_id)}>Edit</i></td>
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
        <h3>CountryList</h3>
        <Button type="button" onClick={()=>this.setLgShow(true)}><i className="fa fa-plus" ></i>Add</Button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Country Code</th>
                <th>Country Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {this.CountryTableData()}
            </tbody>
          </table>
        
        </div>
       
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
                    
                            <Form.Group as={Col}  controlId="formGroupEmail">
                            <Form.Label>Country Code</Form.Label>
                            <Form.Control type="text" name="country_code" placeholder="Enter Country Code" value={this.state.country_code} onChange={this.handleChange}/>
                            </Form.Group>
                    
                    
                            <Form.Group as={Col} controlId="formGroupEmail">
                            <Form.Label >Country Name</Form.Label>
                            <Form.Control  type="text" name="country_name" placeholder="Enter Country Name" value={this.state.country_name} onChange={this.handleChange}/>
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

export default CountryList
