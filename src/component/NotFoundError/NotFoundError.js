import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import notfound from '../../asset/notfound.png';
import './NotFoundError.css'

class NotFoundError extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="NotFoundError-main">
                <div className="NotFoundError-img">
                    <Image className="NotFoundError-image" src={notfound} fluid />
                </div>
                <div className="NotFoundError-title">Oops !!!</div>
                <div className="NotFoundError-sub">Page Not Found !</div>

                <NavLink style={{textDecoration: "none"}} to="/"><FontAwesomeIcon icon={faHome} />&nbsp; Visit Home</NavLink>
            </div>
         );
    }
}
 
export default NotFoundError;