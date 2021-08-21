import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import Authentication from '../../../authentication/Authentication';
import AddSparePartDataService from './AddSparePartDataService';
import './AddSparePart.css'

class AddSparePart extends Component {
     constructor(props){
        super(props);
         this.state = {
            id: this.props.match.params.id,
            seller: Authentication.loggedUserName(),
            contact: Authentication.loggedUserContact(),
            email: Authentication.loggedUserId(),
            location: Authentication.loggedUserLocation(),
            title: '',
            price: '',
            condition: '',
            type: '',
            category: '',
            additionalInfo: '',
            date: '',

            img1: null,
            img1Url: null,
            img1Name: null,
            img1Selected: false,

            img2: null,
            img2Url: null,
            img2Name: null,
            img2Selected: false,

            img3: null,
            img3Url: null,
            img3Name: null,
            img3Selected: false,

            error: null,
            loading: false
         }

        this.addSparePart = this.addSparePart.bind(this);
        this.updateSparePart = this.updateSparePart.bind(this);
        this.deleteSparePart = this.deleteSparePart.bind(this);
        this.img1Change = this.img1Change.bind(this);
        this.img2Change = this.img2Change.bind(this);
        this.img3Change = this.img3Change.bind(this);
    }

    componentDidMount() {
        if (this.state.id != null) {
            AddSparePartDataService.getSparePart(this.state.id)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                        seller: res.data.seller,
                        contact: res.data.contact,
                        email: res.data.email,
                        location: res.data.location,
                        title: res.data.title,
                        price: res.data.price,
                        condition: res.data.condition,
                        type: res.data.type,
                        category: res.data.category,
                        date: res.data.date,
                        additionalInfo: res.data.additionalInfo,
                        img1Url: "https://auto-trader-spare.s3.amazonaws.com/"+res.data.img1,
                        img2Url: "https://auto-trader-spare.s3.amazonaws.com/"+res.data.img2,
                        img3Url: "https://auto-trader-spare.s3.amazonaws.com/"+res.data.img3
                    }, () => {
                        if (res.data.img1 != null) {
                        this.setState({
                            img1Selected: true
                        })
                        }
                        if (res.data.img2 != null) {
                        this.setState({
                            img2Selected: true
                        })
                        }
                        if (res.data.img3 != null) {
                        this.setState({
                            img3Selected: true
                        })
                        }
                    })
            })
        }
    }


    addSparePart(event) {
        event.preventDefault();

        if (this.state.seller === '') {
            this.displayError('Name cannot be empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact cannot be empty')
        } else if (this.state.location === '') {
            this.displayError('Location cannot be empty')
        } else if (this.state.title === '') {
            this.displayError('Title cannot be empty')
        } else if (this.state.price === '') {
            this.displayError('Price cannot be empty')
        } else if (this.state.condition === '') {
            this.displayError('Condition cannot be empty')
        } else if (this.state.type === '') {
            this.displayError('Type cannot be empty')
        } else if (this.state.category === '') {
            this.displayError('Category cannot be empty')
        }  else if (this.state.img1 == null) {
            this.displayError('Main Image cannot be empty')
        } else {
            this.setState({ loading: true })
            
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('seller', this.state.seller);
            formData.append('location', this.state.location);
            formData.append('title', this.state.title);
            formData.append('price', this.state.price);
            formData.append('condition', this.state.condition);
            formData.append('type', this.state.type);
            formData.append('category', this.state.category);
            formData.append('additionalInfo', this.state.additionalInfo);
            formData.append('img1', this.state.img1);
            if (this.state.img2 != null) {
                formData.append('img2', this.state.img2);
            }
            if (this.state.img3 != null) {
                formData.append('img3', this.state.img3);
            }

            AddSparePartDataService.addSparePart(formData)
                .then(res => {
                    this.setState({ loading: false })
                    swal({
                        title: "Successfully Listed Your Item",
                        text: "Submission under review",
                        icon: "success",
                        button: "Ok",
                      }).then(result => {
                        return this.props.history.push('/seller')
                      })
                })
                .catch( error => {
                    this.setState({loading: false})
                    swal({
                        title: "Oops!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        button: "Ok",
                      })
                })
        }
    }


    updateSparePart(event) {
        event.preventDefault();

        if (this.state.seller === '') {
            this.displayError('Name cannot be empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact cannot be empty')
        } else if (this.state.location === '') {
            this.displayError('Location cannot be empty')
        } else if (this.state.title === '') {
            this.displayError('Title cannot be empty')
        } else if (this.state.price === '') {
            this.displayError('Price cannot be empty')
        } else if (this.state.condition === '') {
            this.displayError('Condition cannot be empty')
        } else if (this.state.type === '') {
            this.displayError('Type cannot be empty')
        } else if (this.state.category === '') {
            this.displayError('Category cannot be empty')
        }  else if (this.state.img1 == null) {
            this.displayError('Main Image cannot be empty')
        } else {
            this.setState({ loading: true })
            
            let formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('seller', this.state.seller);
            formData.append('location', this.state.location);
            formData.append('date', this.state.date);
            formData.append('title', this.state.title);
            formData.append('price', this.state.price);
            formData.append('condition', this.state.condition);
            formData.append('type', this.state.type);
            formData.append('category', this.state.category);
            formData.append('additionalInfo', this.state.additionalInfo);
            formData.append('img1', this.state.img1);
            if (this.state.img2 != null) {
                formData.append('img2', this.state.img2);
            }
            if (this.state.img3 != null) {
                formData.append('img3', this.state.img3);
            }

            AddSparePartDataService.updateSparePart(formData)
                .then(res => {
                    this.setState({ loading: false })
                    swal({
                        title: "Successfully Updated",
                        text: "Submission under review",
                        icon: "success",
                        button: "Ok",
                      }).then(result => {
                        return this.props.history.push('/seller')
                      })
                })
                .catch( error => {
                    this.setState({loading: false})
                    swal({
                        title: "Oops!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        button: "Ok",
                      })
                })
        }
    }


    deleteSparePart() {
        swal({
            title: "You are about to delete,",
            text: this.state.title,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({loading: true})
                AddSparePartDataService.deleteSparePart(this.state.id)
                    .then(res => {
                        this.setState({loading: false})
                        return this.props.history.push('/seller');
                })
            }
        })
    }



    displayError(msg) {
        swal({
            text: msg,
            icon: "warning",
            button: "Ok",
        })
    }

    img1Change(event) {
        if (event.target.files.length) {
            this.setState({
                img1: event.target.files[0],
                img1Url: URL.createObjectURL(event.target.files[0]),
                img1Name: event.target.files[0].name,
                img1Selected: true,
                error: null
            }, () => console.log('Main selected'));
        }
    }

    img2Change(event) {
        if (event.target.files.length) {
            this.setState({
                img2: event.target.files[0],
                img2Url: URL.createObjectURL(event.target.files[0]),
                img2Name: event.target.files[0].name,
                img2Selected: true,
                error: null
            }, () => console.log('Second selected'));
        }
    }

    img3Change(event) {
        if (event.target.files.length) {
            this.setState({
                img3: event.target.files[0],
                img3Url: URL.createObjectURL(event.target.files[0]),
                img3Name: event.target.files[0].name,
                img3Selected: true,
                error: null
            }, () => console.log('Third selected'));
        }
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        }, () => console.log(this.state));
    };


    render() { 
        return (
            <div style={{padding: "50px"}}>
                <Container>
                    <div style={{ fontWeight: 600, fontSize: "25px", marginBottom: "20px" }}>Verify Contact Details</div>

                    <Form autoComplete="off" >
                        <Form.Group controlId="seller" className="attendeeregistration-form-group">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="seller" value={this.state.seller} type="text" placeholder="your name" className="paperregistration-form-input" />
                            <Form.Text className="text-muted"> Contact person's name </Form.Text>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="contact" className="attendeeregistration-form-group">
                                    <Form.Label>Your Contact Number</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="contact number" className="paperregistration-form-input" />
                                    <Form.Text className="text-muted"> Contact person's number </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="location" className="attendeeregistration-form-group">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="location" value={this.state.location} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- select -</option>
                                        <option>Anuradapura</option>
                                        <option>Bandaragama</option>
                                        <option>Colombo</option>
                                        <option>Dehiwala</option>
                                        <option>Gampaha</option>
                                        <option>Hambanthota</option>
                                        <option>Jaffna</option>
                                        <option>Kandy</option>
                                        <option>Maharagama</option>
                                        <option>Panadura</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted"> Item location </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* ======================================================================================================= */}
                        
                        <div style={{ fontWeight: 600, fontSize: "25px", marginBottom: "20px", marginTop: "50px" }}>Enter Spare Part Details</div>

                        <Form.Group controlId="title" className="attendeeregistration-form-group">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={this.handleChange} name="title" value={this.state.title} type="text" placeholder="enter the name of your spare part" className="paperregistration-form-input" />
                            <Form.Text className="text-muted"> This title will be used in every page </Form.Text>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="price" className="attendeeregistration-form-group">
                                    <Form.Label>Price (Rs.)</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="price" value={this.state.price} type="number" placeholder="enter the price" className="paperregistration-form-input" />
                                    <Form.Text className="text-muted"> Price should be in Rupees </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="condition" className="attendeeregistration-form-group">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="condition" value={this.state.condition} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- select -</option>
                                        <option>Brand New</option>
                                        <option>Used</option>
                                        <option>Antique</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted"> Item condition </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId="type" className="attendeeregistration-form-group">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="type" value={this.state.type} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- select -</option>
                                        <option>Car</option>
                                        <option>SUV</option>
                                        <option>Van</option>
                                        <option>Truck</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted"> Type of Spare Part </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="category" className="attendeeregistration-form-group">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="category" value={this.state.category} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- select -</option>
                                        <option>Air Conditioning & Heating</option>
                                        <option>Air Intake & Fuel Delivery</option>
                                        <option>Axles & Axle Parts</option>
                                        <option>Battery</option>
                                        <option>Brakes</option>
                                        <option>Car Audio Systems</option>
                                        <option>Car DVR</option>
                                        <option>Suspension, Steering & Handling</option>
                                        <option>Transmission & Drivetrain</option>
                                        <option>Turbos & Superchargers</option>
                                        <option>Wheels, Tyres & Rims</option>
                                        <option>Windscreen Wipers & Washers</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted"> Item condition </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="additionalInfo" className="attendeeregistration-form-group">
                            <Form.Label>Additional Information</Form.Label>
                            <Form.Control onChange={this.handleChange} name="additionalInfo" value={this.state.additionalInfo} maxLength="750" as="textarea" rows={5} placeholder="enter additional information about your product" className="attendeeregistration-form-input" />
                            <Form.Text className="text-muted"> Maximum 750 charactors </Form.Text>
                        </Form.Group>

                        <Form.Label className="attendeeregistration-form-group" style={{marginTop: "20px", marginBottom: "10px", fontSize: "18px"}}>Attach Images</Form.Label>

                        <Row>
                            <Col>
                                <Form.Group className="attendeeregistration-form-group">
                                    <Form.File name="img1" label="Main Image" onChange={this.img1Change} style={{borderWidth:"1px", borderColor:"red"}} />
                                </Form.Group>
                                {this.state.img1Selected ?
                                <img style={{width:"250px", height:"168px", borderRadius:"10px", padding:"0px", margin:"10px", textAlign:"center" }} alt="card" src= {this.state.img1Url} />
                                : ''}
                            </Col>
                            <Col>
                                <Form.Group className="attendeeregistration-form-group">
                                    <Form.File name="img2" label="Second Image" onChange={this.img2Change} style={{borderWidth:"1px", borderColor:"red"}} />
                                </Form.Group>
                                {this.state.img2Selected ?
                                <img style={{width:"250px", height:"168px", borderRadius:"10px", padding:"0px", margin:"10px", textAlign:"center" }} alt="card" src= {this.state.img2Url} />
                                : ''}
                            </Col>
                            <Col>
                                <Form.Group className="attendeeregistration-form-group">
                                    <Form.File name="img3" label="Third Image" onChange={this.img3Change} style={{borderWidth:"1px", borderColor:"red"}} />
                                </Form.Group>
                                {this.state.img3Selected ?
                                <img style={{width:"250px", height:"168px", borderRadius:"10px", padding:"0px", margin:"10px", textAlign:"center" }} alt="card" src= {this.state.img3Url} />
                                : ''}
                            </Col>
                        </Row>

                        {!this.state.id && <Button onClick={this.addSparePart} variant="dark" className="attendeeregistration-button" >Submit</Button>}
                        {this.state.id && <Button onClick={this.updateSparePart} variant="dark" className="attendeeregistration-button" >Update</Button>}
                        {this.state.id && <Button onClick={this.deleteSparePart} variant="danger" className="delete-button" >Delete</Button>}
                        {this.state.error && <p className="attendeeregistration-error">{this.state.error}</p>}

                    </Form>
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
 
export default AddSparePart;