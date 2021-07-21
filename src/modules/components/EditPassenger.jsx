import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import React from 'react';


export default class EditPassenger extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            genderType: {
                "name": "gender",
                "value": this.props.pax.gender,
            },
            oldPax: this.props.pax,
        }

        this.typeOfGender = this.typeOfGender.bind(this)
    }

    travelDoc(e) {
        this.setState({ docType: e.value, docsel: true })
    }

    typeOfGender(e) {

        this.setState({ genderType: e.value })
    }

    render() {

        const gender = [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
            { name: 'Other', value: 'Other' }
        ];

        return (
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault()

                    this.props.savePassenger(
                        this.state.oldPax,
                        event.target.fname.value,
                        event.target.lname.value,
                        event.target.dob.value,
                        event.target.email.value,
                        this.state.genderType.value,
                        event.target.mob.value,
                        event.target.country.value,
                        this.state.docType,
                        event.target.docNo.value,
                        event.target.address.value
                    )
                }}>
                    <MDBRow>
                        <MDBCol md="4">
                            <MDBInput
                                name="fname"
                                type="text"
                                id="materialFormRegisterNameEx1"
                                label="First name"
                                valueDefault={this.props.pax.first_name}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput

                                name="lname"
                                valueDefault={this.props.pax.last_name}
                                type="text"
                                id="materialFormRegisterEmailEx2"
                                label="Last name"

                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput

                                name="dob"
                                valueDefault={this.props.pax.date_of_birth}
                                type="text"
                                id="materialFormRegisterEmailEx3"
                                label="DOB"

                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">
                            <MDBInput
                                type="email"
                                id="materialFormRegisterConfirmEx4"
                                name="email"
                                label="Your Email address"
                                valueDefault={this.props.pax.email_id}

                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <Dropdown value={this.state.genderType} options={gender} onChange={this.typeOfGender} placeholder="Gender" optionLabel="name" />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                valueDefault={this.props.pax.mobile_no}
                                type="text"
                                id="materialFormRegisterPasswordEx5"
                                name="mob"
                                label="Mobile No"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">

                            <MDBInput
                                type="text"
                                id="materialFormRegisterPasswordEx6"
                                name="docNo"
                                label="Passport No"
                                valueDefault={this.props.pax.travel_document}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                valueDefault={this.props.pax.country}
                                type="text"
                                id="materialFormRegisterPasswordEx7"
                                name="country"
                                label="Country"
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                type="text"
                                id="materialFormRegisterPasswordEx8"
                                name="address"
                                label="Address"
                                valueDefault={this.props.pax.address}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="success" type="submit">
                        Save
                    </MDBBtn>
                </form>
            </div>
        )
    }
}

EditPassenger.propTypes = {
    pax: PropTypes.object,
    savePassenger: PropTypes.func,
};