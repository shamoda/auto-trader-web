import React, { Component } from 'react'
import { Button, Form, Col, Row, Container, Table, Card, InputGroup, FormControl, Modal, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faDownload, faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward, faTrash, faUserGraduate, faUserMd, faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { faResearchgate, faPatreon } from '@fortawesome/free-brands-svg-icons';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment'
import RevenueDataService from './RevenueDataService';


export default class Revenue extends Component {


  constructor(props) {
    super(props);
    this.state = {
      revenue: null,
      expense: null,
      date: null,
      records: [],

      error: '',
      loading: '',
      currentPage: 1,
      entriesPerPage: 5,
      search: '',
      searchMessage: null,
      loading: false
    }
    this.refreshRecords = this.refreshRecords.bind(this);
    this.revenueDetails = this.revenueDetails.bind(this);
    this.displayError = this.displayError.bind(this);
    this.generateReport = this.generateReport.bind(this);
  }

  componentDidMount() {
    this.refreshRecords()
  }

  refreshRecords() {
    RevenueDataService.getRevenue()
      .then(res => {
        this.setState({ records: res.data })
      })
  }


  generateReport() {
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Revenue Report: " + moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const headers = [["ID", "Date", "Revenue", "Expenses", "Profit"]];

        const records = this.state.records.map(
            item => [
                item.id,
                item.date,
                "Rs." + item.revenue,
                "Rs." + item.expense,
                "Rs."+item.profit,
                // moment(item.date).format('YYYY-MM-DD'),
                // item.status,
                // item.seller,
                // item.contact,
                // item.email
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: records
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Revenue-Report "+moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+".pdf")
    }



  deleteRecord(id) {
    RevenueDataService.deleteRevenue(id)
      .then(res => {
        swal({
            title: "Record Deleted Successfully",
            icon: "error",
            button: "Ok",
        })
        this.refreshRecords()
      })
  }


  revenueDetails() {

    if (this.state.revenue === null) {
      this.displayError('Revenue cannot be empty')
    } else if (this.state.expense === null) {
      this.displayError('Expenses cannot be empty')
    } else if (this.state.date === null) {
      this.displayError('Date cannot be empty')
    } else {
      this.setState({ loading: true })

      let formData = new FormData();
      formData.append('revenue', this.state.revenue);
      formData.append('expense', this.state.expense);
      formData.append('date', this.state.date);

      RevenueDataService.addRevenue(formData)
        .then(response => {
          this.setState({ loading: false, expense: '', revenue: '', date: '' })
          swal({
            title: "Record added Successfully",
            icon: "success",
            button: "Ok",
          })
          this.refreshRecords()
          // this.setState({expense: null, revenue: null, date: null})
        })
        .catch(error => {
          this.setState({ loading: false, expense: '', revenue: '', date: '' })
          swal({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error",
            button: "Ok",
          })
        })
    }
  };

  displayError(txt) {
      swal({
            title: txt,
            icon: "warning",
            button: "Ok",
          })
  }

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  lastPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.records.length / this.state.entriesPerPage)) {
      this.setState({
        currentPage: Math.ceil(this.state.records.length / this.state.entriesPerPage)
      });
    }
  };

  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.records.length / this.state.entriesPerPage)) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.refreshRecords());

  };

  render() {

    const { currentPage, entriesPerPage, records, search } = this.state;
    const lastIndex = currentPage * entriesPerPage;
    const firstIndex = lastIndex - entriesPerPage;
    const currentEntries = records.slice(firstIndex, lastIndex);
    const totalPages = records.length / entriesPerPage;

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
                        {/* <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faFilePdf} />&nbsp; <a href="#" style={{ padding: "0px", margin: "0px", textDecoration: "none", color: "black" }}>Get Revenue Report</a> */}
                        <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faFilePdf} />&nbsp; <span onClick={this.generateReport} className="report">Get Revenue Report</span>
                      </Col>
                      {/* <Col>
                        <InputGroup size="sm">
                          <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                        </InputGroup>
                      </Col> */}
                    </InputGroup>
                  </Row>
                </div>

                 <Form autoComplete="off" > 
                <Row>
                  <Col>
                    <Form.Group controlId="revenue">
                      <Form.Control onChange={this.handleChange} name="revenue" value={this.state.revenue} type="number" placeholder="Enter Revenue" className="revenue-form-input" />
                    </Form.Group>
                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="expenses" className="revenue-form-group">
                      <Form.Control onChange={this.handleChange} name="expense" value={this.state.expense} type="number" placeholder="Enter Expenses" className="revenue-form-input" />
                    </Form.Group>
                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="month" className="revenue-form-group">
                      <Form.Control onChange={this.handleChange} name="date" value={this.state.date} type="date" placeholder="Date" className="revenue-form-input" />
                    </Form.Group>

                  </Col>
                  <Col className="revenue-from-row">
                    <Form.Group controlId="month" className="revenue-form-group">
                      <Button onClick={this.revenueDetails} className="revenueDetails-button" variant="success">Submit</Button>
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

                  {this.state.records.length === 0 ? <p style={{ textAlign: "center" }}>No Results Found</p> :
                    currentEntries.map((record) => (
                      <tr >
                      <td style={{ padding: '30px' }}>
                          <h5>Date: { record.date }</h5>
                          <p style={{ padding: "0px", margin: "0px" }}>Revenue: RS { record.revenue }</p>
                          <p style={{ padding: "0px", margin: "0px" }}>Expenses: RS { record.expense }</p>
                      </td>

                      <td style={{ padding: "25px" }}>
                        <p style={{ padding: "0px", marginRight: "0px" }}>Profit: RS { record.profit }</p>
                      </td>
                      <td style={{ width: "15%", textAlign: "center", padding: "30px 0px" }}><Button onClick={() => this.deleteRecord(record.id)} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button></td>

                      </tr>
                    ))  
                }

                  {/* )) }*/}
                </tbody>
              </Table>
              
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "white", color: "black", border: "none" }}>
                            <div style={{ float: "left" }}>
                                Showing Page {currentPage} of {Math.ceil(totalPages)}
                            </div>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className="" name="currentPage" value={currentPage} disabled />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                                            Next <FontAwesomeIcon icon={faStepForward} />
                                        </Button>
                                        <Button type="button" variant="outline-dark" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
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
