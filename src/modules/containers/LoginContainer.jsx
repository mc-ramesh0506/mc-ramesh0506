import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-default.css';
import { getLoginDetails } from '../../axios/GetDetails';
import RedirectPage from '../../utils/RedirectPage';
import { LoginPage } from '../components/LoginPage';


export default class LoginContainer extends React.Component {

    isDataEntered = false;
    constructor(props) {
        super(props)
        this.state = {
            dataSubmited: false,
            email: '',
            password: '',
            loggedIn: false
        }
        this.responseGoogle = this.responseGoogle.bind(this)
    }

    doLogin = (emailId, pass) => {
        this.isDataEntered = true;
        this.setState({
            email: emailId,
            password: pass
        })
    }

    responseGoogle = (response) => {

        localStorage.setItem("token", "airlineStaff")
        localStorage.setItem('userdetails', response.w3.ig)
        localStorage.setItem('email', response.profileObj.email)
        this.setState({
            loggedIn: true,
            dataSubmited: true
        })
    }

    validateLogin = () => {

        const details = getLoginDetails(this.state.email, this.state.password)

        details.then((data) => {
            if (data.length === 1) {
                localStorage.setItem('userdetails', data[0].firstName + ' ' + data[0].lastName);
                localStorage.setItem('email', data[0].email);
                localStorage.setItem('token', data[0].type)
                this.setState({ dataSubmited: true })
            }
            else {
                Alert.error('<h5>Please Login with Valid Password and Email..!!</h5>', {
                    position: 'top-right',
                    effect: 'genie',
                    timeout: 2000
                });
            }
        })
    }

    render() {

        if (this.state.dataSubmited) {
            if (localStorage.getItem('token') === 'airlineStaff') {
                return <RedirectPage redirectTo='airlineStaff_Dashboard' />;
            }
            return <RedirectPage redirectTo={localStorage.getItem('token')} />;
        }
        else if (localStorage.getItem('token') !== null) {
            if (!this.state.loggedIn) {
                Alert.warning('<h5>Already logged in....</h5>', {
                    position: 'top-right',
                    effect: 'genie',
                    timeout: 2000
                });
            }
            if (localStorage.getItem('token') === 'airlineStaff') {
                return <RedirectPage redirectTo='airlineStaff_Dashboard' />;
            }
            return <RedirectPage redirectTo={localStorage.getItem('token')} />;
        }
        if (this.isDataEntered) {
            this.validateLogin()
        }

        return (
            <div>
                <Alert timeout={2000} html={true} />
                <LoginPage
                    doLogin={this.doLogin}
                    responseGoogle={this.responseGoogle} />
            </div>
        )
    }

}
