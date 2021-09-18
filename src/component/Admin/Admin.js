import React, { Component } from 'react';
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Analytics from '../Analytics/Analytics';
import AdminSparePartsList from '../SpareParts/AdminSparePartsList/AdminSparePartsList';
import './Admin.css'
import AdminVehicleList from "../Vehicles/AdminVehicleList/AdminVehicleList";
import Revenue from '../Revenue/Revenue';
import ManageUsers from '../ManageUsers/ManageUsers';
import AdminServiceList from '../VehicleService/AdminServiceList/AdminServiceList';

class Admin extends Component {
  state = {};

  CardClick = (id) => {
    return this.props.history.push('/vehicle/' + id);
  };

  clicked = (id) => {
    return this.props.history.push('/sparepart/' + id);
  };

  render() {
    return (
      <div>
        <div className="program-title">ADMIN PORTAL</div>
        <Analytics />
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
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Revenue Report</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div>
                        <AdminVehicleList CardClick={this.CardClick} />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div>
                        <AdminSparePartsList clicked={this.clicked} />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div>
                        <AdminServiceList />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <div>
                        <ManageUsers />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                      <div>
                        <Revenue />
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

export default Admin;
