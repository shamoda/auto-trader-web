import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Authentication from '../../../authentication/Authentication';
import InputField from '../../../asset/commons/InputField';
import TextArea from '../../../asset/commons/TextArea';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {
        seller: '',
        contact: '',
        email: '',
        location: '',
        price: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        date: '',
        img1: null,
        img2: null,
        img3: null,
      },

      loading: false,
    };

    // this.submitBtnClicked = this.submitBtnClicked.bind(this);
    // this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
  }

  render() {
    return (
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        {!Authentication.loggedAsAdmin() && !Authentication.loggedAsSeller() && (
          <div>
            <p>
              <h5 style={{ marginBottom: '40px' }}>
                Submit your feedback please...
              </h5>
              <InputField
                FormLabel="Your Name"
                name="seller"
                handleChange={this.handleChange}
                FormText="Please provide your full name"
                placeholder="Jagath Wikramasinghe..."
                type="text"
                trap={false}
              />
              <TextArea
                FormLabel="Description"
                name="description"
                handleChange={this.handleChange}
                FormText="type your feedback here..."
                type="text"
                placeholder="enter you feedback...."
                trap={false}
              />
            </p>

            <Card>
              <Container style={{ padding: '30px' }}>
                <Row>
                  <FontAwesomeIcon
                    style={{ marginRight: '10px' }}
                    icon={faUser}
                  />{' '}
                  <h6>Jagath Jyasuriya</h6>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  Wow, the service is amazing ,good luck! ,may every thing goes
                  well
                </Row>
              </Container>
            </Card>
            <Card>
              <Container style={{ padding: '30px' }}>
                <Row>
                  <FontAwesomeIcon
                    style={{ marginRight: '10px' }}
                    icon={faUser}
                  />{' '}
                  <h6>Jagath Jyasuriya</h6>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  Wow, the service is amazing ,good luck! ,may every thing goes
                  well
                </Row>
              </Container>
            </Card>
            <Card>
              <Container style={{ padding: '30px' }}>
                <Row>
                  <FontAwesomeIcon
                    style={{ marginRight: '10px' }}
                    icon={faUser}
                  />{' '}
                  <h6>Jagath Jyasuriya</h6>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  Wow, the service is amazing ,good luck! ,may every thing goes
                  well
                </Row>
              </Container>
            </Card>
            <Card>
              <Container style={{ padding: '30px' }}>
                <Row>
                  <FontAwesomeIcon
                    style={{ marginRight: '10px' }}
                    icon={faUser}
                  />{' '}
                  <h6>Jagath Jyasuriya</h6>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  Wow, the service is amazing ,good luck! ,may every thing goes
                  well
                </Row>
              </Container>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Feedback;
