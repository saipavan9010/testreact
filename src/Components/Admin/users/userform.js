import React from "react";
import ReactDOM from "react-dom";
import {Form,Container} from 'react-bootstrap';

class UserForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userlist:[],
        };
        this.ApiUrl=process.env.REACT_APP_API_URL;
        
        }
    render() {
        return (
            <Container>
                <Form>
                    <Form.Row>
                        <Form.Group md="4" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group md="4" controlId="formGroupEmail">
                        <Form.Label md="4">Email address</Form.Label>
                        <Form.Control  type="email" placeholder="Enter email" />
                        </Form.Group> 
                   </Form.Row>
                   <Form.Row>
                        <Form.Group md="4" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group> 
                    </Form.Row>  

                </Form>
            </Container>      
        )   
    }    


}

export default UserForm