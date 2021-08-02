import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import AddSparePart from './SpareParts/AddSparePart/AddSparePart';
import SparePartCard from './SpareParts/SparePartCard/SparePartCard';
import ServiceDetail from './VehicleService/ServiceDetail';
import AddService from './VehicleService/ServiceRegistration/AddService';
import SparePart from './SpareParts/SpareParts';
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
            <Route path="/services/:id" component={ServiceDetail} />
            <Route path="/services" component={Services} />
            <Route path="/addService" component={AddService} />
            <Route path="/spareparts" component={SparePart} />
            <Route path="/test" component={AddSparePart} />
            <Route component={NotFoundError} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
 
export default FrontEnd;