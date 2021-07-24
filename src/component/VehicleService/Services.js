import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from '../../asset/commons/SearchBar';

import ServiceCard from '../../asset/commons/serviceCard/ServiceCard';
import VerticalNav from '../../asset/commons/serviceCard/VerticalNav';

class Services extends React.Component {
  state = {};
  render() {
    return (
      <div style={{ padding: 50 }}>
        <Row>
          <Col md={4}>
            <div style={{}}>
              <VerticalNav
                title="Categories"
                category1="Tyre Service"
                category2="Car Wash & Service"
                category3="Battery Service"
                category4="Mechanical Garage"
              />
            </div>
          </Col>
          <Col md={8}>
            <div style={{ marginTop: 10, marginBottom: 50, width: '80%' }}>
              <SearchBar placeholder="Search an item" />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>{' '}
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
            <div style={{ marginTop: 20 }}>
              <ServiceCard />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Services;
