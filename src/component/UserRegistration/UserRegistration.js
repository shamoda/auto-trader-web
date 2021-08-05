import React, { Component } from 'react'
import { Form, Container, Button, Modal, Spinner, Col, Row } from 'react-bootstrap'
import swal from 'sweetalert';
import './UserRegistration.css'
import UserRegistrationDataService from './UserRegistrationDataService';

export default class UserRegistration extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      contact: '',
      location: '',
      password: '',
      temppassword: '',
      error: null,
      loading: false
    }

    this.registerUser = this.registerUser.bind(this);
    this.displayError = this.displayError.bind(this);

  }

  registerUser(event) {
    event.preventDefault();

    if (this.state.name === '') {
      this.displayError('Name cannot be empty')
    }else if (this.state.email === '') {
      this.displayError('Email cannot be empty')
    }else if (this.state.contact === '') {
      this.displayError('Contact cannot be empty')
    }else if (this.state.location === '') {
      this.displayError('Location cannot be empty')
    }else if (this.state.password === '') {
      this.displayError('Password cannot be empty')
    }else if (this.state.temppassword === '') {
      this.displayError('Please re-enter password')
    }else if (this.state.password != this.state.temppassword){
      this.displayError('The password you entered do not match. Please re-enter password')
    }else if (this.state.contact.length != 10) {
      this.displayError('Invalid phone number')
    }else {
      this.setState({loading: true})

      let formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('email', this.state.email);
      formData.append('contact', this.state.contact);
      formData.append('location', this.state.location);
      formData.append('password', this.state.password);
      formData.append('role', 'seller');

      UserRegistrationDataService.registerUser(formData)
      .then( response => {
        this.setState({loading: false})
        swal({
          title: "Registration Successful!",
          text: "Log in to your profile to stay up to date",
          icon: "success",
          button: "Login",
        }).then(result => {
          return this.props.history.push('./login')
        })
      })
      .catch( error => {
        this.setState({loading: false})
        swal({
          title: "Oops!",
          text: "Seems your email address is already exists. Please try again.",
          icon: "error",
          button: "Ok",
        })
      })

    }
  }

  displayError(msg) {
    this.setState({
      error: msg
    })
  }

  handleChange = event =>{
    this.setState({
      [event.target.name] : event.target.value,
      error: null
      
    }, () => console.log(this.state))
  };


  render() {
    return (
      <div>
        <div className="userregistration-title">
            REGISTRATION
        </div>

        <Container className="userregistration-container">
          <Form autoComplete="off" onSubmit={this.registerUser}>
            
            <Form.Group controlId="name" className="userregistration-form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="your name" className="userregistration-form-input" />
            </Form.Group>
            
            <Form.Group controlId="email" className="userregistration-form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChange} name="email" value={this.state.email} type="email" placeholder="we will contact you via this email" className="userregistration-form-input" />
            </Form.Group>

            <Row classname="userregistration-form-row" >
              <Col>
                <Form.Group controlId="contact" className="userregistration-form-input">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="07XXXXXXXX" className="userregistration-form-input"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="location" className="attendeeregistration-form-group">
                  <Form.Label>Location</Form.Label>
                    <Form.Control onChange={this.handleChange} name="location" value={this.state.location} type="text" as="select" className="userregistration-form-input" >
                      <option value="">- select -</option>
                      <option>Anuradapura</option>
                      <option>Bandaragama</option>
                      <option>Colombo</option>
                      <option>Dehiwala</option>
                      <option>Gampaha</option>
                      <option>Hambanthota</option>
                      <option>Jaffna</option>
                      <option>Kandy</option>
                      <option>Maharagama</option>
                      <option>Panadura</option>
                    </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="password" className="userregistration-form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="password" className = "userregistration-form-input" />
            </Form.Group>
                        
            <Form.Group controlId="temppassword" className="userregistration-form-group">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control onChange={this.handleChange} name="temppassword" value={this.state.temppassword} type="password" placeholder="re-enter password" className = "userregistration-form-input" />
            </Form.Group>


            <Button type="submit" className="userregistration-button">Register</Button>
                            {this.state.error && <p className="userregistration-error">{this.state.error}</p>}
          </Form>
        </Container>
{/* 
        <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                    <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal> */}
      </div>
    )
  }
}

