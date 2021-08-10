import React, { Component } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import './SparePartCard.css'

class SparePartCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.cardClicked = this.cardClicked.bind(this);
    }

    cardClicked(id) {
        return this.props.clicked(id);
    }

    render() { 
        return (
            <Card onClick={() => this.cardClicked(this.props.id)} className="shadow card-hover">
                <Row>
                    <Col md={3} style={{padding: "40px"}}>
                        <Image src={"https://auto-trader-spare.s3.amazonaws.com/"+this.props.img} rounded fluid />
                    </Col>
                    <Col md={9} style={{padding: "35px 40px"}}>
                        <p style={{fontSize:"25px", fontWeight: "600", margin: "0px"}}>{this.props.title}</p>
                        <p style={{fontSize:"18px", fontWeight: "600", margin: "0px"}}>Rs.{this.props.price}</p>
                        <p style={{margin: "0px", paddingTop:"10px"}}>{this.props.location}</p>
                        <p style={{margin: "0px"}}>{this.props.date}</p>
                    </Col>
                </Row>
            </Card>
         );
    }
}
 
export default SparePartCard;