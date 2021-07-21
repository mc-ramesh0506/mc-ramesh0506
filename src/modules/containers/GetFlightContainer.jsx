import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getFlightDetails } from '../../axios/GetDetails';
import RedirectPage from '../../utils/RedirectPage';
import FlightDetails from '../components/FlightDetails';

class GetFlightContainer extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            flightsData: getFlightDetails(),
            flightSelected: false,
            flightId: null
        }
    }
    onSelect = (event) => {
        this.setState({ flightSelected: true, flightId: event.node.data.id })
    }

    render() {
        if (this.state.flightSelected && localStorage.getItem('token') === 'admin') {
            return <RedirectPage redirectTo='flightService_Dashboard' id={this.state.flightId}></RedirectPage>
        }
        if (this.state.flightSelected && localStorage.getItem('token') !== 'admin') {
            return <RedirectPage redirectTo='flight_details' id={this.state.flightId}></RedirectPage>
        }
        this.props.setPaxToStore(this.state.flightsData)

        return (
            <FlightDetails
                onSelect={this.onSelect} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        flightsData: state.flightsData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaxToStore: (flightsData) => { dispatch({ type: 'flight', payload: flightsData }) },
    }
}

GetFlightContainer.propTypes = {
    setPaxToStore: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetFlightContainer);