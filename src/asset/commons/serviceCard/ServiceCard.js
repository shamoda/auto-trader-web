import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './ServiceCard.css';
import mustan from '../../mustan.jpeg';
export default function ServiceCard() {
  return (
    <>
      <Card className="service-card">
        <Row>
          <Col sm={12} md={3}>
            <Card.Img
              style={{
                height: 90,
                width: '100%',
              }}
              src={mustan}
            />
          </Col>
          <Col sm={12} md={9}>
            <Card.Body style={{ padding: 5 }}>
              <h3>For Sale</h3>
              This is some text within a card body.
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}
