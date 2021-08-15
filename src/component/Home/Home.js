import React, { Component } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import HomeSpare from './HomeSpare/HomeSpare';
import './Home.css'

class Home extends Component {
    
    clicked = (id) => {
        return this.props.history.push('/sparepart/' + id);
    }
    
    render() { 
        return ( 
            <div>
                <div className="spare-banner">
                    <h1>Drop the Gear and Disappear...</h1>
                </div>
                <div>
                    {/* <Container className="admindash-container"> */}
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={2} className="v-nav">
                                <Nav variant="pills" className="flex-column">
                                        <Nav.Item style={{color: "white", fontWeight: "600", background: "black"}}>
                                            <Nav.Link style={{color: "white", fontWeight: "600", background: "black", fontSize: "18px"}}>I'm looking for,</Nav.Link>
                                        </Nav.Item>
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
                                                <HomeSpare clicked={this.clicked} />
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


                    {/* </Container> */}
                </div>
            </div>
         );
    }
}
 
export default Home;