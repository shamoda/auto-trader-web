import { faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import VehicleCard from "../Components/VehicleCard";
import AdminVehicleListDataService from "./AdminVehicleListDataService";

class AdminVehicleList extends Component {

    constructor(props){
        super(props);
        this.state = {
            checked: false,
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
            status: ""
        }
        if (this.state.checked) {
            example.status = 'Pending'
        }
        AdminVehicleListDataService.getVehicles(example)
            .then(response => {
                this.setState({ vehicles: response.data })
            })
    }

    componentDidMount() {
        this.loadVehicles()
    }

    CardClick = (id) => {
        return this.props.CardClick(id);
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

    handleChangeCheck = () => {
        this.setState({
            checked: !this.state.checked
        }, () => this.loadVehicles());
    }


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
            width: "200px",
            fontWeight: "bold",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderColor: "#000"
        }
        return (
            <div>
                <Container>
                    <Card className={""} style={{ backgroundColor: "white", border: "none",  marginRight: "50px",  marginBottom: "30px" }}>
                        <Card.Header style={{ backgroundColor: "white", border: "none" }}>
                            <div style={{marginLeft: "25px"}} >
                                <Row>
                                    <InputGroup size="sm">
                                        <Col>
                                            <Form.Group className="mb-3" id="formGridCheckbox">
                                                <Form.Check name="checked" value={this.state.checked} onChange={this.handleChangeCheck} type="checkbox" label="Pending Approval" style={{padding: "0px", margin: "0px", textDecoration: "none"}}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <FontAwesomeIcon style={{ marginTop: "8px", marginLeft: "-60px" }} icon={faFilePdf} />&nbsp; <a href="#" style={{padding: "0px", margin: "0px", textDecoration: "none", color: "black"}}>Get latest 100 Vehicle listings</a>
                                        </Col>
                                        <Col>
                                            <InputGroup size="sm">
                                                <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                                            </InputGroup>
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </div>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: "white", border: "none" }}>
                            {this.state.vehicles.length === 0 ? <p style={{textAlign: "center"}}>No Results Found</p>
                                :
                                currentEntries.map((vehicle) => (
                                    <VehicleCard id={vehicle.id} img={vehicle.img1} title={vehicle.model} price={vehicle.price} location={vehicle.location} date={vehicle.date} CardClick={this.CardClick} />
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
            </div>
        );
    }
}

export default AdminVehicleList;
