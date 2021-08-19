import React, { Component } from 'react'
import { Button, Form, Col, Row, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faDownload, faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward, faTrash, faUserGraduate, faUserMd, faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { faResearchgate, faPatreon } from '@fortawesome/free-brands-svg-icons';
import swal from 'sweetalert';
import RevenueDataService from './RevenueDataService';


export default class Revenue extends Component {


  constructor(props) {
    super(props);
    this.state = {
      revenue: '',
      expenses: '',
      month: '',
      error: '',
      loading: '',
      currentPage: 1,
      entriesPerPage: 5,
      search: '',
      searchMessage: null,
      loading: false
    }
    //this.refreshRevenueDetails = this.refreshRevenueDetails.bind(this);
    this.revenueDetails = this.revenueDetails.bind(this);
    //this.displayError = this.displayError.bind(this);
  }


  revenueDetails(event) {
    event.preventDefault();

    if (this.state.revenue === '') {
      this.displayError('Revenue cannot be empty')
    } else if (this.state.expenses === '') {
      this.displayError('Expenses cannot be empty')
    } else if (this.state.month === '') {
      this.displayError('Month cannot be empty')
    } else {
      this.setState({ loading: true })

      let formData = new FormData();
      formData.append('revenue', this.state.revenue);
      formData.append('expenses', this.state.expenses);
      formData.append('month', this.state.month);

      RevenueDataService.revenueDetails(formData)
        .then(response => {
          this.setState({ loading: false })
          swal({
            title: "Revenue Details added Successful!",
            text: "Monthly revenue details added successfully",
            icon: "success",
            button: "Ok",
          })
        })
        .catch(error => {
          this.setState({ loading: false })
          swal({
            title: "Oops!",
            text: "Seems your email address is already exists. Please try again.",
            icon: "error",
            button: "Ok",
          })
        })
    }
  };

  // firstPage = () => {
  //   if (this.state.currentPage > 1) {
  //     this.setState({
  //       currentPage: 1
  //     });
  //   }
  // };

  // prevPage = () => {
  //   if (this.state.currentPage > 1) {
  //     this.setState({
  //       currentPage: this.state.currentPage - 1
  //     });
  //   }
  // };

  // lastPage = () => {
  //   if (this.state.currentPage < Math.ceil(this.state.spares.length / this.state.entriesPerPage)) {
  //     this.setState({
  //       currentPage: Math.ceil(this.state.spares.length / this.state.entriesPerPage)
  //     });
  //   }
  // };

  // nextPage = () => {
  //   if (this.state.currentPage < Math.ceil(this.state.spares.length / this.state.entriesPerPage)) {
  //     this.setState({
  //       currentPage: this.state.currentPage + 1
  //     });
  //   }
  // };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.refreshRevenueDetails());

  };

  render() {

    // const { currentPage, entriesPerPage, spares, search } = this.state;
    // const lastIndex = currentPage * entriesPerPage;
    // const firstIndex = lastIndex - entriesPerPage;
    // const currentEntries = spares.slice(firstIndex, lastIndex);
    // const totalPages = spares.length / entriesPerPage;

    const pageNumCss = {
      width: "45px",
      color: "black",
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: "white",
      borderColor: "black"
    }

    const searchBox = {
      width: "200px",
      fontWeight: "bold",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderColor: "#000"
    }
    return (
      <div>
        <Container>
          <Card className={""} style={{ backgroundColor: "white", border: "none", marginRight: "50px", marginBottom: "30px" }}>
            <Card.Header style={{ backgroundColor: "white", border: "none" }}>
              <div style={{ marginLeft: "25px" }} >
                <div style={{ marginBottom: "40px"}}>
                  <Row >
                    <InputGroup size="sm">
                      <Col>
                        <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faFilePdf} />&nbsp; <a href="#" style={{ padding: "0px", margin: "0px", textDecoration: "none", color: "black" }}>Get Revenue Report</a>
                      </Col>
                      <Col>
                        <InputGroup size="sm">
                          <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                        </InputGroup>
                      </Col>
                    </InputGroup>
                  </Row>
                </div>

                 <Form autoComplete="off" onSubmit={this.revenueDetails} > 
                <Row>
                  <Col>
                    <Form.Group controlId="revenue">
                      <Form.Control onChange={this.handleChange} name="revenue" value={this.state.revenue} type="number" placeholder="Enter Revenue" className="revenue-form-input" />
                    </Form.Group>
                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="expenses" className="revenue-form-group">
                      <Form.Control onChange={this.handleChange} name="expenses" value={this.state.expenses} type="number" placeholder="Enter Expenses" className="revenue-form-input" />
                    </Form.Group>
                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="month" className="revenue-form-group">
                      <Form.Control onChange={this.handleChange} name="contact" value={this.state.month} type="date" placeholder="Month" className="revenue-form-input" />
                    </Form.Group>

                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="month" className="revenue-form-group">
                      <Button type="submit" className="revenueDetails-button" variant="success">Submit</Button>
                      {this.state.error && <p className="revenueDetails-error">{this.state.error}</p>}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              </div>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "white", border: "none" }}>
              {/* {this.state.spares.length === 0 ? <p style={{ textAlign: "center" }}>No Results Found</p>
                :
                currentEntries.map((spare) => (
                  <SparePartCard id={spare.id} img={spare.img1} title={spare.title} price={spare.price} location={spare.location} date={spare.date} clicked={this.clicked} />
                ))
              } */}
              <Table hover style={{ backgroundColor: "white" }} variant="">
                <tbody>
                  {/* {console.log(users)}
                  {this.state.users.length == 0 ? <tr align="center">
                    <td colSpan="2" >No Records Found</td>
                  </tr> : */}
                  {/* currentEntries.map((user) => ( */}

                  <tr >
                    <td style={{ padding: '30px' }}>
                      <h5>Date: 2021/04/09</h5>
                      <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS 250000</p>
                      <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS 175000</p>
                    </td>

                    <td style={{ padding: "25px" }}>
                      <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS 75000</p>
                    </td>
                    <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                  </tr>


                  <tr >
                    <td style={{ padding: '30px' }}>
                      <h5>Date: 2021/03/06</h5>
                      <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS 250000</p>
                      <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS 175000</p>
                    </td>

                    <td style={{ padding: "25px" }}>
                      <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS 75000</p>
                    </td>
                    <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                  </tr>

                  <tr >
                    <td style={{ padding: '30px' }}>
                      <h5>Date: 2021/01/08</h5>
                      <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS 250000</p>
                      <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS 175000</p>
                    </td>

                    <td style={{ padding: "25px" }}>
                      <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS 75000</p>
                    </td>
                    <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                  </tr>
                  <tr >
                    <td style={{ padding: '30px' }}>
                      <h5>Date: 2021/01/08</h5>
                      <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS 250000</p>
                      <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS 175000</p>
                    </td>

                    <td style={{ padding: "25px" }}>
                      <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS 75000</p>
                    </td>
                    <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                  </tr>
                  <tr >
                    <td style={{ padding: '30px' }}>
                      <h5>Date: 2021/01/08</h5>
                      <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS 250000</p>
                      <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS 175000</p>
                    </td>

                    <td style={{ padding: "25px" }}>
                      <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS 75000</p>
                    </td>
                    <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                  </tr>
                  {/* )) }*/}
                </tbody>
              </Table>
              
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "white", color: "black", border: "none" }}>
              <div style={{ float: "left" }}>
                Showing Page 1 of 1
                {/* Showing Page {currentPage} of {Math.ceil(totalPages)} */}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button type="button" variant="outline-dark"  >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button type="button" variant="outline-dark"  >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl style={pageNumCss} className="" name="currentPage" disabled />
                  <InputGroup.Append>
                    <Button type="button" variant="outline-dark"  onClick={this.nextPage}>
                      Next <FontAwesomeIcon icon={faStepForward} />
                    </Button>
                    <Button type="button" variant="outline-dark"  >
                      Last <FontAwesomeIcon icon={faFastForward} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    )
  }
}
