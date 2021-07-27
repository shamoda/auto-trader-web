import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import './ServiceCard.css';

export default function ServiceCard({
  image1,
  title,
  subtitle,
  location,
  provider,
  time,
}) {
  return (
    <>
      <Card className="service-card">
        <Row>
          <Col sm={12} md={3}>
            <Card.Img
              style={{
                height: 100,
                width: '100%',
              }}
              src={`https://auto-trader-service-test.s3.amazonaws.com/${image1}`}
            />
          </Col>
          <Col sm={12} md={9}>
            <Card.Body style={{ padding: 5 }}>
              <Row>
                <Col>
                  <h5>{title}</h5>
                  <h6>{subtitle}</h6>
                </Col>
                <Col>
                  <h6>{location}</h6>
                  <p>{provider}</p>
                </Col>
              </Row>
              <Row>
                {' '}
                <div style={{ fontSize: 12 }}>
                  Last modified on :{' '}
                  {moment({ time }).format('MMMM Do YYYY, h:mm:ss a')}
                </div>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}
//s
