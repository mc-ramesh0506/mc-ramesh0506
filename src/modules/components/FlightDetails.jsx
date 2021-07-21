import { MDBBtn } from 'mdbreact';
import { Column } from "primereact/column";
import { TreeTable } from 'primereact/treetable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../../sass/Background.sass';
import RedirectPage from "../../utils/RedirectPage";
import HeaderContainer from '../containers/HeaderContainer';

class FlightDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            selectedNodeKey: null,
            flightSelected: false,
            home: false
        }
    }
    homePage = () => {
        this.setState({ home: true })
    }
    componentDidMount() {

        let flight = [];

        this.props.flightsData.then((data) => {

            for (let i = 0; i < data.length; i++) {
                let details = {
                    key: '',
                    data: ''
                }
                details.key = data[i].id
                details.data = data[i]

                flight.push(details)
            }

            this.setState({ flights: this.state.flights.concat(flight) })
        })
    }

    render() {
        if (this.state.home) {
            return <RedirectPage redirectTo={localStorage.getItem('token')}></RedirectPage>
        }

        return (
            <div className="overlay">
                <div className="table-responsive">
                    <HeaderContainer />
                    <TreeTable value={this.state.flights} selectionMode="single" onSelect={(event) => { this.props.onSelect(event) }}
                        selectionKeys={this.state.selectedNodeKey} onSelectionChange={e => this.setState({ selectedNodeKey: e.value })} responsive={true}>

                        <Column style={{ width: '40px' }} field="id" header=""></Column>
                        <Column style={{ width: '90px' }} field="airline" header="Airline" sortable={true}></Column>
                        <Column style={{ width: '150px' }} field="flightNo" header="Flight Number" expander sortable={true}></Column>
                        <Column style={{ width: '100px' }} field="departureStation" header="Offpoint" sortable={true}></Column>
                        <Column style={{ width: '90px' }} field="arrivalStation" header="Boardpoint" sortable={true}></Column>
                        <Column style={{ width: '130px' }} field="departureDate" header="Departure Date" sortable={true}></Column>
                        <Column style={{ width: '100px' }} field="arrivalDate" header="Arrival Date" sortable={true}></Column>
                    </TreeTable>
                    <br />
                    <MDBBtn className="p-button-rounded" onClick={this.homePage} > &#x21A9;&nbsp;Go Back</MDBBtn>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flightsData: state.flightsData
    }
}

FlightDetails.propTypes = {
    flightsData: PropTypes.object,
    homePage: PropTypes.func,
    onSelect: PropTypes.func,
};

export default connect(mapStateToProps)(FlightDetails);