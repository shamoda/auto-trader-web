import {
  faFastBackward,
  faFastForward,
  faSearch,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';

import './ServiceList.css';
// import banner from '../../asset/banner.jpg';
import ServicesGeneralDataService from './ServicesGeneralDataService';
import ServiceDetailCard from '../ServiceCard/ServiceDetailCard';

class VehicleServicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      services: [],

      currentPage: 1,
      entriesPerPage: 5,
      search: '',
      searchMessage: null,
      loading: false,
    };

    this.refreshServices = this.refreshServices.bind(this);
  }

  refreshServices() {
    let example = {
      title: this.state.search,
      category: this.state.category,
      status: 'approved',
    };
    ServicesGeneralDataService.getServicesData(example).then((response) => {
      this.setState({ services: response.data });
    });
  }

  componentDidMount() {
    this.refreshServices();
  }

  clicked = (id) => {
    return this.props.history.push('/services/' + id);
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.services.length / this.state.entriesPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.services.length / this.state.entriesPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.services.length / this.state.entriesPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.refreshServices()
    );
  };

  render() {
    const { currentPage, entriesPerPage, services, search } = this.state;
    const lastIndex = currentPage * entriesPerPage;
    const firstIndex = lastIndex - entriesPerPage;
    const currentEntries = services.slice(firstIndex, lastIndex);
    const totalPages = services.length / entriesPerPage;

    const pageNumCss = {
      width: '45px',
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'white',
      borderColor: 'black',
    };

    const searchBox = {
      width: '250px',
      fontWeight: 'bold',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderColor: '#000',
    };
    return (
      <div>
        <div className="spare-banner">
          <h1>Car a Trusted Care...</h1>
        </div>
        <Row>
          <Col md={3}>
            <div>
              <div style={{}}>
                <div
                  style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '20px',
                    fontSize: '20px',
                  }}
                >
                  Categories
                </div>
                <Form style={{ marginLeft: '30px' }}>
                  <fieldset>
                    <Form.Group as={Row} className="mb-3 mt-3">
                      <Col sm={10}>
                        <Form.Check
                          onChange={this.handleChange}
                          value=""
                          type="radio"
                          label="All"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Antifreeze adding"
                          type="radio"
                          label="Air Conditioning & Heating"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Battery replacement"
                          type="radio"
                          label="Battery replacement"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Brake work"
                          type="radio"
                          label="Brake work"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Car wash & Services"
                          type="radio"
                          label="Car wash and Services"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Brake Work"
                          type="radio"
                          label="Engine Tune Up"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Oil/oil filter changed"
                          type="radio"
                          label="Oil/ oil filter changed"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Hybrid Services"
                          type="radio"
                          label="Car DVR"
                          name="Hybrid Services"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Replace Air Filters"
                          type="radio"
                          label="Replace air filter"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Scheduled Maintenance"
                          type="radio"
                          label="Scheduled Maintenance"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Tyres $ Tubes Services"
                          type="radio"
                          label="Tyre & Tube Services"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Wheel Balancing & Alignment"
                          type="radio"
                          label="Wheel Balancing and Alignment"
                          name="category"
                          className="mb-2"
                        />
                        <Form.Check
                          onChange={this.handleChange}
                          value="Wiper blade Replacement"
                          type="radio"
                          label="Wiper blades replacement"
                          name="category"
                          className="mb-2"
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                </Form>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Container>
              <Card
                className={''}
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  marginRight: '50px',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              >
                <Card.Header
                  style={{ backgroundColor: 'white', border: 'none' }}
                >
                  <div style={{ float: 'right' }}>
                    <InputGroup size="sm">
                      <FontAwesomeIcon
                        style={{ marginTop: '8px' }}
                        icon={faSearch}
                      />
                      &nbsp;{' '}
                      <FormControl
                        onChange={this.handleChange}
                        style={searchBox}
                        autoComplete="off"
                        placeholder="start typing..."
                        name="search"
                        value={this.state.search}
                        className=""
                      />
                      &nbsp;
                    </InputGroup>
                  </div>
                </Card.Header>
                <Card.Body style={{ backgroundColor: 'white', border: 'none' }}>
                  {services.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No Results Found</p>
                  ) : (
                    currentEntries.map(
                      ({
                        id,
                        title,
                        subTitle,
                        location,
                        serviceProvider,
                        image1,
                        price,
                        date,
                        status,
                      }) => (
                        <ServiceDetailCard
                          id={id}
                          img={image1}
                          title={title}
                          subTitle={subTitle}
                          location={location}
                          date={date}
                          serviceProvider={serviceProvider}
                          price={price}
                          status={status}
                          clicked={this.clicked}
                        />
                      )
                    )
                  )}
                </Card.Body>
                <Card.Footer
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                  }}
                >
                  <div style={{ float: 'left' }}>
                    Showing Page {currentPage} of {Math.ceil(totalPages)}
                  </div>
                  <div style={{ float: 'right' }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                          type="button"
                          variant="outline-dark"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.firstPage}
                        >
                          <FontAwesomeIcon icon={faFastBackward} /> First
                        </Button>
                        <Button
                          type="button"
                          variant="outline-dark"
                          disabled={currentPage === 1 ? true : false}
                          onClick={this.prevPage}
                        >
                          <FontAwesomeIcon icon={faStepBackward} /> Prev
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                        style={pageNumCss}
                        className=""
                        name="currentPage"
                        value={currentPage}
                        disabled
                      />
                      <InputGroup.Append>
                        <Button
                          type="button"
                          variant="outline-dark"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.nextPage}
                        >
                          Next <FontAwesomeIcon icon={faStepForward} />
                        </Button>
                        <Button
                          type="button"
                          variant="outline-dark"
                          disabled={currentPage === totalPages ? true : false}
                          onClick={this.lastPage}
                        >
                          Last <FontAwesomeIcon icon={faFastForward} />
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VehicleServicesList;
