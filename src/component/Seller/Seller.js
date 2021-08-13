import React, { Component } from 'react';
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
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
                {/* <AdminStatistics /> */}
                <div>
                    <Container className="admindash-container">
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