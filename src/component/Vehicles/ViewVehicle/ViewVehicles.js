import { faFastBackward, faFastForward, faSearch, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import VehicleCard from '../Components/VehicleCard';
import '../Components/VehicleCard.css';
import ViewVehicleDataService from "./ViewVehiclesDataService";

class Vehicle extends Component {

    constructor(props){
        super(props);
        this.state = {
            category: '',
            vehicles: [],

            currentPage: 1,
            entriesPerPage: 5,
            search: '',
            searchMessage: null,
            loading: false
        }

        this.loadVehicles = this.loadVehicles.bind(this);
    }

    loadVehicles() {
        let example = {
            model: this.state.search,
            category: this.state.category,
            status: "Approved"
        }
        ViewVehicleDataService.getVehicles(example)
            .then(response => {
                this.setState({ vehicles: response.data })
            })
    }

    componentDidMount() {
        this.loadVehicles()
    }

    CardClick = (id) => {
        return this.props.history.push('/vehicle/' + id);
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.vehicles.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.vehicles.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.vehicles.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => this.loadVehicles());
    };


    render() {
        const { currentPage, entriesPerPage, vehicles, search } = this.state;
        const lastIndex = currentPage * entriesPerPage;
        const firstIndex = lastIndex - entriesPerPage;
        const currentEntries = vehicles.slice(firstIndex, lastIndex);
        const totalPages = vehicles.length / entriesPerPage;

        const pageNumCss = {
            width: "45px",
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "white",
            borderColor: "black"
        }

        const searchBox = {
            width: "250px",
            fontWeight: "bold",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderColor: "#000"
        }
        return (
            <div>
                <div className="spare-banner">
                    <h1>Brand New & Re-Condition Vehicles...</h1>
                </div>
                <Row>
                    <Col md={3}>
                        <div>
                            <div style={{  }}>
                                <div style={{ backgroundColor: "#000", color: "#fff", fontWeight: "600", padding: "20px", fontSize: "20px" }} >
                                    Categories
                                </div>
                                <Form style={{marginLeft: "30px"}}>
                                    <fieldset>
                                        <Form.Group as={Row} className="mb-3 mt-3">
                                            <Col sm={10}>
                                                <Form.Check onChange={this.handleChange} value="" type="radio" label="All" name="category" className="mb-2"/>
                                                <Form.Check onChange={this.handleChange} value="Car" type="radio" label="Car" name="category" className="mb-2"/>
                                                <Form.Check onChange={this.handleChange} value="Van" type="radio" label="Van" name="category" className="mb-2"/>
                                                <Form.Check onChange={this.handleChange} value="Bus" type="radio" label="Bus" name="category" className="mb-2" />
                                                <Form.Check onChange={this.handleChange} value="SUV" type="radio" label="SUV" name="category" className="mb-2" />
                                                <Form.Check onChange={this.handleChange} value="Lorry" type="radio" label="Lorry" name="category" className="mb-2" />
                                                <Form.Check onChange={this.handleChange} value="Motorcycle" type="radio" label="Motorcycle" name="category" className="mb-2" />
                                                <Form.Check onChange={this.handleChange} value="Three Wheel" type="radio" label="Three Wheel" name="category" className="mb-2"/>
                                                <Form.Check onChange={this.handleChange} value="Truck" type="radio" label="Truck" name="category" className="mb-2" />
                                                <Form.Check onChange={this.handleChange} value="Tractor" type="radio" label="Tractor" name="category" className="mb-2" />
                                            </Col>
                                        </Form.Group>
                                    </fieldset>
                                </Form>
                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <Container>
                            <Card className={""} style={{ backgroundColor: "white", border: "none",  marginRight: "50px", marginTop: "30px", marginBottom: "30px" }}>
                                <Card.Header style={{ backgroundColor: "white", border: "none" }}>
                                    <div style={{ float: "right" }}>
                                        <InputGroup size="sm">
                                            <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                                        </InputGroup>
                                    </div>
                                </Card.Header>
                                <Card.Body style={{ backgroundColor: "white", border: "none" }}>
                                    {this.state.vehicles.length === 0 ? <p style={{textAlign: "center"}}>No Results Found</p>
                                        :
                                        currentEntries.map((vehicle) => (
                                            <VehicleCard id={vehicle.id} img={vehicle.img1} model={vehicle.model} price={vehicle.price} location={vehicle.location} date={vehicle.date} CardClick={this.CardClick}/>
                                        ))
                                    }
                                </Card.Body>
                                <Card.Footer style={{ backgroundColor: "white", color: "black", border: "none" }}>
                                    <div style={{ float: "left" }}>
                                        Showing Page {currentPage} of {Math.ceil(totalPages)}
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <InputGroup size="sm">
                                            <InputGroup.Prepend>
                                                <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                                    <FontAwesomeIcon icon={faFastBackward} /> First
                                                </Button>
                                                <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                                                </Button>
                                            </InputGroup.Prepend>
                                            <FormControl style={pageNumCss} className="" name="currentPage" value={currentPage} disabled />
                                            <InputGroup.Append>
                                                <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                                    Next <FontAwesomeIcon icon={faStepForward} />
                                                </Button>
                                                <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
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

export default Vehicle;
