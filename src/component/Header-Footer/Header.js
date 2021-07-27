import React, { Component } from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../asset/logo.png'
import Authentication from '../../authentication/Authentication';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar style={{backgroundColor: "black", padding: "20px"}} variant="dark">
                    {/* <Container> */}
                    <Image width="40px" height="40px" style={{backgroundColor: "white", marginRight: "15px"}} src={logo} rounded />
                    <Navbar.Brand href="#home" style={{fontWeight: 600, fontSize: "25px"}}>AUTO TRADER</Navbar.Brand>
                    <Nav className="me-auto">
                    <NavLink className="nav-link header-item" to="/">Home</NavLink>
                    <NavLink className="nav-link header-item" to="/vehicles">Vehicles</NavLink>
                    <NavLink className="nav-link header-item" to="/spareparts">Spare Parts</NavLink>
                    <NavLink className="nav-link header-item" to="/services">Services</NavLink>
                    <NavLink className="nav-link header-item" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="nav-link header-item" to="/admin">Admin</NavLink>
                    <NavLink className="nav-link header-item" to="/login">Login</NavLink>
                    <NavLink className="nav-link header-item" to="/register">Join</NavLink>
                    <NavLink className="nav-link header-item" onClick={() => Authentication.logout()} to="#">Logout</NavLink>
                    </Nav>
                    {/* </Container> */}
                </Navbar>
            </div>
         );
    }
}
 
export default Header;