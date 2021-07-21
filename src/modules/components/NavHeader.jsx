import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBNavbar, MDBNavbarNav, MDBNavItem } from "mdbreact";
import PropTypes from 'prop-types';
import React from "react";
import image from '../../images/profile.jpg';
import '../../sass/NavBar.sass';

export default class NavHeader extends React.Component {

    render() {

        return (
            <div className="navcol">
                <MDBNavbar light expand="md" style={{ marginTop: "15px" }}>
                    <MDBNavbarNav left>
                        <MDBNavItem >
                            <i className="fas fa-plane-departure"></i>

                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav>

                        <MDBNavItem>
                            <h5 className="airlineText">
                                <b>
                                    <font color="#33ff33" face="verdana">

                                        <i className="fas fa-plane"></i>
                                        BENCH Airline Welcomes You..!!
                                        <i className="fas fa-plane"></i>

                                    </font>
                                </b>
                            </h5>

                        </MDBNavItem>

                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <i className="fas fa-plane-arrival"></i>
                            <font color="#ffffff"><h5>Profile</h5></font>
                        </MDBNavItem>

                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle className="dopdown-toggle" nav>
                                    <img src={image} className="rounded-circle z-depth-0"
                                        style={{ height: "35px", padding: 0 }} alt="Profile" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem>Account : {localStorage.getItem('token')}</MDBDropdownItem>
                                    <MDBDropdownItem>
                                        Username : {localStorage.getItem('userdetails')}                                    </MDBDropdownItem>
                                    <MDBDropdownItem>Email : {localStorage.getItem('email')}</MDBDropdownItem>
                                    <MDBDropdownItem onClick={() => { this.props.doLogout() }}>Log out</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBNavbar>
            </div>
        );
    }
}

NavHeader.propTypes = {
    doLogout: PropTypes.func,
};