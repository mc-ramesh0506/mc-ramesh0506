import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import PropTypes from 'prop-types'
import React, { Suspense } from 'react'
import '../../sass/Background.sass'
import HeaderContainer from '../containers/HeaderContainer'

export default class ManageAncillaryService extends React.Component {

    render() {
        const EditSSR = React.lazy(() => import('./EditSSR'));
        return (
            <div className="overlay">
                <HeaderContainer />

                <Panel header="Flight Details:" className="pancol" style={{ marginTop: '0.6em' }} toggleable={true}>

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Flight Number:</b></td>
                                    <td>{this.props.flightInfo.flightNum}</td>

                                    <td><b>Airline: </b></td>
                                    <td>{this.props.flightInfo.airline}</td>

                                    <td><b>BoardPoint: </b></td>
                                    <td>{this.props.flightInfo.boardPoint}</td>

                                </tr>
                                <tr>
                                    <td><b>OffPoint: </b></td>
                                    <td>{this.props.flightInfo.offpoint}</td>

                                    <td><b>DepartureDate: </b></td>
                                    <td>{this.props.flightInfo.deptDate}</td>

                                    <td><b>ArrivalDate: </b></td>
                                    <td>{this.props.flightInfo.arrDate}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Panel>
                <Panel header="Flight Details:" className="pancol" style={{ marginTop: '0.6em' }} toggleable={true}>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol col="3">

                                <Card title="Add Ancillary Service" className="card1" style={{ width: '250px', marginTop: '2em', marginLeft: '1em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <EditSSR services={this.props.flightInfo.special_service}
                                            serviceName={"Ancillary Service"}
                                            handleUpdateServices={(mealItem, serviceName) => this.props.handleUpdateServices(mealItem, serviceName)}></EditSSR>
                                    </Suspense>
                                </Card>
                            </MDBCol>

                            <MDBCol col="3">

                                <Card title="Add Meals" className="card2" style={{ width: '250px', marginTop: '2em', marginLeft: '1em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <EditSSR services={this.props.flightInfo.meals}
                                            serviceName={"Meals"}
                                            handleUpdateServices={(mealItem, serviceName) => this.props.handleUpdateServices(mealItem, serviceName)}></EditSSR>
                                    </Suspense>
                                </Card>
                            </MDBCol>

                            <MDBCol col="3">

                                <Card title="Add In-Flight-Shop" className="card3" style={{ width: '250px', marginTop: '2em', marginLeft: '1em', color: " #f7f6f6", backgroundColor: "#005070", textAlign: "center" }}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <EditSSR services={this.props.flightInfo.flight_shop}
                                            serviceName={"Flight Shop"}
                                            handleUpdateServices={(mealItem, serviceName) => this.props.handleUpdateServices(mealItem, serviceName)}></EditSSR>
                                    </Suspense>
                                </Card>
                            </MDBCol>

                        </MDBRow>
                        <MDBRow>
                            <br></br>
                            <MDBBtn onClick={this.props.goBack}> &#x21A9;&nbsp;Go Back</MDBBtn>
                        </MDBRow>
                    </MDBContainer>
                </Panel>
            </div>
        )
    }
}

ManageAncillaryService.propTypes = {
    goBack: PropTypes.func,
    flightInfo: PropTypes.object,
    handleUpdateServices: PropTypes.func
};