import React from 'react';
import RedirectPage from "../../utils/RedirectPage";
import NavHeader from "../components/NavHeader";

export default class HeaderContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logout: false
        }
    }
    doLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userdetails')
        localStorage.removeItem('email')
        localStorage.removeItem('oldSeat')
        localStorage.removeItem('airline')
        localStorage.removeItem('state')
        this.setState({ logout: true })

    }
    render() {
        if (localStorage.getItem('token') === null) {
            return <RedirectPage redirectTo={localStorage.getItem('token')} />;
        }
        return (
            <NavHeader doLogout={this.doLogout} />
        )
    }
}