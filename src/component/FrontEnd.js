import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import UserRegistration from './UserRegistration/UserRegistration';
import MyAccount from './MyAccount/MyAccount';
import ManageUsers from './ManageUsers/ManageUsers';
import Revenue from './Revenue/Revenue';

class FrontEnd extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Router>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        
                        {/* <Route path="/test" component={YourComponent} /> */}
                        <Route path="/account" component={MyAccount}/>
                        <Route path="/usermanage" component={ManageUsers} />
                        <Route path="/revenue" component={Revenue}/>
                        <Route path="/registration" component={UserRegistration}/>
                        
                        <Route component={NotFoundError} />
                    </Switch>
                    <Footer/>
                </Router>
            </div>
         );
    }
}
 
export default FrontEnd;