import React, { Component } from 'react'
import { Form, Container, Button, Modal, Spinner, Col, Row } from 'react-bootstrap'
import './MyAccount.css'
import swal from 'sweetalert';
import Authentication from '../../authentication/Authentication';
import MyAccountDataServer from './MyAccountDataServer';
export default class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: Authentication.loggedUserName(),
      email: Authentication.loggedUserId(),
      contact: Authentication.loggedUserContact(),
      location: Authentication.loggedUserLocation(),
      error: null,
      loading: false
    }
    this.updateUser = this.updateUser.bind(this);
    this.displayError = this.displayError.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);

  }

  updateUser(event) {
    event.preventDefault();

    if (this.state.name === '') {
      this.displayError('Name cannot be empty')
    } else if (this.state.email === '') {
      this.displayError('Email cannot be empty')
    } else if (this.state.contact === '') {
      this.displayError('Contact cannot be empty')
    } else if (this.state.location === '') {
      this.displayError('Location cannot be empty')
    } else if (this.state.contact.length != 10) {
      this.displayError('Invalid phone number')
    } else {
      this.setState({ loading: true })

      let formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('email', this.state.email);
      formData.append('contact', this.state.contact);
      formData.append('location', this.state.location);
      formData.append('role', 'seller');

      MyAccountDataServer.updateUser(formData)
        .then(response => {
          this.setState({ loading: false })
          swal({
            title: "Update Successful!",
            text: "Your profile updated successfully",
            icon: "success",
            button: "OK",
          }).then(result => {
            return this.props.history.push('./seller')
          })
        })
        .catch(error => {
          this.setState({ loading: false })
          swal({
            title: "Oops!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            button: "Ok",
          })
        })

    }
  }

  onCancel() {
    return this.props.history.push('./dashboard')
  }

  onDelete() {
    MyAccountDataServer.deleteUser(this.state.email)
      .then(response => {
        this.setState({ loading: false })
        swal({
          title: "Delete Successful!",
          text: "Your profile delete successfully",
          icon: "delete",
          button: "OK",
        }).then(result => {
          Authentication.logout()
          return this.props.history.push('/')
        })
      })
      .catch(error => {
        this.setState({ loading: false })
        swal({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          button: "Ok",
        })
      })
  }

  displayError(msg) {
    this.setState({
      error: msg
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: null

    }, () => console.log(this.state))
  };

  render() {
    return (
      <div>
        <div className="myaccount-title">
          MY ACCOUNT
        </div>

        <Container className="myaccount-container">
          <Form autoComplete="off" onSubmit={this.updateUser}>

            <Form.Group controlId="name" className="myaccount-form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="your name" className="myaccount-form-input" />
            </Form.Group>

            <Form.Group controlId="email" className="myaccount-form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChange} name="email" disabled value={this.state.email} type="email" placeholder="we will contact you via this email" className="myaccount-form-input" />
            </Form.Group>

            <Row classname="myaccount-form-row" >
              <Col>
                <Form.Group controlId="contact" className="myaccount-form-group">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="07XXXXXXXX" className="myaccount-form-input" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="location" className="myaccount-form-group">
                  <Form.Label>Location</Form.Label>
                  <Form.Control onChange={this.handleChange} name="location" value={this.state.location} type="text" as="select" className="myaccount-form-input" >
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
            <Button type="submit" variant="outline-success" className="myaccount-update-button">Update</Button>
            {this.state.error && <p className="myaccount-error">{this.state.error}</p>}

            <Button onClick={this.onCancel} variant="outline-secondary" className="myaccount-cancel-button">Cancel</Button>

            <Button onClick={this.onDelete} variant="outline-danger" className="myaccount-delete-button">Delete</Button>

          </Form>
        </Container>
      </div>
    )
  }
}
