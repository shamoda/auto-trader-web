import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import UserRegistration from './UserRegistration/UserRegistration';
import UserRegistrationDataService from './UserRegistration/UserRegistrationDataService';

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