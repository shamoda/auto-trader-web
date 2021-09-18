import React, { Component } from 'react';
import { Card, Col, Badge, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './ProvidersCard.css';
import Moment from 'react-moment';

class ProvidersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.cardClick = this.cardClick.bind(this);
  }

  cardClick = (id) => {
    return this.props.click(id);
  };

  render() {
    const { title, img, price, id, location, currentDate, status } = this.props;
    console.log('image', img);
    console.log('price', price);
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
              style={{ height: '140px', width: '150px' }}
              fluid
            />
          </Col>
          <Col md={7} style={{ padding: '10px 30px' }}>
            <p style={{ fontSize: '25px', fontWeight: '600', margin: '0px' }}>
              {title}
            </p>
            <h5 style={{ marginTop: '12px' }}>Rs {price}</h5>
            <div style={{ marginTop: '10px' }}>
              <p className="text-muted">{location}</p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <small className="text-muted">
                <Moment format="YYYY-MM-DD">{currentDate}</Moment>
              </small>
            </div>
          </Col>
          <Col>
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
        </Row>
      </Card>
    );
  }
}

export default ProvidersCard;
