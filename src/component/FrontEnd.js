import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import SparePart from './SpareParts/SpareParts';
// import AddService from './VehicleService/ServiceRegistration/AddService';
import Services from './VehicleService/Services';

class FrontEnd extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/services" component={Services} />
            {/*<Route path="/addService" component={AddService} />*/}
            <Route path="/spareparts" component={SparePart} />
            <Route component={NotFoundError} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
 
export default FrontEnd;