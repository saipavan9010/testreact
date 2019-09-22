import React from "react";
import ReactDOM from "react-dom";
import Menu from '../layout/menu';
// import UserForm from './userform';
import axios from 'axios';
import {Modal,Form,Container,Col,Row,Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';


class CityList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    citylist:[],
    countrylist:[],
    lgShow:false,
    setLgShow:false,id: '',country_id: '',city_name:''
  };
  this.ApiUrl=process.env.REACT_APP_API_URL;
  this.validator = new SimpleReactValidator();
}


componentWillMount(){ 
this.getData();
this.Countrylist();
}  

getData(){
  const headertoken = localStorage.getItem("token");
  axios.get(this.ApiUrl+`/user/citylist`,{headers:{'Authorization': `Bearer ${headertoken}`}})
    .then(res => {
     this.setState({citylist:res.data.city_data,show: true});
     }).catch(function (error) {
      console.log(error);
   });
}

Countrylist(){
  const headertoken = localStorage.getItem("token");
  return axios.get(this.ApiUrl+`/user/countrylist`,{headers:{'Authorization': `Bearer ${headertoken}`}})
    .then(res => {
     this.setState({countrylist:res.data.country_data,show: true});
     }).catch(function (error) {
      console.log(error);
   });
}

cityEdit=(id)=>{
  const headertoken = localStorage.getItem("token");
  this.setState({lgShow:true,id:id});
  axios.get(this.ApiUrl+`/user/city/detail/${id}`,{headers:{'Authorization': `Bearer ${headertoken}`}})
  .then(res => {
      this.setState(res.data.city);
    }).catch(function (error) {
      console.log(error);
 });
}
setLgShow=(bool)=>{
  
  this.setState({lgShow:bool})
}

CityTableData() {
  return this.state.citylist.map((user, index) => {
     const { _id,country_id, city_name} = user //destructuring
     return (
        <tr key={index}>
           <td>{index+1}</td>
           <td>{country_id? country_id.country_name:""}</td>
           <td>{city_name}</td>
           <td><i className="fa fa-pencil-square-o"   aria-hidden="true" onClick={()=>this.cityEdit(_id)}>Edit</i></td>
        </tr>
     )
  });
}

countryload=(id)=>{
  return this.state.countrylist.map((country, index) => {
    const { _id,country_name} = country //destructuring
   
    return (
       <option value={_id} >{country_name}</option>
    )
 });
}






handleChange= (event) => {
  this.setState({[event.target.name]: event.target.value});
}

handleSubmit= (event)=> {
  if (this.validator.allValid()) {
     const headertoken = localStorage.getItem("token"); 
     
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
  event.preventDefault();
 }






render() {
  const {id}=this.state;
  return (
     
    <div>
      <Menu/>
        <div className="container">
        <h3>CityList</h3>
        <Button type="button" onClick={()=>this.setLgShow(true)}><i className="fa fa-plus" ></i>Add</Button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Country ID</th>
                <th>Country Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {this.CityTableData()}
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
                    
                            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                              <Form.Label>Country</Form.Label>
                              <Form.Control as="select" name="country_id" value={this.state.country_id} onChange={this.handleChange}>
                                <option >--Please Select --</option>
                                {this.countryload()}
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

export default CityList
