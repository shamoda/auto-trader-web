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
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
// import './WorkshopRegistration.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import WorkshopRegistrationDataService from './WorkshopRegistrationDataservice';

import InputField from '../../../asset/commons/InputField';
import TextArea from '../../../asset/commons/TextArea';

class AddService extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      workshop: {
        title: '',
        subject: '',
        description: '',
        conductor: this.props.match.params.id,
        proposal: null,
      },
      loading: false,
      buttonError: '',
      errors: {},
    };
    this.registerWorkshop = this.registerWorkshop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange = ({ target: input }) => {
    let workshop = { ...this.state.workshop };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
  };

  // Joi.ref('password')
  //Joi@13.4 Schema [Validation Library]
  Schema = {
    title: Joi.string().required().label('Workshop Title').max(40),
    subject: Joi.string().required().label('Subject').min(1).max(40),
    description: Joi.string().required().label('Description').min(10).max(200),
    conductor: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .label('Email'),
    proposal: Joi.required().disallow(null),
  };

  validate() {
    const abortEarly = { abortEarly: false }; //1st Error priority disabled
    const { error } = Joi.validate(
      this.state.workshop,
      this.Schema,
      abortEarly
    );
    if (!error) return null; //if no result error return null
    const errors = {};
    for (let item of error.details) {
      //traversing in Joi error
      errors[item.path[0]] = item.message; //target input is given priority or first object [0]
    }
    return errors;
  }

  validateField({ name, value }) {
    const miniWorkshop = { [name]: value }; //Computed operators used [ES6]
    const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
    const { error } = Joi.validate(miniWorkshop, miniSchema);
    return error ? error.details[0].message : null;
  }

  onFileChange(event) {
    if (event.target.files.length) {
      const { workshop } = { ...this.state };
      workshop.proposal = event.target.files[0];
      this.setState(
        {
          workshop,
        },
        () => console.log('File selected')
      );
    }
  }
  //registers a workshop
  registerWorkshop(event) {
    event.preventDefault();
    const { workshop } = this.state;
    if (workshop.proposal === null) {
      this.displayError('You must upload your workshop proposal');
    } else {
      this.setState({ loading: true });
      //Object was used, Code 400 err, [ERR-LOG-02]
      // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
      let formData = new FormData();
      formData.append('title', workshop.title);
      formData.append('subject', workshop.subject);
      formData.append('description', workshop.description);
      formData.append('conductor', workshop.conductor);
      formData.append('file', workshop.proposal);
      // WorkshopRegistrationDataService.registerWorkshop(formData)
      //   .then((res) => {
      //     this.setState({ loading: false });
      //     swal({
      //       title: 'Proposal submitted successfully !!!',
      //       text: 'Log in to your profile to stay updated',
      //       icon: 'success',
      //       button: 'Login',
      //     }).then((result) => {
      //       return this.props.history.push(`/login`);
      //     });
      //   })
      //   .catch((err) => {
      //     this.setState({ loading: false });
      //     swal({
      //       title: 'Oops!!',
      //       text: 'Something went wrong,please try again later.',
      //       error: 'error',
      //       button: 'ok',
      //     });
      //   });
    }
  }

  displayError = (msg) => {
    this.setState({
      buttonError: msg,
    });
  };

  render() {
    const { errors, workshop, buttonError } = this.state; //properties
    const { registerWorkshop } = this; //methods
    return (
      <div>
        <Container className="workshopregistration-container">
          <Form autoComplete="off" onSubmit={registerWorkshop}>
            <div className="workshopregistration-head">
              <h4 className="workshopregistration-head-font">
                <FontAwesomeIcon icon={faChalkboardTeacher} /> Workshop Details
              </h4>
            </div>
            {/* 1st Row starts */}
            <Row>
              <Col>
                <InputField
                  FormLabel="Workshop Title"
                  name="title"
                  value={workshop.title}
                  handleChange={this.handleChange}
                  FormText="Enter your first name here"
                  type="text"
                  placeholder="Reactjs"
                  error={errors.title}
                  trap={false}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Workshop Conductor"
                  name="conductor"
                  value={workshop.conductor}
                  handleChange={this.handleChange}
                  FormText="Email would be your username"
                  type="text"
                  placeholder="example@gmail.com"
                  trap={true}
                />
              </Col>
            </Row>
            {/* 1st Row Ends */}
            <InputField
              FormLabel="Workshop Subject"
              name="subject"
              value={workshop.subject}
              handleChange={this.handleChange}
              FormText="Enter your last name here"
              type="text"
              placeholder="Redux"
              error={errors.subject}
              trap={false}
            />
            <TextArea
              FormLabel="Description"
              name="description"
              value={workshop.description}
              handleChange={this.handleChange}
              FormText="Enter a brief description"
              type="text"
              placeholder="React is a frontend fraamework...."
              error={errors.description}
              trap={false}
            />
            <Form.Group className="paperregistration-form-group">
              <Form.File
                name="proposal"
                label="Attach Proposal here"
                onChange={this.onFileChange}
                accept=".pdf"
              />
              <Form.Text className="text-muted">File format: PDF</Form.Text>
            </Form.Group>
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
