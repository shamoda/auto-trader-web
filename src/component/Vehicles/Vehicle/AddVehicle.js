import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import Authentication from '../../../authentication/Authentication';
import AddVehicleDataService from "./AddVehicleDataService";
import './AddVehicle.css';

class AddVehicle extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            seller: Authentication.loggedUserName(),
            contact: Authentication.loggedUserContact(),
            email: Authentication.loggedUserId(),
            location: Authentication.loggedUserLocation(),
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

            img4: null,
            img4Url: null,
            img4Name: null,
            img4Selected: false,

            error: null,
            loading: false
        }

        this.addVehicle = this.addVehicle.bind(this);
        this.updateVehicle = this.updateVehicle.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.img1Change = this.img1Change.bind(this);
        this.img2Change = this.img2Change.bind(this);
        this.img3Change = this.img3Change.bind(this);
        this.img4Change = this.img4Change.bind(this);
    }

    componentDidMount() {
        if (this.state.id != null) {
            AddVehicleDataService.getVehicle(this.state.id)
                .then(res => {
                    this.setState({
                        id: res.data.id,
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
                        img1Url: "https://auto-trader-vehicle.s3.amazonaws.com/"+res.data.img1,
                        img2Url: "https://auto-trader-vehicle.s3.amazonaws.com/"+res.data.img2,
                        img3Url: "https://auto-trader-vehicle.s3.amazonaws.com/"+res.data.img3,
                        img4Url: "https://auto-trader-vehicle.s3.amazonaws.com/"+res.data.img4
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
                        if (res.data.img4 != null) {
                            this.setState({
                                img4Selected: true
                            })
                        }
                    })
                })
        }
    }

    addVehicle(event) {
        event.preventDefault();

        if (this.state.seller === '') {
            this.displayError('Name Field Cannot Be Empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact Number Cannot Be Empty')
        } else if (this.state.location === '') {
            this.displayError('Location Cannot Be Empty')
        } else if (this.state.model === '') {
            this.displayError('Vehicle Model Cannot Be Empty')
        } else if (this.state.transmission === '') {
            this.displayError('Vehicle Transmission Cannot Be Empty')
        } else if (this.state.year === '') {
            this.displayError('Year Cannot Be Empty')
        } else if (this.state.price === '') {
            this.displayError('Price Cannot Be Empty')
        } else if (this.state.manufacturer === '') {
            this.displayError('Manufacturer Cannot Be Empty')
        } else if (this.state.condition === '') {
            this.displayError('Condition Cannot Be Empty')
        } else if (this.state.engineCC === '') {
            this.displayError('EngineCC Cannot Be Empty')
        } else if (this.state.type === '') {
            this.displayError('Type Cannot Be Empty')
        } else if (this.state.category === '') {
            this.displayError('Category Cannot Be Empty')
        }  else if (this.state.img1 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img2 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img3 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img4 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        } else {
            this.setState({ loading: true })

            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('seller', this.state.seller);
            formData.append('location', this.state.location);
            formData.append('model', this.state.model);
            formData.append('transmission', this.state.transmission);
            formData.append('year', this.state.year);
            formData.append('manufacturer', this.state.manufacturer);
            formData.append('engineCC', this.state.engineCC);
            formData.append('fuelType', this.state.fuelType);
            formData.append('price', this.state.price);
            formData.append('condition', this.state.condition);
            formData.append('category', this.state.category);
            formData.append('moreInfo', this.state.moreInfo);
            formData.append('img1', this.state.img1);
            formData.append('img2', this.state.img2);
            formData.append('img3', this.state.img3);
            formData.append('img4', this.state.img4);

            AddVehicleDataService.addVehicle(formData)
                .then(res => {
                    this.setState({ loading: false })
                    swal({
                        title: "Vehicle Added Successfully!",
                        text: "Your listing is under review. You will be notified soon...",
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

    updateVehicle(event) {
        event.preventDefault();

        if (this.state.seller === '') {
            this.displayError('Name Field Cannot Be Empty')
        } else if (this.state.contact === '') {
            this.displayError('Contact Number Cannot Be Empty')
        } else if (this.state.location === '') {
            this.displayError('Location Cannot Be Empty')
        } else if (this.state.model === '') {
            this.displayError('Vehicle Model Cannot Be Empty')
        } else if (this.state.transmission === '') {
            this.displayError('Vehicle Transmission Cannot Be Empty')
        } else if (this.state.year === '') {
            this.displayError('Year Cannot Be Empty')
        } else if (this.state.price === '') {
            this.displayError('Price Cannot Be Empty')
        } else if (this.state.manufacturer === '') {
            this.displayError('Manufacturer Cannot Be Empty')
        } else if (this.state.condition === '') {
            this.displayError('Condition Cannot Be Empty')
        } else if (this.state.engineCC === '') {
            this.displayError('EngineCC Cannot Be Empty')
        } else if (this.state.type === '') {
            this.displayError('Type Cannot Be Empty')
        } else if (this.state.category === '') {
            this.displayError('Category Cannot Be Empty')
        }  else if (this.state.img1 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img2 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img3 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        }  else if (this.state.img4 == null) {
            this.displayError('Images Of Vehicles Should Be Added!')
        } else {
            this.setState({ loading: true })

            let formData = new FormData();
            formData.append('id', this.state.id);
            formData.append('email', this.state.email);
            formData.append('contact', this.state.contact);
            formData.append('seller', this.state.seller);
            formData.append('location', this.state.location);
            formData.append('date', this.state.date);
            formData.append('model', this.state.model);
            formData.append('transmission', this.state.transmission);
            formData.append('year', this.state.year);
            formData.append('manufacturer', this.state.manufacturer);
            formData.append('engineCC', this.state.engineCC);
            formData.append('fuelType', this.state.fuelType);
            formData.append('price', this.state.price);
            formData.append('condition', this.state.condition);
            formData.append('category', this.state.category);
            formData.append('moreInfo', this.state.moreInfo);
            formData.append('img1', this.state.img1);
            formData.append('img2', this.state.img2);
            formData.append('img3', this.state.img3);
            formData.append('img4', this.state.img4);

            AddVehicleDataService.updateVehicle(formData)
                .then(res => {
                    this.setState({ loading: false })
                    swal({
                        title: "Vehicle Details Updated Successfully!",
                        text: "Your listing is under review. You will be notified soon...",
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

    deleteVehicle() {
        swal({
            title: "Are You Sure, Delete?",
            text: this.state.title,
            icon: "warning",
            buttons: true
        }).then((result) => {
            if ((result)) {
                this.setState({loading: true})
                AddVehicleDataService.deleteVehicle(this.state.id)
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
            }, () => console.log('First Image'));
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
            }, () => console.log('Second Image'));
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
            }, () => console.log('Third Image'));
        }
    }

    img4Change(event) {
        if (event.target.files.length) {
            this.setState({
                img4: event.target.files[0],
                img4Url: URL.createObjectURL(event.target.files[0]),
                img4Name: event.target.files[0].name,
                img4Selected: true,
                error: null
            }, () => console.log('Fourth Image'));
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

                    <Form autoComplete="off" onSubmit={this.addVehicle}>

                        <div style={{ fontWeight: 600, fontSize: "25px", marginBottom: "20px"}}>Vehicle Details</div>

                        <Form.Group controlId="model" className="attendeeregistration-form-group">
                            <Form.Label>Model</Form.Label>
                            <Form.Control onChange={this.handleChange} name="model" value={this.state.model} type="text" placeholder="Enter The Model" className="paperregistration-form-input" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="category" className="attendeeregistration-form-group">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="category" value={this.state.category} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- Select -</option>
                                        <option>Car</option>
                                        <option>SUV</option>
                                        <option>Van</option>
                                        <option>Truck</option>
                                        <option>Lorry</option>
                                        <option>Motorcycle</option>
                                        <option>Three Wheel</option>
                                        <option>Tractor</option>
                                        <option>Wagon</option>
                                        <option>Heavy-Duty</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="fuelType" className="attendeeregistration-form-group">
                                    <Form.Label>Fuel Type</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="fuelType" value={this.state.fuelType} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- Select -</option>
                                        <option>Petrol</option>
                                        <option>Diesel</option>
                                        <option>Electric</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId="condition" className="attendeeregistration-form-group">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="condition" value={this.state.condition} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- Select -</option>
                                        <option>Brand New</option>
                                        <option>Re-Conditioned</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="transmission" className="attendeeregistration-form-group">
                                    <Form.Label>Transmission</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="transmission" value={this.state.transmission} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- Select -</option>
                                        <option>Auto</option>
                                        <option>Manual</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                        <Col>
                            <Form.Group controlId="price" className="attendeeregistration-form-group">
                                <Form.Label>Price (Rs)</Form.Label>
                                <Form.Control onChange={this.handleChange} name="price" value={this.state.price} type="number" placeholder="Enter The Price Of Vehicle" className="paperregistration-form-input" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="year" className="attendeeregistration-form-group">
                                <Form.Label>Year</Form.Label>
                                <Form.Control onChange={this.handleChange} name="year" value={this.state.year} type="text" as="select" className="paperregistration-form-input" >
                                    <option value="">- Select -</option>
                                    <option>2000</option>
                                    <option>2001</option>
                                    <option>2002</option>
                                    <option>2003</option>
                                    <option>2004</option>
                                    <option>2005</option>
                                    <option>2006</option>
                                    <option>2007</option>
                                    <option>2008</option>
                                    <option>2009</option>
                                    <option>2010</option>
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="manufacturer" className="attendeeregistration-form-group">
                                    <Form.Label>Manufacturer</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="manufacturer" value={this.state.manufacturer} type="text" placeholder="Enter The Manufacturer Of Vehicle" className="attendeeregistration-form-input"  />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="engineCC" className="attendeeregistration-form-group">
                                    <Form.Label>EngineCC</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="engineCC" value={this.state.engineCC} type="number" placeholder="Enter The Engine Capacity Of Vehicle" className="attendeeregistration-form-input" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="moreInfo" className="attendeeregistration-form-group">
                            <Form.Label>Additional Information About Vehicle</Form.Label>
                            <Form.Control onChange={this.handleChange} name="moreInfo" value={this.state.moreInfo} as="textarea" rows={5} placeholder="Enter Additional Information Here..." className="attendeeregistration-form-input" />
                        </Form.Group>

                        <Form.Label className="attendeeregistration-form-group" style={{marginTop: "20px", marginBottom: "10px", fontSize: "18px"}}>Attach Images Of Vehicle</Form.Label>

                        <Row>
                            <Col>
                                <Form.Group className="attendeeregistration-form-group">
                                    <Form.File name="img1" label="First Image" onChange={this.img1Change} style={{borderWidth:"1px", borderColor:"red"}} />
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
                            <Col>
                                <Form.Group className="attendeeregistration-form-group">
                                    <Form.File name="img4" label="Fourth Image" onChange={this.img4Change} style={{borderWidth:"1px", borderColor:"red"}} />
                                </Form.Group>
                                {this.state.img4Selected ?
                                    <img style={{width:"250px", height:"168px", borderRadius:"10px", padding:"0px", margin:"10px", textAlign:"center" }} alt="card" src= {this.state.img4Url} />
                                    : ''}
                            </Col>
                        </Row>

                        <div style={{ fontWeight: 600, fontSize: "25px", marginBottom: "20px", marginTop: "50px"  }}>Vehicle Owner Or Seller Contact Details</div>

                        <Form.Group controlId="seller" className="attendeeregistration-form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="seller" value={this.state.seller} type="text" placeholder="Your Name Here" className="paperregistration-form-input" />
                            <Form.Text className="text-muted"> Name of the contact person </Form.Text>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="contact" className="attendeeregistration-form-group">
                                    <Form.Label>Your Contact Number</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="contact" value={this.state.contact} type="number" placeholder="Contact Number" className="paperregistration-form-input" />
                                    <Form.Text className="text-muted"> Number of the contact person </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="location" className="attendeeregistration-form-group">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="location" value={this.state.location} type="text" as="select" className="paperregistration-form-input" >
                                        <option value="">- select -</option>
                                        <option>Colombo</option>
                                        <option>Gampaha</option>
                                        <option>Kalutara</option>
                                        <option>Dehiwala</option>
                                        <option>Anuradapura</option>
                                        <option>Hambanthota</option>
                                        <option>Ratnapura</option>
                                        <option>Jaffna</option>
                                        <option>Kandy</option>
                                        <option>Kegalle</option>
                                        <option>Galle</option>
                                        <option>Matara</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted"> Item location </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        {!this.state.id && <Button onClick={this.addVehicle} variant="dark" className="attendeeregistration-button" >Submit</Button>}
                        {this.state.id && <Button onClick={this.updateVehicle} variant="dark" className="attendeeregistration-button" >Update</Button>}
                        {this.state.id && <Button onClick={this.deleteVehicle} variant="danger" className="delete-button" >Delete</Button>}
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

export default AddVehicle;
