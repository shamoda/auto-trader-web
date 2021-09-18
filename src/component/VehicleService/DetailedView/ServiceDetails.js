import React, { Component } from 'react';
import {
  Badge,
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';

import './DetailedView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Authentication from '../../../authentication/Authentication';
import Moment from 'react-moment';
import AddServiceDataService from '../ServiceRegistration/AddServiceDataService';
import ServiceDetailDataService from './ServiceDetailDataService';
import Feedback from '../ServiceFeedback/Feedback';

class ServiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {
        id: this.props.match.params.id,
        seller: '',
        contact: '',
        email: '',
        location: '',
        price: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        status: '',
        comment: '',
        date: '',
        img1: null,
        img2: null,
        img3: null,
      },

      loading: false,
    };

    this.submitBtnClicked = this.submitBtnClicked.bind(this);
    this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.getServiceById();
  }

  getServiceById() {
    const { service } = this.state;

    if (service.id != null) {
      AddServiceDataService.getServiceForId(service.id).then((res) => {
        console.log(res, 'res');
        service['title'] = res.data.title;
        service['subtitle'] = res.data.subTitle;
        service['seller'] = res.data.serviceProvider;
        service['contact'] = res.data.contact;
        service['date'] = res.data.currentTime;
        service['location'] = res.data.location;
        service['price'] = res.data.price;
        service['category'] = res.data.category;
        service['description'] = res.data.description;
        service['img1'] = res.data.image1;
        service['img2'] = res.data.imag2;
        service['img3'] = res.data.imag3;
        service['status'] = res.data.status;
        service['comment'] = res.data.comment;
        this.setState({
          service,
        });
      });
    }
  }

  submitBtnClicked() {
    const { service } = this.state;

    this.setState({ loading: true });
    let formData = new FormData();
    formData.append('status', service.status);
    formData.append('comment', service.comment);

    ServiceDetailDataService.reviewService(service.id, formData)
      .then((res) => {
        this.setState({ loading: false });
        return this.props.history.push('/admin');
      })
      .catch((err) => {
        this.setState({ loading: false });
        swal({
          title: 'Oops!!!',
          text: 'Something went wrong',
          icon: 'warning',
          button: 'Ok',
        });
        return;
      });
  }

  deleteBtnClicked() {
    const { service } = this.state;
    swal({
      title: 'You are about to delete,',
      text: service.title,
      icon: 'warning',
      buttons: true,
    }).then((result) => {
      if (result) {
        this.setState({ loading: true });
        ServiceDetailDataService.deleteService(service.id).then((res) => {
          this.setState({ loading: false });
          return this.props.history.push('/admin');
        });
      }
    });
  }

  formChange = (event) => {
    const { service } = this.state;
    service[event.target.name] = event.target.value;
    this.setState(
      {
        service,
      },
      () => console.log('form changed')
    );
  };

  render() {
    const {
      seller,
      contact,
      location,
      title,
      subtitle,
      price,
      date,
      description,
      status,
      comment,
      category,
      img1,
      img2,
      img3,
    } = this.state.service;

    let imgs = [];

    imgs.push(img1);
    if (img2 != null) {
      imgs.push(img2);
    }
    if (img3 != null) {
      imgs.push(img3);
    }

    return (
      <div>
        <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
          <Carousel
            style={{ textAlign: 'center' }}
            className={'img_overlay img-hover-zoom'}
            interval={10000}
            touch={true}
            slide={true}
            pause={false}
            indicators={true}
            controls={true}
            fade={false}
          >
            {imgs.map((img) => (
              <Carousel.Item>
                <Image
                  className="img"
                  src={
                    'https://auto-trader-service-test.s3.amazonaws.com/' + img
                  }
                  alt="First slide"
                  rounded
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div
            style={{
              marginLeft: '100px',
              marginRight: '100px',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            <h1>{title}</h1>
            <h3>Rs. {subtitle}</h3>
            <h3>Rs. {price}</h3>
            <p>
              Posted Date : <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <p style={{ marginBottom: '0px' }}>
              <b>Category : </b> {category}
            </p>
            <p>
              <b>Additional Information:</b>
              <br />
              {description}
            </p>
            <p>
              <b>Contact information:</b>
            </p>
            <p style={{ marginBottom: '0px' }}>
              <b>Name:</b> {seller}
            </p>
            <p style={{ marginBottom: '0px' }}>
              <b>Contact:</b> {contact}
            </p>
            <p>
              <b>Location:</b> {location}
            </p>
            <hr />
            <Feedback />
          </div>

          {Authentication.loggedAsAdmin() && (
            <div style={{ marginLeft: '100px', marginTop: '40px' }}>
              <p>
                <b>Submit Your Review</b>
              </p>
              <Form autoComplete="off">
                <Row>
                  <Col>
                    <Form.Control
                      as="select"
                      className="my-1 mr-sm-2"
                      custom
                      onChange={this.formChange}
                      name="status"
                      value={this.state.status}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </Form.Control>
                    <p style={{ margin: '5px 0px' }}>
                      {status === 'pending' && (
                        <Badge variant="warning">{status}</Badge>
                      )}
                      {status === 'approved' && (
                        <Badge variant="success">{status}</Badge>
                      )}
                      {status === 'rejected' && (
                        <Badge variant="danger">{status}</Badge>
                      )}
                    </p>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        className="my-1 mr-sm-2"
                        onChange={this.formChange}
                        name="comment"
                        value={comment}
                        type="text"
                        placeholder="your comment"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button
                      className="my-1 mr-sm-2"
                      onClick={this.submitBtnClicked}
                      variant="outline-dark"
                    >
                      <FontAwesomeIcon size="sm" icon={faEdit} />
                      &nbsp; Submit
                    </Button>
                    <Button
                      className="my-1 mr-sm-2"
                      onClick={this.deleteBtnClicked}
                      variant="outline-danger"
                    >
                      <FontAwesomeIcon size="sm" icon={faTrash} />
                      &nbsp; Delete
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
        </Container>

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

export default ServiceDetail;
