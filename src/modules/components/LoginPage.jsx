import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import "mdbreact/dist/css/mdb.css";
import PropTypes from 'prop-types';
import React from 'react';
import GoogleLogin from 'react-google-login';
import '../../sass/LandingPage.sass';
import '../../sass/LoginPage.sass';

export class LoginPage extends React.Component {

  render() {
    return (
      <div className="landingPage">
        <MDBContainer>
          <MDBRow>
            <br />
            <br />
          </MDBRow>
          <MDBRow center>
            <MDBCol md="6">
              <MDBCard style={{ backgroundColor: "#005070" }}>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <font color="#f7f6f6"><strong>Sign in</strong></font>
                    </h3>
                  </div>
                  <MDBInput style={{ color: "#f7f6f6" }} label="Your email" group type="email" validate error="wrong" success="right"
                    inputRef={(email) => this.emailId = email} />

                  <MDBInput style={{ color: "#f7f6f6" }} label="Your password" group type="password" validate containerClass="mb-0"
                    inputRef={(pass) => this.password = pass} />
                  <div className="text-center mb-3">
                    <MDBBtn style={{ color: "#f7f6f6" }} type="button" gradient="blue" rounded className="btn-block z-depth-1a" onClick={(e) => { e.preventDefault(); this.props.doLogin(this.emailId.value, this.password.value) }}>
                      Sign in
                      </MDBBtn>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    <font color="#f7f6f6">or Sign in with:</font>
                  </p>

                  <div className="row my-3 d-flex justify-content-center">

                    <GoogleLogin
                      clientId="769432167633-k5qb3p2s29cintlcbj0c6a4vtrta5h2a.apps.googleusercontent.com"
                      theme='dark'
                      buttonText='Google'

                      onSuccess={this.props.responseGoogle}
                      onFailure={this.props.responseGoogle}
                      cookiePolicy={'single_host_origin'} />

                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )
  }
}

LoginPage.propTypes = {
  responseGoogle: PropTypes.func,
  doLogin: PropTypes.func
};