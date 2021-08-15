import { faCar, faCarBattery, faCogs, faUserCog, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { Pie, Doughnut } from 'react-chartjs-2'
import AnalyticsDataService from './AnalyticsDataService'

class Analytics extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            vehicles : '',
            spareParts : '',
            services : ''
        }

        this.refreshAnalytics = this.refreshAnalytics.bind(this);
    }

    refreshAnalytics() {
        AnalyticsDataService.getAnalytics()
            .then(res => {
                this.setState({
                    vehicles : res.data.vehicles,
                    spareParts : res.data.spareParts,
                    services : res.data.services
                }, () => console.log(this.state))
            })
    }

    componentDidMount() {
        this.refreshAnalytics()
    }

    render() { 
        return ( 
            <div>
                <Container style={{marginTop: "40px"}}>
                    <Row>
                        <Col>
                            <Jumbotron style={{paddingTop: "20px", paddingBottom: "20px", borderRadius: "10px", marginTop: "40px", marginBottom: "40px"}} fluid>
                                <Container>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}><FontAwesomeIcon style={{marginTop: "8px"}} icon={faCar} /> Vehicles</Col><Col style={{textAlign: "center"}}>{this.state.vehicles}</Col></Row>
                                    </Card>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}><FontAwesomeIcon style={{marginTop: "8px"}} icon={faCarBattery} /> Spare Parts</Col><Col style={{textAlign: "center"}}>{this.state.spareParts}</Col></Row>
                                    </Card>
                                    <Card body style={{margin: "5px"}}>
                                        <Row><Col style={{fontWeight: "600"}}><FontAwesomeIcon style={{marginTop: "8px"}} icon={faCogs} /> Services</Col><Col style={{textAlign: "center"}}>{this.state.services}</Col></Row>
                                    </Card>
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col>
                            <Doughnut
                                data={{
                                labels: ['Vehicles', 'Spares', 'Services'],
                                datasets: [
                                    {
                                    label: '# of participants',
                                    data: [this.state.vehicles, this.state.spareParts, this.state.services],
                                    backgroundColor: [
                                        'rgba(128, 255, 138, 0.8)',
                                        'rgba(255, 146, 138, 0.8)',
                                        'rgba(173, 146, 255, 0.8)',
                                    ],
                                    borderWidth: 1,
                                    }
                                ],
                                }}
                                height={300}
                                width={300}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                        fontSize: 25,
                                        },
                                    },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
         );
    }
}
 
export default Analytics;