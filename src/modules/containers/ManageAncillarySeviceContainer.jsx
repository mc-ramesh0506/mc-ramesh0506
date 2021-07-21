import PropTypes from 'prop-types';
import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-default.css';
import { getFlightDataForId, updateSSR } from '../../axios/GetDetails';
import RedirectPage from '../../utils/RedirectPage';
import ManageAncillaryService from '../components/ManageAncillaryService';


export default class ManageAncillaryServiceContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            flightdata: getFlightDataForId(this.props.match.params.id),
            flightInfo: {
                flightId: '',
                flightNum: '',
                airline: '',
                boardPoint: '',
                offpoint: '',
                deptDate: '',
                arrDate: '',
                meals: [],
                special_service: [],
                flight_shop: []
            },
            goToBack: false,
        }
    }

    componentDidMount() {

        let flightValue = {
            flightId: '',
            flightNum: '',
            airline: '',
            boardPoint: '',
            offpoint: '',
            deptDate: '',
            arrDate: '',
        }

        this.state.flightdata.then((data) => {
            flightValue.flightId = data[0].id
            flightValue.flightNum = data[0].flightNo
            flightValue.airline = data[0].airline
            flightValue.boardPoint = data[0].departureStation
            flightValue.offpoint = data[0].arrivalStation
            flightValue.deptDate = data[0].departureDate
            flightValue.arrDate = data[0].arrivalDate
            flightValue.meals = data[0].meals
            flightValue.special_service = data[0].special_service
            flightValue.flight_shop = data[0].flight_shop
            this.setState({ flightInfo: flightValue })
        })

    }

    handleUpdateServices = (data, serviceName) => {
        updateSSR(this.state.flightInfo.flightId, serviceName, data)
        Alert.success('<h5>' + serviceName + ' Saved Successfully...!!</h5>', {
            position: 'top-right',
            effect: 'jelly',
            timeout: 2000
        });

    }

    goBack = () => {
        this.setState({ goToBack: true })
    }

    render() {
        if (this.state.goToBack) {
            return <RedirectPage redirectTo='flightService_Dashboard' id={this.state.flightInfo.flightId}></RedirectPage>
        }
        return (
            <div>
                <Alert timeout={2000} html={true} />
                <ManageAncillaryService flightInfo={this.state.flightInfo}
                    handleUpdateServices={(mealItem, serviceName) => this.handleUpdateServices(mealItem, serviceName)}
                    goBack={this.goBack}>
                </ManageAncillaryService>
            </div>
        )
    }
}

ManageAncillaryServiceContainer.propTypes = {
    match: PropTypes.object,
};