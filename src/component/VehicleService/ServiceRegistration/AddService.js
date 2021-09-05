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

import Authentication from '../../../authentication/Authentication';

import '../Services.css';
class AddService extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      service: {
        id: this.props.match.params.id,
        seller: Authentication.loggedUserName(),
        contact: Authentication.loggedUserContact(),
        email: Authentication.loggedUserId(),
        location: Authentication.loggedUserLocation(),
        price: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',

        img1: null,
        img1Url: '',
        img1Name: null,
        img1Selected: false,

        img2: null,
        img2Url: null,
        img2Name: null,
        img2Selected: false,

        img3: null,
        img3Url: null,
        img3Name: null,
        img3Selected: false,
      },

      loading: false,
      buttonError: '',
      errors: {},
    };
    this.registerService = this.registerService.bind(this);
    this.getServiceById = this.getServiceById.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.updateService = this.updateService.bind(this);
    this.validate = this.validate.bind(this);
    this.img1Change = this.img1Change.bind(this);
    this.img2Change = this.img2Change.bind(this);
    this.img3Change = this.img3Change.bind(this);
  }

  componentDidMount() {
    this.getServiceById();
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
    id: Joi,
    seller: Joi,
    contact: Joi.string().required().label('Contact No').max(10),
    email: Joi,
    title: Joi.string().required().label('Service Title').max(40),
    subtitle: Joi.string().required().label('Service Subtitle').max(40),
    location: Joi,
    price: Joi.string().required().label('Price is required').max(10),
    category: Joi.string().required().label('Category is required'),
    description: Joi.string().required().label('Description').max(300),
    img1: Joi,
    img1Url: Joi,
    img1Name: Joi,
    img1Selected: Joi,

    img2: Joi,
    img2Url: Joi,
    img2Name: Joi,
    img2Selected: Joi,

    img3: Joi,
    img3Url: Joi,
    img3Name: Joi,
    img3Selected: Joi,
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
      formData.append('price', service.price);
      formData.append('description', service.description);
      formData.append('category', service.category);
      formData.append('location', service.location);
      formData.append('contactNo', service.contact);
      formData.append('provider', service.seller);
      formData.append('image1', service.img1);
      if (service.img2 != null) {
        formData.append('image2', service.img2);
      }
      if (service.img3 != null) {
        formData.append('image3', service.img3);
      }
      AddServiceDataService.registerService(formData)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false });
            swal({
              title: 'Service Detials submitted successfully !!!',
              text: 'Await an notification from the administration',
              icon: 'success',
              button: 'Ok',
            }).then((result) => {
              return this.props.history.push(`/seller`);
            });
          }, 1000);
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

  getServiceById() {
    const { service } = this.state;

    if (service.id != null) {
      AddServiceDataService.getServiceForId(service.id).then((res) => {
        console.log(res, 'res');
        service['title'] = res.data.title;
        service['subtitle'] = res.data.subTitle;
        // service['serviceProvider'] = res.data.serviceProvider;
        service['contact'] = res.data.contact;
        service['location'] = res.data.location;
        service['price'] = res.data.price;
        service['category'] = res.data.category;
        service['description'] = res.data.description;
        service['img1Url'] =
          'https://auto-trader-service-test.s3.amazonaws.com/' +
          res.data.image1;
        service['img2Url'] =
          'https://auto-trader-service-test.s3.amazonaws.com/' +
          res.data.image2;
        service['img3Url'] =
          'https://auto-trader-service-test.s3.amazonaws.com/' +
          res.data.image3;

        this.setState(
          {
            service,
          },
          () => {
            if (res.data.image1 != null) {
              service['img1Selected'] = true;
              this.setState({
                service,
              });
            }
            if (res.data.image2 != null) {
              service['img2Selected'] = true;
              this.setState({
                img2Selected: true,
              });
            }
            if (res.data.image3 != null) {
              service['img3Selected'] = true;
              this.setState({
                img3Selected: true,
              });
            }
          }
        );
      });
    }
  }

  img1Change(event) {
    if (event.target.files.length) {
      const { service } = this.state;
      service['img1'] = event.target.files[0];
      console.log(service['img1'], 'red');
      service['img1Url'] = URL.createObjectURL(event.target.files[0]);
      service['img1Name'] = event.target.files[0].name;
      service['img1Selected'] = true;

      this.setState(
        {
          service,
        },
        () => console.log('Main selected')
      );
    }
  }

  img2Change(event) {
    if (event.target.files.length) {
      let service = { ...this.state.service };
      service['img2'] = event.target.files[0];
      service['img2Url'] = URL.createObjectURL(event.target.files[0]);
      service['img2Name'] = event.target.files[0].name;
      service['img2Selected'] = true;

      this.setState(
        {
          service,
        },
        () => console.log('Main selected')
      );
    }
  }
  img3Change(event) {
    if (event.target.files.length) {
      let service = { ...this.state.service };
      service['img3'] = event.target.files[0];
      service['img3Url'] = URL.createObjectURL(event.target.files[0]);
      service['img3Name'] = event.target.files[0].name;
      service['img3Selected'] = true;

      this.setState(
        {
          service,
        },
        () => console.log('Main selected')
      );
    }
  }

  updateService(event) {
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
      formData.append('price', service.price);
      formData.append('description', service.description);
      formData.append('category', service.category);
      formData.append('location', service.location);
      formData.append('contactNo', service.contact);
      formData.append('provider', service.seller);
      formData.append('image1', service.img1);
      console.log('dd', service.img1);
      if (service.img2 != null) {
        formData.append('image2', service.img2);
      }
      if (service.img3 != null) {
        formData.append('image3', service.img3);
      }
      AddServiceDataService.updateService(service.id, formData)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false });
            swal({
              title: 'Service Detials updated successfully !!!',
              text: 'Await an notification from the administration',
              icon: 'success',
              button: 'Ok',
            }).then((result) => {
              return this.props.history.push(`/seller`);
            });
          }, 1000);
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

  deleteService() {
    const { service } = this.state;
    swal({
      title: 'You are about to delete,',
      text: service.title,
      icon: 'warning',
      buttons: true,
    }).then((result) => {
      if (result) {
        this.setState({ loading: true });
        AddServiceDataService.deleteService(service.id).then((res) => {
          this.setState({ loading: false });
          return this.props.history.push('/seller');
        });
      }
    });
  }

  render() {
    const { errors, service, buttonError } = this.state; //properties
    const {
      seller,
      contact,
      location,
      title,
      subtitle,
      price,
      id,
      category,
      description,
    } = service;

    const { registerService } = this; //methods
    return (
      <div>
        <Container className="workshopregistration-container">
          <Form autoComplete="off" onSubmit={registerService}>
            <div className="workshopregistration-head"></div>
            {/* 1st Row starts */}
            <div
              style={{
                fontWeight: 600,
                fontSize: '25px',
                marginBottom: '20px',
              }}
            >
              Verify Contact Details
            </div>
            <Row>
              <Col>
                <InputField
                  FormLabel="Your Name"
                  name="seller"
                  value={seller}
                  handleChange={this.handleChange}
                  FormText="Please provide your full name"
                  placeholder="Jagath Wikramasinghe..."
                  type="text"
                  trap={false}
                />
              </Col>
              <Col>
                {service.id ? (
                  <InputField
                    FormLabel="Service ID"
                    name="id"
                    value={id}
                    handleChange={this.handleChange}
                    FormText="Service provider's id is provided by a Auto-Trader Platform"
                    type="text"
                    trap={true}
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  controlId="contact"
                  className="attendeeregistration-form-group"
                >
                  <InputField
                    FormLabel="Your Contact Number"
                    name="contact"
                    value={contact}
                    handleChange={this.handleChange}
                    FormText="Enter a service title"
                    type="number"
                    placeholder="contact number"
                    error={errors.contact}
                    trap={false}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="location"
                  className="attendeeregistration-form-group"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    name="location"
                    value={location}
                    type="text"
                    as="select"
                    className="paperregistration-form-input"
                  >
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
                  <Form.Text className="text-muted"> Item location </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div
              style={{
                fontWeight: 600,
                fontSize: '25px',
                marginBottom: '20px',
              }}
            >
              Service Details
            </div>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <InputField
                  FormLabel="Service Title"
                  name="title"
                  value={title}
                  handleChange={this.handleChange}
                  FormText="Enter a service title"
                  type="text"
                  placeholder="Tyre Service"
                  error={errors.title}
                  trap={false}
                />
              </Col>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="category"
                  value={category}
                  type="text"
                  as="select"
                  className="paperregistration-form-input"
                >
                  <option value="">- select -</option>
                  <option>Antifreeze addition</option>
                  <option>Battery Replacement</option>
                  <option>Brake Work</option>
                  <option>Battery Services</option>
                  <option>Car Wash & Services</option>
                  <option>Engine Tune Up</option>
                  <option>Oil/oil filter changed</option>
                  <option>Hybrid Services</option>
                  <option>Replace Air Filters</option>
                  <option>Scheduled Maintenance</option>
                  <option>Tyres $ Tubes Services</option>
                  <option>Wheel Balancing & Alignment</option>
                  <option>Wiper blade Replacement</option>
                  <option>Other Specilaized Services</option>
                </Form.Control>
                <Form.Text className="text-muted"> Service Category </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  FormLabel="Service Subtitle"
                  name="subtitle"
                  value={subtitle}
                  handleChange={this.handleChange}
                  FormText="Enter a service subtitle"
                  type="text"
                  placeholder="Repair Tyres"
                  trap={false}
                  error={errors.subtitle}
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Average Price (Rs)"
                  name="price"
                  value={price}
                  handleChange={this.handleChange}
                  FormText="Price should be in Rs. "
                  type="number"
                  placeholder="7500"
                  error={errors.price}
                  trap={false}
                />
              </Col>
            </Row>
            <TextArea
              FormLabel="Description"
              name="description"
              value={description}
              handleChange={this.handleChange}
              FormText="Enter a brief description"
              type="text"
              placeholder="Price is negotibale...."
              error={errors.description}
              trap={false}
            />
            <Form.Label
              className="attendeeregistration-form-group"
              style={{
                marginTop: '20px',
                marginBottom: '10px',
                fontSize: '18px',
              }}
            >
              Attach Images
            </Form.Label>

            <Row>
              <Col>
                <Form.Group className="attendeeregistration-form-group">
                  <Form.File
                    name="img1"
                    label="Main Image"
                    onChange={this.img1Change}
                    style={{ borderWidth: '1px', borderColor: 'red' }}
                  />
                </Form.Group>
                {this.state.service.img1Selected ? (
                  <img
                    style={{
                      width: '250px',
                      height: '168px',
                      borderRadius: '10px',
                      padding: '0px',
                      margin: '10px',
                      textAlign: 'center',
                    }}
                    alt="card"
                    src={this.state.service.img1Url}
                  />
                ) : (
                  ''
                )}
              </Col>
              <Col>
                <Form.Group className="attendeeregistration-form-group">
                  <Form.File
                    name="img2"
                    label="Second Image"
                    onChange={this.img2Change}
                    style={{ borderWidth: '1px', borderColor: 'red' }}
                  />
                </Form.Group>
                {this.state.service.img2Selected ? (
                  <img
                    style={{
                      width: '250px',
                      height: '168px',
                      borderRadius: '10px',
                      padding: '0px',
                      margin: '10px',
                      textAlign: 'center',
                    }}
                    alt="card"
                    src={this.state.service.img2Url}
                  />
                ) : (
                  ''
                )}
              </Col>
              <Col>
                <Form.Group className="attendeeregistration-form-group">
                  <Form.File
                    name="img3"
                    label="Third Image"
                    onChange={this.img3Change}
                    style={{ borderWidth: '1px', borderColor: 'red' }}
                  />
                </Form.Group>
                {this.state.service.img3Selected ? (
                  <img
                    style={{
                      width: '250px',
                      height: '168px',
                      borderRadius: '10px',
                      padding: '0px',
                      margin: '10px',
                      textAlign: 'center',
                    }}
                    alt="card"
                    src={this.state.service.img3Url}
                  />
                ) : (
                  ''
                )}
              </Col>
            </Row>

            {!service.id && (
              <Button
                variant="dark"
                onClick={registerService}
                className="attendeeregistration-button"
              >
                Submit
              </Button>
            )}
            {service.id && (
              <Button
                disabled={this.validate()}
                onClick={this.updateService}
                variant="dark"
                className="attendeeregistration-button"
              >
                Update
              </Button>
            )}
            {service.id && (
              <Button
                onClick={this.deleteService}
                variant="danger"
                className="delete-button"
              >
                Delete
              </Button>
            )}

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
