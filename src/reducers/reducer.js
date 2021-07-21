
const iState = {
    flightId: '',

    flightsData: ''
}


const reducer = (state = iState, action) => {
    if (action.type === 'id') {
        return {
            flightId: action.payload
        }
    }
    if (action.type === 'flight') {

        return {
            flightsData: action.payload
        }
    }
    return state;
}

export default reducer;