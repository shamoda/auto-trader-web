import React, { Component } from 'react';
import {
  Form,
  Container,
  Button,
  Modal,
  Spinner,
  Col,
  Row,
} from 'react-bootstrap';
import swal from 'sweetalert';
import Joi from 'joi-browser';

import InputField from '../../../asset/commons/InputField';
import TextArea from '../../../asset/commons/TextArea';
import AddServiceDataService from './AddServiceDataService';

import '../Services.css';
class AddService extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      service: {
        title: '',
        subtitle: '',
        location: '',
        contactNo: '',
        description: '',
        image1: null,
        image2: null,
        image3: null,
      },
      loading: false,
      buttonError: '',
      errors: {},
    };
    this.registerService = this.registerService.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange = ({ target: input }) => {
    let service = { ...this.state.service };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    service[input.name] = input.value;
    this.setState(
      {
        service,
        errors,
      },
      () => console.log(this.state)
    );
  };

  // Joi.ref('password')
  //Joi@13.4 Schema [Validation Library]
  Schema = {
    title: Joi.string().required().label('Service Title').max(40),
    subtitle: Joi.string().required().label('Service Subtitle').max(40),
    location: Joi.string().required().label('Location').max(20),
    contactNo: Joi.string().required().label('Contact No').length(10),
    category: Joi.string().required().label('Category').max(10),
    description: Joi.string().required().label('Description').max(300),
    image1: Joi.required().disallow(null),
    image2: Joi.required(),
    image3: Joi.required(),
  };

  validate() {
    const abortEarly = { abortEarly: false }; //1st Error priority disabled
    const { error } = Joi.validate(this.state.service, this.Schema, abortEarly);
    if (!error) return null; //if no result error return null
    const errors = {};
    for (let item of error.details) {
      //traversing in Joi error
      errors[item.path[0]] = item.message; //target input is given priority or first object [0]
    }
    return errors;
  }

  validateField({ name, value }) {
    const miniService = { [name]: value }; //Computed operators used [ES6]
    const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
    const { error } = Joi.validate(miniService, miniSchema);
    return error ? error.details[0].message : null;
  }

  onFileChange(event) {
    const { service } = { ...this.state };
    if (event.target.files.length) {
      service[event.target.name] = event.target.files[0];
      this.setState(
        {
          service,
        },
        () => console.log('File selected')
      );
    } else {
      delete service[event.target.name];
    }
  }
  //registers a service
  registerService(event) {
    event.preventDefault();
    const { service } = this.state;
    if (service.image1 === null) {
      this.displayError('You must upload your service image 1');
    } else {
      this.setState({ loading: true });
      //Object was used, Code 400 err, [ERR-LOG-02]
      // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
      let formData = new FormData();
      formData.append('title', service.title);
      formData.append('subtitle', service.subtitle);
      formData.append('description', service.location);
      formData.append('conductor', service.contactNo);
      formData.append('category', service.category);
      formData.append('location', service.location);
      formData.append('contactNo', service.contactNo);
      formData.append('provider', 'jaga');
      formData.append('description', service.description);
      formData.append('image1', service.image1);
      formData.append('image2', service.image2);
      formData.append('image3', service.image3);
      AddServiceDataService.registerService(formData)
        .then((res) => {
          this.setState({ loading: false });
          swal({
            title: 'Service Detials submitted successfully !!!',
            text: 'Await an notification from the administration',
            icon: 'success',
            button: 'Ok',
          }).then((result) => {
            // return this.props.history.push(`/login`);
          });
        })
        .catch((err) => {
          this.setState({ loading: false });
          swal({
            title: 'Oops!!',
            text: 'Something went wrong,please try again later.',
            error: 'error',
            button: 'ok',
            icon: 'error',
          });
        });
    }
  }

  displayError = (msg) => {
    this.setState({
      buttonError: msg,
    });
  };

  render() {
    const { errors, service, buttonError } = this.state; //properties
    const { registerService } = this; //methods
    return (
      <div>
        <Container className="workshopregistration-container">
          <Form autoComplete="off" onSubmit={registerService}>
            <div className="workshopregistration-head"></div>
            {/* 1st Row starts */}

            <Row>
              <Col>
                <InputField
                  FormLabel="Service Title"
                  name="title"
                  value={service.title}
                  handleChange={this.handleChange}
                  FormText="Enter a service title"
                  type="text"
                  placeholder="Tyre Service"
                  error={errors.title}
                  trap={false}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Service Subtitle"
                  name="subtitle"
                  value={service.subtitle}
                  handleChange={this.handleChange}
                  FormText="Enter a service subtitle"
                  type="text"
                  placeholder="Repair Tyres"
                  trap={false}
                  error={errors.subtitle}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  FormLabel="Location"
                  name="location"
                  value={service.location}
                  handleChange={this.handleChange}
                  FormText="Enter the location"
                  type="text"
                  placeholder="Colombo"
                  error={errors.location}
                  trap={false}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Contact No"
                  name="contactNo"
                  value={service.contactNo}
                  handleChange={this.handleChange}
                  FormText="Enter the contact No"
                  type="Number"
                  placeholder="07735518676"
                  error={errors.contactNo}
                  trap={false}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Category"
                  name="category"
                  value={service.category}
                  handleChange={this.handleChange}
                  FormText="Enter the category"
                  type="text"
                  placeholder="Wheel Alignment"
                  error={errors.category}
                  trap={false}
                />
              </Col>
            </Row>
            <TextArea
              FormLabel="Description"
              name="description"
              value={service.description}
              handleChange={this.handleChange}
              FormText="Enter a brief description"
              type="text"
              placeholder="Price is negotibale...."
              error={errors.description}
              trap={false}
            />
            <Row>
              <Col>
                <Form.Group className="paperregistration-form-group">
                  <Form.File
                    name="image1"
                    label="Attach Image-1 here"
                    onChange={this.onFileChange}
                    accept=".jpg"
                  />
                  <Form.Text className="text-muted">File format: Jpg</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="paperregistration-form-group">
                  <Form.File
                    name="image2"
                    label="Attach Image-2 here"
                    onChange={this.onFileChange}
                    accept=".jpg"
                  />
                  <Form.Text className="text-muted">File format: Jpg</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="paperregistration-form-group">
                  <Form.File
                    name="image3"
                    label="Attach Image-3 here"
                    onChange={this.onFileChange}
                    accept=".jpg"
                  />
                  <Form.Text className="text-muted">File format: Jpg</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              variant="dark"
              disabled={this.validate()}
              className="workshop1-button"
            >
              Submit
            </Button>
            {buttonError && (
              <p className="paperregistration-error">{buttonError}</p>
            )}
          </Form>
        </Container>
        {/* Modal or Loading */}
        <Modal
          centered
          size="sm"
          show={this.state.loading}
          onHide={() => console.log('please wait...')}
        >
          <Modal.Header>
            <Modal.Title>
              <Spinner animation="border" /> Please wait...
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}
export default AddService;
