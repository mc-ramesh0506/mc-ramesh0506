import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import PropTypes from 'prop-types';
import React from 'react';
import '../../sass/Background.sass';
import RedirectPage from '../../utils/RedirectPage';
import HeaderContainer from '../containers/HeaderContainer';

export default class FlightServiceDashboard extends React.Component {

    constructor() {
        super()
        this.state = {
            paxService: false,
            ancillaryService: false,
            flightId: null,
            goToBack: false
        }

    }


    goToPaxServices = (event) => {
        event.preventDefault();
        this.setState({ paxService: true, flightId: this.props.match.params.id })
    }

    goToAncillaryServices = (event) => {
        event.preventDefault();
        this.setState({ ancillaryService: true, flightId: this.props.match.params.id })
    }

    goBack = () => {
        this.setState({ goToBack: true })
    }

    render() {
        if (this.state.goToBack) {
            return <RedirectPage redirectTo='flight_dashboard'></RedirectPage>
        }
        if (this.state.paxService) {
            return <RedirectPage redirectTo='flight_details' id={this.state.flightId}></RedirectPage>
        }
        if (this.state.ancillaryService) {
            return <RedirectPage redirectTo='ancillaryService_Dashboard' id={this.state.flightId}></RedirectPage>
        }
        return (
            <div className="overlay">
                <HeaderContainer />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol col="4">

                            <Card title="Manage Passenger Services" className="card1" style={{ width: '360px', marginTop: '9em', marginLeft: '-2em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                <Button label="Open" onClick={(event) => { this.goToPaxServices(event) }} style={{ marginTop: "5em", width: 150, height: 50, fontFamily: 'Times New Roman', fontSize: 18 }} className="p-button-secondary" />
                            </Card>
                        </MDBCol>
                        <MDBCol col="4"></MDBCol>
                        <MDBCol col="4">

                            <Card title="Manage Ancillary Services" className="card1" style={{ width: '360px', marginTop: '9em', marginLeft: '-2em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                <Button label="Open" onClick={(event) => { this.goToAncillaryServices(event) }} style={{ marginTop: "5em", width: 150, height: 50, fontFamily: 'Times New Roman', fontSize: 18 }} className="p-button-secondary" />
                            </Card>
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
                <MDBBtn onClick={this.goBack}> &#x21A9;&nbsp;Go Back</MDBBtn>
            </div>
        )
    }
}

FlightServiceDashboard.propTypes = {
    match: PropTypes.object,
};