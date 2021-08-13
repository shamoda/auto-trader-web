import React, { Component } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import './VehicleCard.css'

class VehicleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.CardClick = this.CardClick.bind(this);
    }

    CardClick(id) {
        return this.props.onClickVehicle(id);
    }

    render() {
        return (
            <Card onClick={() => this.CardClick(this.props.id)} className="shadow card-hover">
                <Row>
                    <Col md={3} style={{padding: "40px"}}>
                        <Image src={"https://auto-trader-vehicle.s3.amazonaws.com/"+this.props.img} rounded fluid />
                    </Col>
                    <Col md={9} style={{padding: "35px 40px"}}>
                        <p style={{fontSize:"25px", fontWeight: "600", margin: "0px"}}>{this.props.model}</p>
                        <p style={{fontSize:"18px", fontWeight: "600", margin: "0px"}}>Rs.{this.props.price}</p>
                        <p style={{margin: "0px", paddingTop:"10px"}}>{this.props.location}</p>
                        <p style={{margin: "0px"}}>{this.props.date}</p>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default VehicleCard;
