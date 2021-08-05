import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from '../../asset/commons/SearchBar';

import ServiceCard from '../../asset/commons/serviceCard/ServiceCard';
import VerticalNav from '../../asset/commons/serviceCard/VerticalNav';
import ServiceDataService from './ServiceDataService';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
    this.getServices = this.getServices.bind(this);
  }

  componentDidMount() {
    this.getServices();
  }

  serviceDetailHandle = (id) => {
    return this.props.history.push(`/services/${id}`);
  };

  getServices() {
    let service = {
      status: 'pending', //test
    };
    this.setState({ loading: true });
    ServiceDataService.getService(service).then((response) => {
      this.setState({ services: response.data });
      this.setState({ loading: false });
    });
  }
  render() {
    const { services } = this.state;
    const { serviceDetailHandle } = this;
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

            {services.map((service) => (
              <div style={{ marginTop: 20 }} key={service.id}>
                <ServiceCard
                  Id={service.id}
                  title={service.title}
                  subtitle={service.subTitle}
                  location={service.location}
                  provider={service.serviceProvider}
                  time={service.currentTime}
                  image1={service.image1}
                  detailHandle={serviceDetailHandle}
                />
              </div>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Services;
