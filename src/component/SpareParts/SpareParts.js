import React, { Component } from 'react';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SpareParts.css'

class SparePart extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      category: ''
    }

    // this.onFileChange = this.onFileChange.bind(this);
  }
  
  handleChange = event =>{
    this.setState({
      [event.target.name] : event.target.value
    }, () => console.log(this.state.category));
  };
  

    render() { 
        return (
          <div>
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
                              <Form.Check onChange={this.handleChange} value="Air Conditioning & Heating" type="radio" label="Air Conditioning & Heating" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Air Intake & Fuel Delivery" type="radio" label="Air Intake & Fuel Delivery" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Axles & Axle Parts" type="radio" label="Axles & Axle Parts" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Battery" type="radio" label="Battery" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Brakes" type="radio" label="Brakes" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Car Audio Systems" type="radio" label="Car Audio Systems" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Car DVR" type="radio" label="Car DVR" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Suspension, Steering & Handling" type="radio" label="Suspension, Steering & Handling" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Transmission & Drivetrain" type="radio" label="Transmission & Drivetrain" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Turbos & Superchargers" type="radio" label="Turbos & Superchargers" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Wheels, Tyres & Rims" type="radio" label="Wheels, Tyres & Rims" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Windscreen Wipers & Washers" type="radio" label="Windscreen Wipers & Washers" name="category" className="mb-2" />
                            </Col>
                          </Form.Group>
                        </fieldset>
                      </Form>
                      </div>
                    </div>
                </Col>
                <Col md={9}></Col>
              </Row>
          </div>
        );
    }
}
 
export default SparePart;