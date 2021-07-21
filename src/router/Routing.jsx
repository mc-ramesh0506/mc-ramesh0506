import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AirlineStaffDashboard from '../modules/components/AirlineStaffDashboard';
import FlightServiceDashboard from '../modules/components/FlightServiceDashboard';
import FlightPassenegerContainer from '../modules/containers/FlightPassenegerContainer';
import GetFlightContainer from '../modules/containers/GetFlightContainer';
import HomePageContainer from '../modules/containers/HomePageContainer';
import LoginContainer from '../modules/containers/LoginContainer';
import ManageAncillaryServiceContainer from '../modules/containers/ManageAncillarySeviceContainer';
import PassengerDetailsContainer from '../modules/containers/PassengerDetailsContainer';


export default class Routing extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginContainer}></Route>
                    <Route path="/Home" component={HomePageContainer}></Route>
                    <Route path="/flight_dashboard" component={GetFlightContainer}></Route>
                    <Route path="/flight_details/:id" component={FlightPassenegerContainer}></Route>
                    <Route path="/flightService_Dashboard/:id" component={FlightServiceDashboard}></Route>
                    <Route path="/ancillaryService_Dashboard/:id" component={ManageAncillaryServiceContainer}></Route>
                    <Route path="/passenger_details/:id" component={PassengerDetailsContainer}></Route>
                    <Route path="/airlineStaff_Dashboard" component={AirlineStaffDashboard}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
