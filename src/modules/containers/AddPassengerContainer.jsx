import PropTypes from 'prop-types';
import React from 'react';
import { savePassenger } from '../../axios/GetDetails';
import AddPassenger from '../components/AddPassenegr';

class AddPassengerContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            flightIdValue: this.props.flightId,
            paxSaved: false,
            pax: {}
        }
    }

    savePassenger = (fname, lname, dob, email, gender, mob, country, wheelChair, infant, docNo, address) => {

        savePassenger(fname, lname, dob, email, gender, mob, country, this.state.flightIdValue, wheelChair, infant, docNo, address);
        let savedPax = {
            "flightId": this.state.flightIdValue,
            "first_name": fname,
            "last_name": lname,
            "date_of_birth": dob,
            "gender": gender,
            "email_id": email,
            "mobile_no": mob,
            "country": country,
            "date_of_travel": "",
            "seat_no": "-",
            "travel_document": docNo,
            "wheelChair": wheelChair,
            "infant": infant,
            "status": "NC",
            "id": '',
            "address": address
        }
        this.props.onPaxSave(savedPax)
        this.setState({ paxSaved: true, pax: savedPax })
    }
    render() {

        return (
            <AddPassenger savePassenger={this.savePassenger} />
        )
    }
}

AddPassengerContainer.propTypes = {
    onPaxSave: PropTypes.func,
    flightId: PropTypes.string,
};

export default AddPassengerContainer;