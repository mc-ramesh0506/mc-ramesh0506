import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import '../../sass/Background.sass';
import RedirectPage from '../../utils/RedirectPage';
import HeaderContainer from '../containers/HeaderContainer';


export default class AirlineStaffDashboard extends React.Component {

    constructor() {
        super()
        this.state = {
            goToNext: false,
        }

    }
    goToCheckin = () => {
        localStorage.setItem('airline', 'checkin')
        this.setState({ goToNext: true })
    }

    goToInFlight = () => {
        localStorage.setItem('airline', 'inflight')
        this.setState({ goToNext: true })
    }

    render() {
        if (this.state.goToNext) {
            return <RedirectPage redirectTo='airlineStaff'></RedirectPage>
        }
        return (
            <div className="overlay">
                <HeaderContainer />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol col="4">

                            <Card title="CheckIn" className="card1" style={{ width: '360px', marginTop: '9em', marginLeft: '-2em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>

                                <Button label="Open" onClick={(event) => { event.preventDefault(); this.goToCheckin() }} style={{ marginTop: "5em", width: 150, height: 50, fontFamily: 'Times New Roman', fontSize: 18 }} className="p-button-secondary" />
                            </Card>
                        </MDBCol>
                        <MDBCol col="4"></MDBCol>
                        <MDBCol col="4">

                            <Card title="In-Flight" className="card2" style={{ width: '360px', marginTop: '9em', marginLeft: '-2em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                <Button label="Open" onClick={(event) => { event.preventDefault(); this.goToInFlight() }} style={{ marginTop: "5em", width: 150, height: 50, fontFamily: 'Times New Roman', fontSize: 18 }} className="p-button-secondary" />
                            </Card>
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}