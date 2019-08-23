import React from "react";
import ReactDOM from "react-dom";
import {Form,Container,Col,Row,Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';


class UserForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {first_name: '',last_name:'',mobile_no:'',email:'',user_name:'',password:''};
        this.ApiUrl=process.env.REACT_APP_API_URL;
        this.validator = new SimpleReactValidator();
        
        }
        componentDidMount(){
           this.setData()
        }  
        handleChange= (event) => {
            this.setState({[event.target.name]: event.target.value});
        }
        setData(){
            const headertoken = localStorage.getItem("token");
            const id=this.props.id;
            
            axios.get(this.ApiUrl+`/user/detail/${id}`,{headers:{'Authorization': `Bearer ${headertoken}`}})
            .then(res => {
                this.setState(res.data.data.user);
             }).catch(function (error) {
                console.log(error);
           });
          }

          handleSubmit= (event)=> {
           if (this.validator.allValid()) {
              const id=this.props.id;
              const headertoken = localStorage.getItem("token"); 
              axios.post(this.ApiUrl+`/user/update/${id}`, this.state,{headers:{'Authorization': `Bearer ${headertoken}`}})
                .then(res => {
                  alert(res.data.message);
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
            )   
        }    


}

export default UserForm