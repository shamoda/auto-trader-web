import React, { Component } from 'react';
import { Button, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import SellerSparePartsList from '../SpareParts/SellerSparePartsList/SellerSparePartsList';
import './Seller.css'

class Seller extends Component {
    state = {}
    
    clicked = (id) => {
        return this.props.history.push('/addspare/' + id);
    }

    render() { 
        return (
            <div>
                <div className="program-title">
                    Seller PORTAL
                </div>
                <div style={{ textAlign: "center" }}>
                    <Container>
                        <h3 style={{ color: "red", padding: "20px" }}>It's Free!!! List Your,</h3>
                        <Button variant="outline-primary" style={{marginLeft: "20px", marginRight: "20px", marginBottom: "30px"}}>Vehicles</Button>
                        <Button onClick={() => this.props.history.push('/addspare')} variant="outline-primary" style={{marginLeft: "20px", marginRight: "20px", marginBottom: "30px"}}>Spare Parts</Button>
                        <Button variant="outline-primary" style={{marginLeft: "20px", marginRight: "20px", marginBottom: "30px"}}>Services</Button>
                    </Container>
                </div>
                <div>
                    <Container className="admindash-container">
                        <h3 style={{ marginBottom: "20px" }}>My Listings,</h3>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={2}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Vehicles</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Spare Parts</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Services</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div>
                                                Vehicle Component will Rendered Here
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div>
                                                <SellerSparePartsList clicked={this.clicked} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <div>
                                                Services Component will Rendered Here
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>


                    </Container>
                </div>
            </div>
         );
    }
}
 
export default Seller;