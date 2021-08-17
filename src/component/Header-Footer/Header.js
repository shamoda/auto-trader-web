import React, { Component } from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
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
                        {Authentication.loggedAsSeller() && <NavLink className="nav-link header-item" to="/seller">{ Authentication.loggedUserName() }</NavLink>}
                    {Authentication.loggedAsAdmin() && <NavLink className="nav-link header-item" to="/admin">{ Authentication.loggedUserName() }</NavLink>}
                    {!Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" to="/login">Login</NavLink>}
                    {!Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" to="/registration">Join</NavLink>}
                    {Authentication.isUserLoggedIn() && <NavLink className="nav-link header-item" onClick={() => Authentication.logout()} to="/">Logout</NavLink>}
                    </Nav>
                    {/* </Container> */}
                </Navbar>
            </div>
         );
    }
}
 
export default withRouter(Header);