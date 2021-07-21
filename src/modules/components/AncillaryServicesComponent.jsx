import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { MDBContainer, MDBRow } from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 15px;
  margin-left: 13em;
  margin-top : 4em;
  padding: 0.50em 5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


export default class AncillaryServiceComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            personName: props.services,

        }
    }

    handleChange = event => {
        this.setState({ personName: event.target.value })
    };

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <FormControl>
                            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                            <Select
                                id="demo-mutiple-name"
                                multiple
                                value={this.state.personName}
                                onChange={this.handleChange}
                                input={<Input />}
                            >
                                {this.props.ssr.map(name => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </MDBRow>
                    <MDBRow>
                        <Button onClick={(event) => { event.preventDefault(); this.props.saveData(this.state.personName, this.props.serviceName) }}>Save</Button>
                    </MDBRow>
                </MDBContainer>
            </div >
        )
    }
}

AncillaryServiceComponent.propTypes = {
    saveData: PropTypes.func,
    ssr: PropTypes.array,
    services: PropTypes.array,
    serviceName: PropTypes.string
};
