import { faFastBackward, faFastForward, faFilePdf, faSearch, faStepBackward, faStepForward, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Badge, Button, Card, Col, Container, Form, FormCheck, FormControl, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Authentication from '../../../authentication/Authentication';
import SparePartCard from '../SparePartCard/SparePartCard';
import './SellerSparePartsList.css'
import SellerSparePartsListDataService from './SellerSparePartsListDataService'

class SellerSparePartsList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      spares: [],

      currentPage: 1,
      entriesPerPage: 5,
      search: '',
      searchMessage: null,
      loading: false
    }

    this.refreshSpares = this.refreshSpares.bind(this);
  }

  refreshSpares() {
        let example = {
          title: this.state.search,
          category: this.state.category,
          email: Authentication.loggedUserId(),
          status: ""
      }

        SellerSparePartsListDataService.getSpares(example)
            .then(response => {
                this.setState({ spares: response.data })
            })
  }
  
  componentDidMount() {
        this.refreshSpares()
  }

  clicked = (id) => {
        return this.props.clicked(id);
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
        if (this.state.currentPage < Math.ceil(this.state.spares.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.spares.length / this.state.entriesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.spares.length / this.state.entriesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };
  
    handleChange = event =>{
        this.setState({
        [event.target.name] : event.target.value
        }, () => this.refreshSpares());
    };
    
    
  

  render() {
      const { currentPage, entriesPerPage, spares, search } = this.state;
      const lastIndex = currentPage * entriesPerPage;
      const firstIndex = lastIndex - entriesPerPage;
      const currentEntries = spares.slice(firstIndex, lastIndex);
      const totalPages = spares.length / entriesPerPage;

      const pageNumCss = {
            width: "45px",
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "white",
            borderColor: "black"
        }

        const searchBox = {
            width: "250px",
            fontWeight: "bold",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderColor: "#000"
        }
        return (
          <div>
                <Container>
                  <Card className={""} style={{ backgroundColor: "white", border: "none",  marginRight: "50px",  marginBottom: "30px" }}>
                        <Card.Header style={{ backgroundColor: "white", border: "none" }}>
                            <div style={{ float: "right" }}>
                                <InputGroup size="sm">
                                    <FontAwesomeIcon style={{ marginTop: "8px" }} icon={faSearch} />&nbsp; <FormControl onChange={this.handleChange} style={searchBox} autoComplete="off" placeholder="start typing..." name="search" value={this.state.search} className="" />&nbsp;
                                </InputGroup>
                            </div>
                    </Card.Header>
                    <Card.Body style={{ backgroundColor: "white", border: "none" }}>
                      {this.state.spares.length === 0 ? <p style={{textAlign: "center"}}>No Results Found</p>
                        :
                        currentEntries.map((spare) => (
                          <SparePartCard id={spare.id} img={spare.img1} title={spare.title} price={spare.price} location={spare.location} date={spare.date} clicked={this.clicked} />
                        ))
                        }
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
        );
    }
}
 
export default SellerSparePartsList;