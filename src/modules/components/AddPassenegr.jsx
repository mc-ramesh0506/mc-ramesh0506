import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import { Dropdown } from 'primereact/dropdown';
import PropTypes from 'prop-types';
import React from 'react';

class AddPassenger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genderType: null,
            hasChair: {
                name: 'no',
                value: 'No'
            },
            hasInfant: {
                name: 'no',
                value: 'No'
            },
        }
        this.chairRequired = this.chairRequired.bind(this)
        this.typeOfGender = this.typeOfGender.bind(this)
        this.infantValue = this.infantValue.bind(this)
    }

    chairRequired(e) {
        this.setState({ hasChair: e.value })
    }

    typeOfGender(e) {
        this.setState({ genderType: e.value })
    }

    infantValue(e) {
        this.setState({ hasInfant: e.value })
    }
    render() {
        const gender = [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
            { name: 'Other', value: 'Other' }
        ];
        const chair = [
            { name: 'Yes', value: 'Yes' },
            { name: 'No', value: 'No' }
        ];
        const infant = [
            { name: 'Yes', value: 'Yes' },
            { name: 'No', value: 'No' }
        ];

        return (
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.savePassenger(
                        event.target.fname.value,
                        event.target.lname.value,
                        event.target.dob.value,
                        event.target.email.value,
                        this.state.genderType.value,
                        event.target.mob.value,
                        event.target.country.value,
                        this.state.hasChair.value,
                        this.state.hasInfant.value,
                        event.target.docNo.value,
                        event.target.address.value
                    )
                }}>
                    <MDBRow>
                        <MDBCol md="4">
                            <MDBInput
                                name="fname"
                                type="text"
                                id="materialFormRegisterNameEx"
                                label="First name"

                                required
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                name="lname"
                                type="text"
                                id="materialFormRegisterEmailEx2"
                                label="Last name"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput

                                name="dob"

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
                                required
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput

                                type="text"
                                id="materialFormRegisterPasswordEx5"
                                name="country"
                                label="Country"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput

                                type="text"
                                id="materialFormRegisterPasswordEx6"
                                name="mob"
                                label="Mobile No"
                                required
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">
                            <Dropdown value={this.state.hasInfant} options={infant} onChange={this.infantValue} placeholder="Infant" optionLabel="name" />
                        </MDBCol>

                        <MDBCol md="4">
                            <Dropdown required value={this.state.genderType} options={gender} onChange={this.typeOfGender} placeholder="Gender" optionLabel="name" />
                        </MDBCol>

                        <MDBCol md="4">
                            <Dropdown value={this.state.hasChair} options={chair} onChange={this.chairRequired} placeholder="Wheelchair" optionLabel="name" />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">
                            <MDBInput
                                type="text"
                                id="materialFormRegisterPasswordEx7"
                                name="address"
                                label="Address"
                            />
                        </MDBCol>

                        <MDBCol md="4">
                            <br></br>
                        </MDBCol>

                        <MDBCol md="4">
                            <MDBInput
                                type="text"
                                id="materialFormRegisterPasswordEx8"
                                name="docNo"
                                label="DocumentNo"
                            />
                        </MDBCol>
                    </MDBRow>
                    <center>
                        <MDBBtn color="success" type="submit">
                            Save
                    </MDBBtn>
                    </center>
                </form>
            </div>
        )
    }
}

AddPassenger.propTypes = {
    savePassenger: PropTypes.func,
};

export default AddPassenger;