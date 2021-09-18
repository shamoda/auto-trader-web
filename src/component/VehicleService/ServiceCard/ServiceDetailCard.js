import React, { Component } from 'react';
import { Card, Col, Badge, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './ServiceCard.css';
import Authentication from '../../../authentication/Authentication';

class ServiceDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cardClick = this.cardClick.bind(this);
  }

  cardClick(id) {
    return this.props.clicked(id);
  }

  render() {
    const { title, location, serviceProvider, img, price, date, status } =
      this.props;
    console.log('image', img);
    return (
      <Card
        onClick={() => this.cardClick(this.props.id)}
        className="shadow card-hover"
      >
        <Row>
          <Col
            md={3}
            style={{
              paddingLeft: '30px',
              paddingTop: '17px',
              paddingBottom: '12px',
            }}
          >
            <img
              alt=""
              src={'https://auto-trader-service-test.s3.amazonaws.com/' + img}
              rounded
              style={{ height: '140px', width: '160px' }}
              fluid
            />
          </Col>
          <Col md={7} style={{ padding: '10px 30px' }}>
            <p style={{ fontSize: '25px', fontWeight: '600', margin: '0px' }}>
              {title}
            </p>
            <h5 style={{ marginTop: '12px' }}>Rs. {price}</h5>
            <p style={{ fontSize: '15px', fontWeight: '600', margin: '0px' }}>
              {serviceProvider}
              <FontAwesomeIcon
                style={{ marginLeft: '10px' }}
                icon={faUserAlt}
              />
            </p>

            <p style={{ margin: '0px' }}>{location}</p>

            <div style={{ marginTop: '10px' }}>
              <small className="text-muted">{date}</small>
            </div>
          </Col>
          <Col>
            {Authentication.loggedAsAdmin() && (
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
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ServiceDetailCard;
