import React, { Component } from 'react';
import { Badge, Button, Carousel, Col, Container, Form, Image, Modal, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

import ViewSingleVehicleDataService from "./ViewSingleVehicleDataService";
import Authentication from '../../../authentication/Authentication';
import './VehicleDetailedView.css'

class VehicleDetailedView extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            seller: '',
            contact: '',
            email: '',
            location: '',
            model: '',
            transmission: '',
            year: '',
            manufacturer: '',
            engineCC: '',
            fuelType: '',
            price: '',
            condition: '',
            category: '',
            moreInfo: '',
            status: '',
            comment: '',
            date: '',
            img1: null,
            img2: null,
            img3: null,
            img4: null,
            loading: false
        }

        this.ClickSubmit = this.ClickSubmit.bind(this);
        this.ClickDelete = this.ClickDelete.bind(this);
    }

    componentDidMount() {
        ViewSingleVehicleDataService.getVehicle(this.state.id)
            .then(res => {
                this.setState({
                    seller: res.data.seller,
                    contact: res.data.contact,
                    email: res.data.email,
                    location: res.data.location,
                    model: res.data.model,
                    transmission: res.data.transmission,
                    year: res.data.year,
                    manufacturer: res.data.manufacturer,
                    engineCC: res.data.engineCC,
                    fuelType: res.data.fuelType,
                    price: res.data.price,
                    condition: res.data.condition,
                    category: res.data.category,
                    moreInfo: res.data.moreInfo,
                    status: res.data.status,
                    comment: res.data.comment,
                    date: res.data.date,
                    img1: res.data.img1,
                    img2: res.data.img2,
                    img3: res.data.img3,
                    img4: res.data.img4,
                })
            })
    }

    ClickSubmit() {
        if(this.state.status == "Pending" || this.state.status == "") {
            swal({
                text: "Please select your decision",
                icon: "warning",
                button: "Ok",
            })
            return
        } else {
            this.setState({loading: true})
            let formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('status', this.state.status);
            formData.append('comment', this.state.comment);

            ViewSingleVehicleDataService.reviewVehicle(formData)
                .then(res => {
                    this.setState({ loading: false })
                    return this.props.history.push('/admin');
                })
                .catch(err => {
                    this.setState({ loading: false })
                    swal({
                        title: "Oops!!!",
                        text: "Something went wrong",
                        icon: "warning",
                        button: "Ok",
                    })
                    return
                })
        }
    }

    ClickDelete() {
        swal({
            title: "You are about to delete,",
            text: this.state.model,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({loading: true})
                ViewSingleVehicleDataService.deleteVehicle(this.state.id)
                    .then(res => {
                        this.setState({loading: false})
                        return this.props.history.push('/admin');
                    })
            }
        })
    }

    formChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        }, () => console.log('form changed'));

    };

    render() {

        let images = [];
        if(this.state.img1 != null){
            images.push(this.state.img1)
        }
        if (this.state.img2 != null) {
            images.push(this.state.img2)
        }
        if (this.state.img3 != null) {
            images.push(this.state.img3)
        }
        if (this.state.img4 != null) {
            images.push(this.state.img4)
        }

        return (
            <div>
                <Container style={{marginTop: "50px", marginBottom: "50px"}}>
                    <Carousel style={{textAlign: "center"}} className={"img_overlay img-hover-zoom"} interval={10000} touch={true} slide={true} pause={false} indicators={true} controls={true} fade={false}>
                        {images.map((img) => (
                            <Carousel.Item >
                                <Image
                                    className="img"
                                    src={"https://auto-trader-vehicle.s3.amazonaws.com/"+img}
                                    alt="First slide"
                                    rounded
                                    fluid
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div style={{marginLeft: "100px", marginRight: "100px", marginTop: "30px", marginBottom: "30px"}}>
                        <h1>{this.state.model}</h1>
                        <h3>Rs. {this.state.price}</h3>
                        <p>Posted Date: {this.state.date}</p>
                        <p style={{marginBottom: "0px"}}><b>Category:</b> {this.state.category}</p>
                        <p style={{marginBottom: "0px"}}><b>Manufacturer:</b> {this.state.manufacturer}</p>
                        <p style={{marginBottom: "0px"}}><b>Condition:</b> {this.state.condition}</p>
                        <p style={{marginBottom: "0px"}}><b>Transmission:</b> {this.state.transmission}</p>
                        <p><b>Fuel Type:</b> {this.state.fuelType}</p>
                        <p><b>Additional Information:</b><br />{this.state.moreInfo}</p>
                        <p><b>Contact information:</b></p>
                        <p style={{marginBottom: "0px"}}><b>Name:</b> {this.state.seller}</p>
                        <p style={{marginBottom: "0px"}}><b>Contact:</b> {this.state.contact}</p>
                        <p><b>Location:</b> {this.state.location}</p>
                        <hr />
                    </div>

                    {Authentication.loggedAsAdmin() && <div style={{marginLeft: "100px", marginTop:"40px"}}>
                        <p><b>Submit Your Review</b></p>
                        <Form autoComplete="off" >
                            <Row>
                                <Col>
                                    <Form.Control as="select" className="my-1 mr-sm-2" custom onChange={this.formChange} name="status" value={this.state.status} required >
                                        <option value="">Choose...</option>
                                        <option value="Approved">Approve</option>
                                        <option value="Rejected">Reject</option>
                                    </Form.Control>
                                    <p style={{margin: "5px 0px"}}>
                                        {this.state.status === "Pending" && <Badge variant="warning">{this.state.status}</Badge>}
                                        {this.state.status === "Approved" && <Badge variant="success">{this.state.status}</Badge>}
                                        {this.state.status === "Rejected" && <Badge variant="danger">{this.state.status}</Badge>}
                                    </p>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control className="my-1 mr-sm-2" onChange={this.formChange} name="comment" value={this.state.comment} placeholder="your comment" required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button className="my-1 mr-sm-2" onClick={this.ClickSubmit} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                    <Button className="my-1 mr-sm-2" onClick={this.ClickDelete} variant="outline-danger"><FontAwesomeIcon size="sm" icon={faTrash} />&nbsp; Delete</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>}
                </Container>

                <Modal centered size="sm" show={this.state.loading} onHide={() => console.log('please wait...')}>
                    <Modal.Header>
                        <Modal.Title><Spinner animation="border" /> Please wait...</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default VehicleDetailedView;
