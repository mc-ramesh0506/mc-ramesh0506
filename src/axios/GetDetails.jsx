import axios from 'axios';
import { FLIGHT_DETAILS_URL, LOGIN_DETAILS_URL, PASSENGER_DETAILS_URL } from '../config/urls';


export const getLoginDetails = async (emailId, password) => {

    return await axios.get(LOGIN_DETAILS_URL, {
        params: {
            email: emailId,
            password: password
        }
    }).then(resp => resp.data)
}

export const getFlightDetails = async () => {
    return await axios.get(FLIGHT_DETAILS_URL).then(resp => resp.data)

}

export const getFlightDataForId = async (value) => {
    return await axios.get(FLIGHT_DETAILS_URL, {
        params: {
            id: value
        }
    }).then(resp => resp.data)

}

export const getPaxDataForId = async (value) => {
    return await axios.get(PASSENGER_DETAILS_URL + '/' + value).then(resp => resp.data)
}

export const getPassengerDataForGiveFlight = async (id) => {
    return await axios.get(PASSENGER_DETAILS_URL, {
        params: {
            flightId: id
        }
    }).then(resp => resp.data)

}
export const getPassengerSeatDataForGiveFlight = async (id) => {
    if (id !== null) {
        return await axios.get(PASSENGER_DETAILS_URL, {
            params: {
                flightId: id
            }
        }).then((resp) => {
            let paxSeatInfo = [];

            for (const arr of resp.data) {

                if (arr.status !== 'NC') {

                    let seatInfo = {
                        key: '',
                        data: '',
                    }
                    seatInfo.key = arr.seat_no;
                    if (arr.meals.length > 0 && localStorage.getItem('airline') === 'inflight') {
                        seatInfo.data = 'MEAL'
                    }
                    else if(localStorage.getItem('airline') === 'checkin') {

                        if (arr.wheelChair === 'Yes' || arr.infant === 'Yes') {
                            if (arr.wheelChair === 'Yes')
                                seatInfo.data = 'WC'
                            if (arr.infant === 'Yes')
                                seatInfo.data = 'INF'
                            if (arr.wheelChair === 'Yes' && arr.infant === 'Yes')
                                seatInfo.data = 'WCINF'
                        }
                        else {
                            seatInfo.data = 'OCPY'
                        }
                    }
                    
                    paxSeatInfo.push(seatInfo);
                }
            }

            return paxSeatInfo
        })
    }

}

export const setSSRtoPax = async (id, serviceName, data) => {
    if (serviceName === 'Ancillary Service') {
        const PassengerDetails = {
            special_service: data
        };
        axios.patch(PASSENGER_DETAILS_URL + '/' + id, PassengerDetails).then(response => {  return response.data })
    }
    if (serviceName === 'Meals') {
        const PassengerDetails = {
            meals: data
        };
        axios.patch(PASSENGER_DETAILS_URL + '/' + id, PassengerDetails).then(response => { return response.data })
    }
    if (serviceName === 'Flight Shop') {
        const PassengerDetails = {
            flight_shop: data
        };
        axios.patch(PASSENGER_DETAILS_URL + '/' + id, PassengerDetails).then(response => { return response.data })
    }
}

export const updateSSR = async (id, serviceName, data) => {

    if (serviceName === 'Ancillary Service') {
        const flightLists = {
            special_service: data
        };
        axios.patch(FLIGHT_DETAILS_URL + '/' + id, flightLists).then(response => { return response.data })
    }
    if (serviceName === 'Meals') {
        const flightLists = {
            meals: data
        };
        axios.patch(FLIGHT_DETAILS_URL + '/' + id, flightLists).then(response => { return response.data })
    }
    if (serviceName === 'Flight Shop') {
        const flightLists = {
            flight_shop: data
        };
        axios.patch(FLIGHT_DETAILS_URL + '/' + id, flightLists).then(response => { return response.data })
    }

}

export const getSSRForFlight = async (id) => {
    return await axios.get(FLIGHT_DETAILS_URL + '/' + id).then(resp => {
        return resp.data.special_service
    })
}
export const getMealsForFlight = async (id) => {
    return await axios.get(FLIGHT_DETAILS_URL + '/' + id).then(resp => {
        return resp.data.meals
    })
}
export const getFlightShopForFlight = async (id) => {
    return await axios.get(FLIGHT_DETAILS_URL + '/' + id).then(resp => {
        return resp.data.flight_shop
    })
}

export const savePassenger = async (fname, lname, dob, email, gender, mob, country, flightId, wheelChair, infant, travelDoc, address) => {

    return await axios.post(PASSENGER_DETAILS_URL, {
        "flightId": flightId,
        "first_name": fname,
        "last_name": lname,
        "date_of_birth": dob,
        "gender": gender,
        "email_id": email,
        "mobile_no": mob,
        "country": country,
        "date_of_travel": "",
        "seat_no": "-",
        "travel_document": travelDoc,
        "wheelChair": wheelChair,
        "infant": infant,
        "status": "NC",
        "address": address,
        "meals": [],
        "special_service": [],
        "flight_shop": [],
    }).then(function (response) { return response.data}).catch(function (error) {
        return error;
    })
}

export const updatePassenger = async (fname, lname, dob, email, gender, mob, country, id, travelDoc, address) => {
    
    const PassengerDetails = {
        first_name: fname,
        last_name: lname,
        date_of_birth: dob,
        gender: gender,
        email_id: email,
        mobile_no: mob,
        country: country,
        travel_document: travelDoc,
        address: address
    }
    return axios.patch(PASSENGER_DETAILS_URL + '/' + id, PassengerDetails);
}
