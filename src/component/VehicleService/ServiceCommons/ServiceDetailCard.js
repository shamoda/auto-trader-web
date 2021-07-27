import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const ServiceDetailCard = ({
  title,
  subtitle,
  location,
  contactNo,
  description,
  provider,
  comment,
  status,
  category,
}) => {
  return (
    <Container style={{ minHeight: '600px' }}>
      <Card style={{ marginTop: '20px', marginBottom: '10px' }}>
        <div
          style={{
            marginLeft: '20px',
            marginBottom: '20px',
            marginTop: '10px',
          }}
        >
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <div style={{ marginBottom: 20 }}>
            <h5> {description}</h5>
          </div>
          <h6>Location : {location}</h6>
          <h6>Service Provider : {provider}</h6>
        </div>
      </Card>
    </Container>
  );
};
export default ServiceDetailCard;
