import Axios from 'axios';
import { MDBBtn, MDBCol, MDBRow } from 'mdbreact';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-default.css';
import { getFlightShopForFlight, getMealsForFlight, getPassengerSeatDataForGiveFlight, getSSRForFlight, setSSRtoPax } from '../../axios/GetDetails';
import { PASSENGER_DETAILS_URL } from '../../config/urls';
import '../../sass/Background.sass';
import RedirectPage from '../../utils/RedirectPage';
import HeaderContainer from '../containers/HeaderContainer';
const EditPaxContainer = React.lazy(() => import('../containers/EditPaxContainer'));
const UpdateSeatMap = React.lazy(() => import('../components/UpdateSeatMap'));
const AncillaryServicesComponent = React.lazy(() => import('../components/AncillaryServicesComponent'));


class PassengerDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pax: this.props.selectedPax,
            showpax: false,
            seatMap: false,
            seatMapUpdate: false,
            seatNo: this.props.selectedPax.seat_no,
            status: this.props.selectedPax.status,
            flightDashboard: false,
            updateSSR: false,
            updateMeal: false,
            updateShop: false,
            ssr: [],
            occupiedSeat: [],
            wheelchair: [],
            infant: [],
            wheelchair_infant: [],
            specialMeal: [],
        }

        this.onHidePax = this.onHidePax.bind(this)
        this.editPassenger = this.editPassenger.bind(this)
        this.hideSeatMap = this.hideSeatMap.bind(this)
        this.hideUpdateSSR = this.hideUpdateSSR.bind(this)
        localStorage.setItem('oldSeat', this.state.seatNo)
    }

    componentDidMount() {
        let ocpy = [];
        let wc = [];
        let inf = [];
        let wcinf = [];
        let meal = [];
        this.props.paxSeatForFlight.then((data) => {
            for (const arr of data) {
                if (arr.data === 'WC') {
                    wc.push(arr.key)
                }
                if (arr.data === 'INF') {
                    inf.push(arr.key)
                }
                if (arr.data === 'OCPY') {
                    ocpy.push(arr.key)
                }
                if (arr.data === 'WCINF') {
                    wcinf.push(arr.key)
                }
                if (arr.data === 'MEAL') {
                    meal.push(arr.key)
                }
            }
        })
        this.setState({
            occupiedSeat: ocpy, wheelchair: wc, infant: inf, wheelchair_infant: wcinf,
            specialMeal: meal
        })
    }

    onSave = (value) => {
        const PassengerDetails = {
            seat_no: value,
            status: 'AC'
        }

        Axios.patch(PASSENGER_DETAILS_URL + '/' + this.state.pax.id, PassengerDetails);

        let seatInfo = getPassengerSeatDataForGiveFlight(this.props.flightId);

        let ocpy = [];
        let wc = [];
        let inf = [];
        let wcinf = [];
        let meal = [];
        seatInfo.then((data) => {
            for (const arr of data) {
                if (arr.key === localStorage.getItem('oldSeat')) {
                    if (arr.data === 'WC') {
                        wc.push(value)
                    }
                    if (arr.data === 'INF') {
                        inf.push(value)
                    }
                    if (arr.data === 'OCPY') {
                        ocpy.push(value)
                    }
                    if (arr.data === 'WCINF') {
                        wcinf.push(value)
                    }
                    if (arr.data === 'MEAL') {
                        meal.push(value)
                    }
                }
                else {
                    if (arr.data === 'WC') {
                        wc.push(arr.key)
                    }
                    if (arr.data === 'INF') {
                        inf.push(arr.key)
                    }
                    if (arr.data === 'OCPY') {
                        ocpy.push(arr.key)
                    }
                    if (arr.data === 'WCINF') {
                        wcinf.push(arr.key)
                    }
                    if (arr.data === 'MEAL') {
                        meal.push(arr.key)
                    }
                }
            }
            if (localStorage.getItem('oldSeat') === '-') {
                if (this.props.paxType === 'WC') {
                    wc.push(value)
                }
                if (this.props.paxType === 'INF') {
                    inf.push(value)
                }
                if (this.props.paxType === 'OCPY') {
                    ocpy.push(value)
                }
                if (this.props.paxType === 'WCINF') {
                    wcinf.push(value)
                }
                if (this.props.paxType === 'MEAL') {
                    meal.push(value)
                }
            }
            if (this.state.seatMap) {
                Alert.success('<h5> Passenger <b><font color="red">' + this.state.pax.first_name + '</font></b> Got Accepted...!!</h5>', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 2000
                });
            }
            else if (this.state.seatMapUpdate) {
                Alert.success('<h5> Seat for Passenger <b><font color="red">' + this.state.pax.first_name + '</font></b> Got Changed...!!</h5>', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 2000
                });
            }

            localStorage.setItem('oldSeat', value)
            this.setState({
                occupiedSeat: ocpy,
                wheelchair: wc,
                infant: inf,
                wheelchair_infant: wcinf,
                specialMeal: meal,
                seatNo: value, status: 'AC',
                seatMap: false, updateSeatMap: false,
                seatMapUpdate: false,
            })
        })
    }

    onPaxUpdate = (updatedPax, value) => {
        if (value) {
            Alert.success('<h5>Passenger Name <b><font color="red">' + updatedPax.first_name + '</font></b> Updated Successfully...!!</h5>', {
                position: 'top-right',
                effect: 'bouncyflip',
                timeout: 2000
            });
            this.setState({ showpax: false, pax: updatedPax })
        }
    }

    offload = () => {
        const PassengerDetails = {
            seat_no: '-',
            status: 'NC'
        }

        Axios.patch(PASSENGER_DETAILS_URL + '/' + this.state.pax.id, PassengerDetails);
        let seatInfo = getPassengerSeatDataForGiveFlight(this.props.flightId);

        let ocpy = [];
        let wc = [];
        let inf = [];
        let wcinf = [];
        let meal = [];
        seatInfo.then((data) => {
            for (const arr of data) {
                if (arr.key !== localStorage.getItem('oldSeat')) {
                    if (arr.data === 'WC') {
                        wc.push(arr.key)
                    }
                    if (arr.data === 'INF') {
                        inf.push(arr.key)
                    }
                    if (arr.data === 'OCPY') {
                        ocpy.push(arr.key)
                    }
                    if (arr.data === 'WCINF') {
                        wcinf.push(arr.key)
                    }
                    if (arr.data === 'MEAL') {
                        meal.push(arr.key)
                    }
                }
            }

            Alert.success('<h5> Passenger <b><font color="red">' + this.state.pax.first_name + '</font></b> offloaded Successfully...!!</h5>', {
                position: 'top-right',
                effect: 'bouncyflip',
                timeout: 2000
            });

            localStorage.setItem('oldSeat', '-')
            this.setState({
                occupiedSeat: ocpy,
                wheelchair: wc,
                infant: inf,
                wheelchair_infant: wcinf,
                specialMeal: meal,
                seatNo: '-', status: 'NC',

            })

        })
        this.setState({ seatNo: '-', status: 'NC' })
    }

    onHidePax() {
        this.setState({ showpax: false })
    }
    hideSeatMap() {
        this.setState({ seatMap: false, seatMapUpdate: false })
    }

    hideUpdateSSR() {
        this.setState({ updateSSR: false, updateMeal: false, updateShop: false })
    }
    editPassenger() {
        this.setState({ showpax: true })
    }

    updateSSRS = () => {
        let details = [];
        getSSRForFlight(this.state.pax.flightId).then((resp) => {
            for (const arr of resp) {
                details.push(arr)
            }
            this.setState({ updateSSR: true, ssr: details })
        });
    }
    updateMeal = () => {
        let details = [];
        getMealsForFlight(this.state.pax.flightId).then((resp) => {
            for (const arr of resp) {
                details.push(arr)
            }
            this.setState({ updateMeal: true, ssr: details })
        });
    }
    updateFlightShop = () => {
        let details = [];
        getFlightShopForFlight(this.state.pax.flightId).then((resp) => {
            for (const arr of resp) {
                details.push(arr)
            }
            this.setState({ updateShop: true, ssr: details })
        });
    }
    checkinPax = () => {
        this.setState({ seatMap: true })
    }
    checkinPaxChange = () => {
        this.setState({ seatMapUpdate: true })
    }
    goToFlightDashboard = () => {
        this.setState({ flightDashboard: true })
    }

    saveData = (value, serviceName) => {
        let newPax = this.state.pax;
        if (serviceName === 'Ancillary Service') {
            newPax.special_service = value
        }
        if (serviceName === 'Meals') {
            newPax.meals = value
        }
        if (serviceName === 'Flight Shop') {
            newPax.flight_shop = value
        }
        setSSRtoPax(newPax.id, serviceName, value)
        Alert.success('<h5>' + serviceName + ' Updated for <b><font color="red">' + this.state.pax.first_name + '</font></b>...!!</h5>', {
            position: 'top-right',
            effect: 'genie',
            timeout: 2000
        });
        this.setState({ pax: newPax, updateSSR: false, updateMeal: false, updateShop: false })
    }

    render() {
        if (this.state.flightDashboard) {
            return <RedirectPage redirectTo='flight_details' id={this.state.pax.flightId}></RedirectPage>
        }
        return (
            <div className="overlay">
                <Alert timeout={2000} html={true} />
                <div className="table-responsive">
                    <HeaderContainer />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"> Passenger details:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>FirstName: </b></td>
                                <td>{this.state.pax.first_name}</td>

                                <td><b>LastName: </b></td>
                                <td>{this.state.pax.last_name}</td>

                                <td><b>DOB: </b></td>
                                <td>{this.state.pax.date_of_birth}</td>

                                <td><b>Gender: </b></td>
                                <td>{this.state.pax.gender}</td>
                            </tr>
                            <tr>
                                <td><b>EmailId: </b></td>
                                <td>{this.state.pax.email_id}</td>

                                <td><b>MobileNo: </b></td>
                                <td>{this.state.pax.mobile_no}</td>

                                <td><b>Country: </b></td>
                                <td>{this.state.pax.country}</td>

                                <td><b>SeatNo: </b></td>
                                <td>{this.state.seatNo}</td>

                            </tr>
                            <tr>
                                <td><b>Status: </b></td>
                                <td>{this.state.status}</td>

                                <td><b>WheelChair: </b></td>
                                <td>{this.state.pax.wheelChair}</td>

                                <td><b>Infant: </b></td>
                                <td>{this.state.pax.infant}</td>

                                <td><b>Passport: </b></td>
                                <td>{this.state.pax.travel_document}</td>

                            </tr>
                            <tr>
                                <td><b>Address: </b></td>
                                <td>{this.state.pax.address}</td>

                                <td><b>Ancillary Services: </b></td>
                                <td>{this.state.pax.special_service.map(name => (
                                    <div key={name} value={name}>
                                        {name}&nbsp;
                        </div>
                                ))}</td>

                                <td><b>Meals: </b></td>
                                <td>{this.state.pax.meals.map(name => (
                                    <div key={name} value={name}>
                                        {name}&nbsp;
                    </div>
                                ))}</td>

                                <td><b>Flight Shop: </b></td>
                                <td>{this.state.pax.flight_shop.map(name => (
                                    <div key={name} value={name}>
                                        {name}&nbsp;
                    </div>
                                ))}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="box">
                    <br></br>
                    <br></br>
                    <MDBRow>
                        <MDBCol md="2" style={{ display: localStorage.getItem('token') === 'airlineStaff' ? 'none' : '' }} >
                            <Button label="Update Passenger" className="p-button-rounded" onClick={this.editPassenger} />
                        </MDBCol>
                        <MDBCol md="2" style={{ display: (localStorage.getItem('airline') === 'checkin' && this.state.seatNo === '-') ? '' : 'none' }}>
                            <Button label="Checkin" className="p-button-rounded" onClick={this.checkinPax} />
                        </MDBCol>
                        <MDBCol md="2" style={{ display: (localStorage.getItem('airline') === 'checkin' && this.state.status === 'AC') ? '' : 'none' }}>
                            <Button label="Undo Checkin" className="p-button-rounded" onClick={this.offload} />
                        </MDBCol>
                        <MDBCol md="2" style={{ display: (localStorage.getItem('airline') === 'checkin' && this.state.status === 'AC') ? '' : 'none' }}>
                            <Button label="ChangeSeat" className="p-button-rounded" onClick={this.checkinPaxChange} />
                        </MDBCol>

                        <MDBCol md="3" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }}>
                            <Button label="Manage Ancillary services" className="p-button-rounded" onClick={this.updateSSRS} />
                        </MDBCol>
                        <MDBCol md="3" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }}>
                            <Button label="Manage Meal services" className="p-button-rounded" onClick={this.updateMeal} />
                        </MDBCol>
                        <MDBCol md="3" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }}>
                            <Button label="Manage Flight Shop" className="p-button-rounded" onClick={this.updateFlightShop} />
                        </MDBCol>

                    </MDBRow>
                    <MDBBtn onClick={this.goToFlightDashboard}> &#x21A9;&nbsp;Go Back</MDBBtn>
                </div>
                <Dialog header="Update Passsenger" visible={this.state.showpax} style={{ width: '50vw' }} onHide={this.onHidePax} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <EditPaxContainer pax={this.state.pax} onPaxUpdate={this.onPaxUpdate} />
                    </Suspense>
                </Dialog>

                <Dialog header="SeatMap" visible={this.state.seatMap} style={{ width: '50vw' }} onHide={this.hideSeatMap} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UpdateSeatMap onSave={this.onSave}
                            {...this.state}></UpdateSeatMap>
                    </Suspense>
                </Dialog>

                <Dialog header="UpdateSeat&nbsp;&nbsp;&nbsp;&nbsp;Select a Seat to Update Seat" visible={this.state.seatMapUpdate} style={{ width: '50vw' }} onHide={this.hideSeatMap} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UpdateSeatMap onSave={this.onSave}
                            {...this.state}></UpdateSeatMap>
                    </Suspense>
                </Dialog>
                <Dialog header="Add And Update Ancillary Services" visible={this.state.updateSSR} style={{ width: '50vw' }} onHide={this.hideUpdateSSR} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AncillaryServicesComponent ssr={this.state.ssr} saveData={this.saveData} serviceName="Ancillary Service" services={this.state.pax.special_service} />
                    </Suspense>
                </Dialog>
                <Dialog header="Add And Update Meals" visible={this.state.updateMeal} style={{ width: '50vw' }} onHide={this.hideUpdateSSR} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AncillaryServicesComponent ssr={this.state.ssr} saveData={this.saveData} serviceName="Meals" services={this.state.pax.meals} />
                    </Suspense>
                </Dialog>
                <Dialog header="Add And Update Flight-Shop" visible={this.state.updateShop} style={{ width: '50vw' }} onHide={this.hideUpdateSSR} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AncillaryServicesComponent ssr={this.state.ssr} saveData={this.saveData} serviceName="Flight Shop" services={this.state.pax.flight_shop} />
                    </Suspense>
                </Dialog>
            </div>
        )
    }

}

PassengerDetails.propTypes = {
    flightId: PropTypes.string,
    paxType: PropTypes.string,
    selectedPax: PropTypes.object,
    paxSeatForFlight: PropTypes.object
};
export default PassengerDetails;