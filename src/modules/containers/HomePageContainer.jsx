import React from 'react';
import RedirectPage from '../../utils/RedirectPage';
import HomePage from '../components/HomePage';

export default class HomePageContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showFlights: false,
            goToBack: false,
        }
    }

    showDetails = () => {
        this.setState({ showFlights: true })
    }

    goBack = () => {
        this.setState({ goToBack: true })
    }

    render() {
        if (this.state.showFlights) {
            return <RedirectPage redirectTo={'flight_dashboard'} />;
        }
        if (this.state.goToBack && localStorage.getItem('token') === 'airlineStaff') {
            return <RedirectPage redirectTo={'airlineStaff_Dashboard'} />;
        }
        return (
            <HomePage
                showDetails={this.showDetails}
                goBack={this.goBack} />
        )
    }
}