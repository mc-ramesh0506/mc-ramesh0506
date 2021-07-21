import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { getPassengerSeatDataForGiveFlight, getPaxDataForId } from '../../axios/GetDetails';

class PassengerDetailsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPax: null,
            valueSated: false,
            flightId: props.flightId,
            paxSeatForFlight: getPassengerSeatDataForGiveFlight(props.flightId),
            paxType: '',
        }
    }

    componentDidMount() {
        let paxData;
        let type;
        if (this.state.selectedPax === null) {
            getPaxDataForId(this.props.match.params.id).then((data) => {
                paxData = data;
                if (paxData.wheelChair === 'Yes' || paxData.infant === 'Yes') {
                    if (paxData.wheelChair === 'Yes')
                        type = 'WC'
                    if (paxData.infant === 'Yes')
                        type = 'INF'
                    if (paxData.wheelChair === 'Yes' && paxData.infant === 'Yes')
                        type = 'WCINF'
                }
                else {
                    type = 'OCPY'
                }
                if (paxData.meals.length > 0 && localStorage.getItem('airline') === 'inflight') {
                    type = 'MEAL'
                }
                this.setState({ selectedPax: paxData, paxType: type })
            })
        }
    }

    render() {
        if (this.state.selectedPax !== null) {

            const PassengerDetails = React.lazy(() => import('../components/PassengerDetails'));
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <PassengerDetails paxType={this.state.paxType} flightId={this.state.flightId} paxSeatForFlight={this.state.paxSeatForFlight} selectedPax={this.state.selectedPax} />
                </Suspense>
            )
        }
        return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {
        flightId: state.flightId
    }
}

PassengerDetailsContainer.propTypes = {
    flightId: PropTypes.string,
    match: PropTypes.object,

};
export default connect(mapStateToProps)(PassengerDetailsContainer);