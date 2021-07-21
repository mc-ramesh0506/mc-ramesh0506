import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import image from '../../images/flight_home.jpg';
import '../../sass/Background.sass';
import HeaderContainer from "../containers/HeaderContainer";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  margin-left :4em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


export default class HomePage extends React.Component {
  render() {

    return (
      <div className="overlay"><HeaderContainer></HeaderContainer>
        <MDBContainer>
          <MDBRow>
            <br>
            </br>
            <br>
            </br>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4"></MDBCol>
            <MDBCol md="5">
              <MDBCard style={{ width: "18rem", borderRadius: "70px" }}>
                <MDBCardImage className="img-fluid" style={{ width: "200px", marginLeft: "2.5em", height: "150px", borderRadius: "50px" }} src={image} waves />
                <MDBCardBody>
                  <MDBCardTitle>Flight Details</MDBCardTitle>
                  <MDBCardText style={{ size: '14' }}>
                    Flight Details will have all the information about flights. And you can see passenger details for particular flight.
                  </MDBCardText>
                  <Button onClick={() => { this.props.showDetails() }}>Show Details</Button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4"></MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBBtn style={{ display: localStorage.getItem('token') !== 'admin' ? '' : 'none' }} onClick={(event) => { event.preventDefault(); this.props.goBack() }} > &#x21A9;&nbsp;Go Back</MDBBtn>
      </div>
    )
  }
}

HomePage.propTypes = {
  showDetails: PropTypes.func,
  goBack: PropTypes.func,
};