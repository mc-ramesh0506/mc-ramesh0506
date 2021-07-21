import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default class RedirectPage extends React.Component {

    render() {

        if (this.props.redirectTo == null) {
            return <Redirect to='/' />

        } else {

            if (this.props.redirectTo === 'admin' || this.props.redirectTo === 'airlineStaff'
                || this.props.redirectTo === 'Login with Google') {

                return <Redirect to='/home' />
            }
        }
        if (this.props.redirectTo === 'flight_dashboard') {
            return <Redirect to='/flight_dashboard' />
        }
        if (this.props.redirectTo === 'airlineStaff_Dashboard') {
            return <Redirect to='/airlineStaff_Dashboard' />
        }
        if (this.props.redirectTo === 'flight_details') {
            let url = '/flight_details/' + this.props.id
            return <Redirect to={url} />
        }

        if (this.props.redirectTo === 'flightService_Dashboard') {
            let url = '/flightService_Dashboard/' + this.props.id
            return <Redirect to={url} />
        }
        if (this.props.redirectTo === 'ancillaryService_Dashboard') {
            let url = '/ancillaryService_Dashboard/' + this.props.id
            return <Redirect to={url} />
        }

        if (this.props.redirectTo === 'paxDetails') {
            let url = '/passenger_details/' + this.props.id
            return <Redirect to={url} />
        }

    }

}

RedirectPage.propTypes = {
    redirectTo: PropTypes.string,
    id: PropTypes.string
};