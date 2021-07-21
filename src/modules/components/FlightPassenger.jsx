import axios from 'axios';
import { MDBBtn, MDBCol, MDBRow } from 'mdbreact';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from "primereact/column";
import { Dialog } from 'primereact/dialog';
import { TreeTable } from 'primereact/treetable';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { getPassengerDataForGiveFlight, getPassengerSeatDataForGiveFlight } from '../../axios/GetDetails';
import { PASSENGER_DETAILS_URL } from '../../config/urls';
import '../../sass/Background.sass';
import '../../sass/Panel.sass';
import RedirectPage from '../../utils/RedirectPage';
import HeaderContainer from "../containers/HeaderContainer";
import UpdateSeatMap from './UpdateSeatMap';


class FlightPassenger extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            passengers: [],
            showPassengers: [],
            selectedNodeKey: null,
            flightNum: null,
            airline: '',
            boardPoint: '',
            offpoint: '',
            deptDate: '',
            arrDate: '',
            first: 0,
            rows: 3,
            visible: false,
            paxadd: false,
            flightId: this.props.flightId,
            lastPaxKey: null,
            flightlist: false,
            cities: [],
            checked: false,
            openSeatMap: false,
            viewSeatMap: false,
            paxSeatForFlight: null,
            occupiedSeat: [],
            wheelchair: [],
            infant: [],
            wheelchair_infant: [],
            specialMeal: [],
        }

        this.onPageChange = this.onPageChange.bind(this);
        this.onHidePax = this.onHidePax.bind(this);
        this.addPassenger = this.addPassenger.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
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

        let flightValue = null
        this.props.flightdata.then((data) => {
            flightValue = data[0];

            let passenger = [];
            let lastPaxId = null;
            getPassengerDataForGiveFlight(flightValue.id).then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let details = {
                        key: '',
                        data: ''
                    }
                    details.key = data[i].id
                    lastPaxId = data[i].id
                    details.data = data[i]
                    passenger.push(details)
                }

                this.setState({
                    occupiedSeat: ocpy, wheelchair: wc, infant: inf, wheelchair_infant: wcinf,
                    specialMeal: meal,
                    passengers: this.state.passengers.concat(passenger),
                    showPassengers: this.state.passengers.concat(passenger),
                    flightNum: flightValue.flightNo,
                    airline: flightValue.airline,
                    boardPoint: flightValue.departureStation,
                    offpoint: flightValue.arrivalStation,
                    deptDate: flightValue.departureDate,
                    arrDate: flightValue.arrivalDate,
                    lastPaxKey: lastPaxId
                })
            })
        })

    }


    onCityChange(e) {
        let selectedCities = [...this.state.cities];
        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        let filterPax = this.state.passengers
        if (selectedCities.find(element => element === 'Wheelchair')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.wheelChair === 'Yes'
            )
        }
        if (selectedCities.find(element => element === 'Infant')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.infant === 'Yes'
            )
        }
        if (selectedCities.find(element => element === 'CheckedIn')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.status === 'AC'
            )
        }

        if (selectedCities.find(element => element === 'NotCheckedIn')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.status === 'NC'
            )
        }

        if (selectedCities.find(element => element === 'DOB')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.date_of_birth === null || pax.data.date_of_birth === ""
            )
        }
        if (selectedCities.find(element => element === 'TravelDoc')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.travel_document === null || pax.data.travel_document === ""
            )
        }
        if (selectedCities.find(element => element === 'Address')) {
            filterPax = filterPax.filter((pax) =>
                pax.data.address === null || pax.data.address === ""
            )
        }
        this.setState({ cities: selectedCities, showPassengers: filterPax });

    }

    onPaxSave = (pax) => {

        pax.id = this.state.lastPaxKey + 1;


        let details = {
            key: pax.id,
            data: pax
        }
        details.key = this.state.lastPaxKey + 1

        details.data = pax;
        let newDetails = [...this.state.passengers]
        newDetails.push(details);
        Alert.success('<h5>Passenger Saved...!!</h5>', {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: 2000
        });
        this.setState({ paxadd: false, passengers: newDetails, showPassengers: newDetails })
    }
    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows
        });
    }

    flightDashboard = () => {

        this.setState({ flightlist: true })
    }
    addPassenger() {
        this.setState({ paxadd: true });
    }

    onHidePax() {
        this.setState({ paxadd: false });
    }

    changeSeat = () => {
        this.setState({ openSeatMap: true })
    }

    viewSeat = () => {
        this.setState({ viewSeatMap: true })
    }
    hideSeatMap = () => {
        this.setState({ openSeatMap: false, viewSeatMap: false })
    }

    onSave = (value) => {
        const PassengerDetails = {
            seat_no: value
        }

        axios.patch(PASSENGER_DETAILS_URL + '/' + this.props.paxId, PassengerDetails);

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
            let filterPax = [];
            for (const arr of this.state.passengers) {
                if (arr.key !== this.props.paxId) {
                    filterPax.push(arr)
                }
                else {
                    let newPax = {
                        key: '',
                        data: '',
                    }
                    let newArr = arr.data
                    newArr['seat_no'] = value
                    newPax.key = this.props.paxId
                    newPax.data = newArr
                    filterPax.push(newPax)
                }
            }

            Alert.success('<h5>Seat Number Changed...!!</h5>', {
                position: 'top-right',
                effect: 'bouncyflip',
                timeout: 2000
            });

            localStorage.setItem('oldSeat', value)
            this.setState({
                showPassengers: filterPax, openSeatMap: false,
                occupiedSeat: ocpy,
                wheelchair: wc,
                infant: inf,
                wheelchair_infant: wcinf,
                specialMeal: meal
            })

        })
    }



    render() {
        if (this.state.flightlist) {
            return <RedirectPage redirectTo='flight_dashboard'></RedirectPage>
        }
        const AddPassengerContainer = React.lazy(() => import('../containers/AddPassengerContainer'));

        return (
            <div className="overlay">
                <Alert timeout={2000} html={true} />
                <div className="table-responsive">
                    <HeaderContainer />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"> Flight details:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Flight Number: </b></td>
                                <td>{this.state.airline}</td>
                                <td><b>BoardPoint: </b></td>
                                <td>{this.state.boardPoint}</td>
                                <td><b>OffPoint: </b></td>
                                <td>{this.state.offpoint}</td>
                                <td><b>Airline: </b></td>
                                <td>{this.state.airline}</td>
                                <td><b>DepartureDate: </b></td>
                                <td>{this.state.deptDate}</td>
                                <td><b>ArrivalDate: </b></td>
                                <td>{this.state.arrDate}</td>

                            </tr>
                        </tbody>
                    </table>

                    <div className="table-responsive">
                        <font color="Green"><h4>Passenger details:&nbsp;&nbsp;</h4></font>
                        <div hidden={localStorage.getItem('token') === 'admin'} align="left">
                            <font color="Blue"><h6>Filter By:&nbsp;&nbsp;</h6></font>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') === 'admin'} inputId="cb1" value="Wheelchair" onChange={this.onCityChange} checked={this.state.cities.indexOf('Wheelchair') !== -1}></Checkbox>
                            &nbsp;<label style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} htmlFor="cb1" className="p-checkbox-label">Wheelchair</label>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') === 'admin'} inputId="cb1" value="Infant" onChange={this.onCityChange} checked={this.state.cities.indexOf('Infant') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">Infant</label>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') === 'admin'} inputId="cb1" value="CheckedIn" onChange={this.onCityChange} checked={this.state.cities.indexOf('CheckedIn') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">CheckedIn</label>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') === 'admin'} inputId="cb1" value="NotCheckedIn" onChange={this.onCityChange} checked={this.state.cities.indexOf('NotCheckedIn') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">NotCheckedIn</label>
                        </div>
                        <div hidden={localStorage.getItem('token') !== 'admin'} align="left">
                            <font color="blue"><h6>Filter By Missing Mandatory Requirements: &nbsp;&nbsp;</h6></font>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') !== 'admin'} inputId="cb1" value="DOB" onChange={this.onCityChange} checked={this.state.cities.indexOf('DOB') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">DOB</label>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') !== 'admin'} inputId="cb1" value="TravelDoc" onChange={this.onCityChange} checked={this.state.cities.indexOf('TravelDoc') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">Passport</label>
                            &nbsp;<Checkbox disabled={localStorage.getItem('token') !== 'admin'} inputId="cb1" value="Address" onChange={this.onCityChange} checked={this.state.cities.indexOf('Address') !== -1}></Checkbox>
                            &nbsp;<label htmlFor="cb1" style={{ color: '#f2340a', fontFamily: 'bold', fontSize: '20px' }} className="p-checkbox-label">Address</label>

                        </div>
                        <br />

                        <TreeTable value={this.state.showPassengers} selectionMode="single" onSelect={(event) => { this.props.onSelect(event) }} onUnselect={this.onUnselect}
                            selectionKeys={this.state.selectedNodeKey} onSelectionChange={e => this.setState({ selectedNodeKey: e.value })}
                            paginator={true} rows={3} rowsPerPageOptions={[3, 5, 10, 20]} responsive={true}>

                            <Column style={{ width: '50px' }} field="id" header="" sortable={true}></Column>
                            <Column style={{ width: '110px' }} field="first_name" header="Firstname" sortable={true}></Column>
                            <Column style={{ width: '110px' }} field="last_name" header="Lastname" expander sortable={true}></Column>
                            <Column style={{ width: '110px', display: localStorage.getItem('token') === 'admin' ? 'none' : '' }} field="wheelChair" header="WheelChair" sortable={true}></Column>
                            <Column style={{ width: '90px', display: localStorage.getItem('token') === 'admin' ? 'none' : '' }} field="infant" header="Infant" sortable={true}></Column>
                            <Column style={{ width: '80px' }} field="seat_no" header="SeatNo" sortable={true}></Column>
                            <Column style={{ width: '80px' }} field="status" header="Status" sortable={true}></Column>
                            <Column style={{ width: '130px', display: localStorage.getItem('token') === 'admin' ? '' : 'none' }} field="date_of_birth" header="DOB" sortable={true}></Column>
                            <Column style={{ width: '130px', display: localStorage.getItem('token') === 'admin' ? '' : 'none' }} field="address" header="Address" sortable={true}></Column>
                            <Column style={{ widht: '150px', display: localStorage.getItem('token') === 'admin' ? '' : 'none' }} field="travel_document" header="Passport" sortable={true}></Column>
                            <Column style={{ widht: '150px' }} field="special_service" header="SSR" sortable={true}></Column>
                            <Column field="meals" header="Meals" sortable={true}></Column>

                        </TreeTable>
                    </div>

                    <br></br>
                    <br></br>
                    <MDBRow>
                        <MDBCol col="3">
                            <Button label="Open Passenger" className="p-button-success" disabled={this.props.paxButton} onClick={this.props.openPax} />
                        </MDBCol>
                        <MDBCol col="3" style={{ display: localStorage.getItem('token') === 'admin' ? '' : 'none' }}>
                            <Button label="Add Passenger" className="p-button-success" onClick={this.addPassenger} />
                        </MDBCol>
                        <MDBCol col="3" style={{ display: localStorage.getItem('airline') === 'checkin' ? '' : 'none' }} >
                            <Button label="View SeatMap / Change Seat" className="p-button-success" disabled={localStorage.getItem('oldSeat') === '-'} hidden={this.props.seatButton} onClick={(event) => { event.preventDefault(); this.changeSeat() }} />
                        </MDBCol>
                        <MDBCol col="3" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }} >
                            <Button label="View SeatMap" className="p-button-success" onClick={(event) => { event.preventDefault(); this.viewSeat() }} />
                        </MDBCol>
                    </MDBRow>

                    <MDBBtn onClick={this.flightDashboard}> &#x21A9;&nbsp;Go Back</MDBBtn>
                </div>


                <Dialog header="Add Passsenger" visible={this.state.paxadd} style={{ width: '50vw' }} onHide={this.onHidePax} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddPassengerContainer flightId={this.state.flightId} onPaxSave={this.onPaxSave} />
                    </Suspense>
                </Dialog>
                <Dialog header="UpdateSeat&nbsp;&nbsp;&nbsp;&nbsp;Select a Seat" visible={this.state.openSeatMap} style={{ width: '50vw' }} onHide={this.hideSeatMap} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UpdateSeatMap onSave={this.onSave}
                            {...this.state}></UpdateSeatMap>
                    </Suspense>
                </Dialog>
                <Dialog header="View SeatMap" visible={this.state.viewSeatMap} style={{ width: '50vw' }} onHide={this.hideSeatMap} maximizable>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UpdateSeatMap onSave={this.onSave}
                            {...this.state}></UpdateSeatMap>
                    </Suspense>
                </Dialog>
            </div >
        )
    }
}

FlightPassenger.propTypes = {
    doLogout: PropTypes.func,
    paxId: PropTypes.number,
    flightId: PropTypes.string,
    paxSeatForFlight: PropTypes.object,
    flightdata: PropTypes.object,
    oldSeat: PropTypes.string,
    onSelect: PropTypes.func,
    paxButton: PropTypes.bool,
    openPax: PropTypes.func,
    seatButton: PropTypes.bool
};

export default FlightPassenger;