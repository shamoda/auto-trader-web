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
                              <Form.Check onChange={this.handleChange} value="Car Tuning & Styling" type="radio" label="Car Tuning & Styling" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Carburetor" type="radio" label="Carburetor" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Chassis" type="radio" label="Chassis" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Electrical Components" type="radio" label="Electrical Components" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Emission Systems" type="radio" label="Emission Systems" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Engine Cooling" type="radio" label="Engine Cooling" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Engines & Engine Parts" type="radio" label="Engines & Engine Parts" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Exhausts & Exhaust Parts" type="radio" label="Exhausts & Exhaust Parts" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="External & Body Parts" type="radio" label="External & Body Parts" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="External Lights & Indicators" type="radio" label="External Lights & Indicators" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Footrests, Pedals & Pegs" type="radio" label="Footrests, Pedals & Pegs" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Freezer" type="radio" label="Freezer" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Gauges, Dials & Instruments" type="radio" label="Gauges, Dials & Instruments" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Generator" type="radio" label="Generator" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="GPS & In-Car Technology" type="radio" label="GPS & In-Car Technology" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Handlebars, Grips & Levers" type="radio" label="Handlebars, Grips & Levers" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Helmets, Clothing & Protection" type="radio" label="Helmets, Clothing & Protection" name="category" className="mb-2"/>
                              <Form.Check onChange={this.handleChange} value="Interior Parts & Furnishings" type="radio" label="Interior Parts & Furnishings" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Lighting & Indicators" type="radio" label="Lighting & Indicators" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Mirrors" type="radio" label="Mirrors" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Oils, Lubricants & Fluids" type="radio" label="Oils, Lubricants & Fluids" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Other" type="radio" label="Other" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Reverse Camera" type="radio" label="Reverse Camera" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Seating" type="radio" label="Seating" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Service Kits" type="radio" label="Service Kits" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Silencer" type="radio" label="Silencer" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Starter Motors" type="radio" label="Starter Motors" name="category" className="mb-2" />
                              <Form.Check onChange={this.handleChange} value="Stickers" type="radio" label="Stickers" name="category" className="mb-2" />
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