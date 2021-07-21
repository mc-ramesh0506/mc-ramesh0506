import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { getFlightDataForId, getPassengerSeatDataForGiveFlight } from '../../axios/GetDetails';
import RedirectPage from '../../utils/RedirectPage';
const FlightPassenger = React.lazy(() => import('../components/FlightPassenger'));

class FlightPassengerContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flightdata: getFlightDataForId(this.props.match.params.id),
            paxSelected: false,
            paxId: null,
            paxButton: true,
            seatButton: true,
            paxSeatForFlight: getPassengerSeatDataForGiveFlight(this.props.match.params.id),
            oldSeat: null,
            flightId: this.props.match.params.id,
        }
    }

    openPax = () => {
        this.setState({ paxSelected: true })
    }

    onSelect = (event) => {
        localStorage.setItem('oldSeat', event.node.data.seat_no);
        if (localStorage.getItem('token') === 'admin') {
            this.setState({ paxButton: false, paxId: event.node.data.id, oldSeat: event.node.data.seat_no })
        }
        else {
            this.setState({ paxButton: false, seatButton: false, paxId: event.node.data.id, oldSeat: event.node.data.seat_no })
        }
    }

    render() {
        if (this.state.paxSelected) {
            this.props.setPaxToStore(this.state.flightId)
            return <RedirectPage redirectTo='paxDetails' id={this.state.paxId+''}></RedirectPage>
        }

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <FlightPassenger flightdata={this.state.flightdata} onSelect={this.onSelect} openPax={this.openPax} paxButton={this.state.paxButton}
                    paxSeatForFlight={this.state.paxSeatForFlight} paxId={this.state.paxId} oldSeat={this.state.oldSeat} flightId={this.props.match.params.id}
                    seatButton={this.state.seatButton}
                />
            </Suspense>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flightId: state.flightId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaxToStore: (flightId) => { dispatch({ type: 'id', payload: flightId }) },
    }
}

FlightPassengerContainer.propTypes = {
    match: PropTypes.object,
    setPaxToStore: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(FlightPassengerContainer);