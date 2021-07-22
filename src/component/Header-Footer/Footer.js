import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css'

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="footer-container">
                <Container>
                    &copy; 2021 Sri Lanka Institute of Information Technology, developed by FictionApps 2.0. All Rights Reserved.
                </Container>
            </div>
         );
    }
}
 
export default Footer;