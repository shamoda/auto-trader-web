import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Admin from './Admin/Admin';
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFoundError from './NotFoundError/NotFoundError';
import Seller from './Seller/Seller';
import UserRegistration from './UserRegistration/UserRegistration';
import AddSparePart from './SpareParts/AddSparePart/AddSparePart';
import SellerSparePartsList from './SpareParts/SellerSparePartsList/SellerSparePartsList';
import DetailedView from './SpareParts/DetailedView/DetailedView';
import SparePartCard from './SpareParts/SparePartCard/SparePartCard';
import AddService from './VehicleService/ServiceRegistration/AddService';
import SparePart from './SpareParts/SpareParts';
import MyAccount from './MyAccount/MyAccount';
import AddVehicle from './Vehicles/Vehicle/AddVehicle';
import Vehicle from './Vehicles/ViewVehicle/ViewVehicles';
import VehicleDetailedView from './Vehicles/ViewVehicle/ViewSingleVehicle';
import HomeSpare from './Home/HomeSpare/HomeSpare';
import ManageUsers from './ManageUsers/ManageUsers';
import Revenue from './Revenue/Revenue';
import ChangePassword from './ChangePassword/ChangePassword';
import VehicleServicesList from './VehicleService/GeneralList/VehicleServicesList';
import ServiceDetailCard from './VehicleService/ServiceCard/ServiceDetailCard';
import ServiceDetail from './VehicleService/DetailedView/ServiceDetails';

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
            {/* <Route path="/services/:id" component={ServiceDetail} /> */}
            <Route path="/services/:id" component={ServiceDetail} />
            <Route path="/services" component={VehicleServicesList} />
            <Route path="/addService/:id" component={AddService} />
            <Route path="/addService" component={AddService} />
            <Route path="/spareparts" component={SparePart} />
            <Route path="/addspare/:id" component={AddSparePart} />
            <Route path="/addspare" component={AddSparePart} />
            <Route path="/sparepart/:id" component={DetailedView} />
            <Route path="/admin" component={Admin} />
            <Route path="/seller" component={Seller} />
            <Route path="/registration" component={UserRegistration} />
            <Route path="/account" component={MyAccount} />
            <Route path="/addvehicle/:id" component={AddVehicle} />
            <Route path="/addvehicle" component={AddVehicle} />
            <Route path="/vehicles" component={Vehicle} />
            <Route path="/vehicle/:id" component={VehicleDetailedView} />
            <Route path="/account" component={MyAccount} />
            <Route path="/revenue" component={Revenue} />
            <Route path="/usermanage" component={ManageUsers} />
            <Route path="/test" component={HomeSpare} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route component={NotFoundError} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default FrontEnd;
