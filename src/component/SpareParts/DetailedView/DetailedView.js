import React, { Component } from 'react';
import { Badge, Button, Carousel, Col, Container, Form, Image, Modal, Row, Spinner } from 'react-bootstrap';
import DetailedViewDataService from './DetailedViewDataService'
import './DetailedView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Authentication from '../../../authentication/Authentication';

class DetailedView extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            email: '',
            contact: '',
            seller: '',
            location: '',
            status: '',
            comment: '',
            date: '',
            title: '',
            price: '',
            condition: '',
            type: '',
            category: '',
            additionalInfo: '',
            img1: null,
            img2: null,
            img3: null,

            loading: false
        }

        this.submitBtnClicked = this.submitBtnClicked.bind(this);
        this.deleteBtnClicked = this.deleteBtnClicked.bind(this);
    }

    componentDidMount() {
        DetailedViewDataService.getSpare(this.state.id)
            .then(res => {
                this.setState({
                    email: res.data.email,
                    contact: res.data.contact,
                    seller: res.data.seller,
                    location: res.data.location,
                    status: res.data.status,
                    comment: res.data.comment,
                    date: res.data.date,
                    title: res.data.title,
                    price: res.data.price,
                    condition: res.data.condition,
                    type: res.data.type,
                    category: res.data.category,
                    additionalInfo: res.data.additionalInfo,
                    img1: res.data.img1,
                    img2: res.data.img2,
                    img3: res.data.img3,
                })
            })
    }

    submitBtnClicked() {
        if(this.state.status == "pending" || this.state.status == "") {
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

            DetailedViewDataService.reviewSpare(formData)
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

    deleteBtnClicked() {
        swal({
            title: "You are about to delete,",
            text: this.state.title,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({loading: true})
                DetailedViewDataService.deleteSpare(this.state.id)
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

        let imgs = []
        imgs.push(this.state.img1)
        if (this.state.img2 != null) {
            imgs.push(this.state.img2)
        }
        if (this.state.img3 != null) {
            imgs.push(this.state.img3)
        }

        return (
            <div>
                <Container style={{marginTop: "50px", marginBottom: "50px"}}>
                    <Carousel style={{textAlign: "center"}} className={"img_overlay img-hover-zoom"} interval={10000} touch={true} slide={true} pause={false} indicators={true} controls={true} fade={false}>
                        {imgs.map((img) => (
                            <Carousel.Item >
                                <Image
                                    className="img"
                                    src={"https://auto-trader-spare.s3.amazonaws.com/"+img}
                                    alt="First slide"
                                    rounded
                                    fluid
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div style={{marginLeft: "100px", marginRight: "100px", marginTop: "30px", marginBottom: "30px"}}>            
                        <h1>{this.state.title}</h1>
                        <h3>Rs. {this.state.price}</h3>
                        <p>Posted Date: {this.state.date}</p>
                        <p style={{marginBottom: "0px"}}><b>Condition:</b> {this.state.condition}</p>
                        <p style={{marginBottom: "0px"}}><b>type:</b> {this.state.type}</p>
                        <p><b>Category:</b> {this.state.category}</p>
                        <p><b>Additional Information:</b><br />{this.state.additionalInfo}</p>
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
                                    <option value="approved">Approve</option>
                                    <option value="rejected">Reject</option>
                                </Form.Control>
                                <p style={{margin: "5px 0px"}}>
                                    {this.state.status === "pending" && <Badge variant="warning">{this.state.status}</Badge>}
                                    {this.state.status === "approved" && <Badge variant="success">{this.state.status}</Badge>}
                                    {this.state.status === "rejected" && <Badge variant="danger">{this.state.status}</Badge>}
                                </p>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control className="my-1 mr-sm-2" onChange={this.formChange} name="comment" value={this.state.comment} placeholder="your comment" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button className="my-1 mr-sm-2" onClick={this.submitBtnClicked} variant="outline-dark"><FontAwesomeIcon size="sm" icon={faEdit} />&nbsp; Submit</Button>
                                <Button className="my-1 mr-sm-2" onClick={this.deleteBtnClicked} variant="outline-danger"><FontAwesomeIcon size="sm" icon={faTrash} />&nbsp; Delete</Button> 
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
 
export default DetailedView;