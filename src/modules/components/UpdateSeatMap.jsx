import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import React from 'react';
import '../../sass/SeatMap.sass';

class UpdateSeatMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seatNo: '',
            color: '',
            savebutton: true,
        }
    }
    onSeatSelect = (value) => {
        if (!this.props.occupiedSeat.includes(value)
            && !this.props.wheelchair.includes(value)
            && !this.props.infant.includes(value)
            && !this.props.wheelchair_infant.includes(value)
            && !this.props.specialMeal.includes(value)
        ) {
            this.setState({ savebutton: false, seatNo: value })
        }
        else {
            this.setState({ seatNo: value, savebutton: true })
        }
    }

    render() {

        const rowCount = 10;
        const colCount = 6;
        let seatMap = [];

        for (let i = 1; i < (rowCount + 1); i++) {
            for (let j = 1; j < (colCount + 1); j++) {
                let newSeatNo = i + '' + String.fromCharCode('A'.charCodeAt() + j - 1);
                var isSpace = false;
                if (newSeatNo.length <= 2) {
                    isSpace = true
                }

                if (!this.props.occupiedSeat.includes(newSeatNo) && !this.props.wheelchair.includes(newSeatNo)
                    && !this.props.infant.includes(newSeatNo) && !this.props.wheelchair_infant.includes(newSeatNo)
                    && !this.props.specialMeal.includes(newSeatNo)
                ) {

                    if (j % 10 === 0) {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo"
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat"
                                    style={{
                                        backgroundColor: this.state.seatNo === newSeatNo ? 'blue' : '#7fa5ba',
                                        color: this.state.seatNo === newSeatNo ? 'white' : 'black'
                                    }}>
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                            <br className="clearBoth" /></div>)
                    }
                    else {
                        seatMap.push(<div key={newSeatNo}>
                            <div className="outer-seat" id="div-inline"
                                onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat" style={{
                                    backgroundColor: this.state.seatNo === newSeatNo ? 'blue' : '#7fa5ba',
                                    color: this.state.seatNo === newSeatNo ? 'white' : 'black'
                                }}>
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div></div>);
                    }
                }
                else {
                    if (this.props.wheelchair.includes(newSeatNo)) {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo" style={{
                                backgroundColor: 'green',
                                color: 'white'
                            }}
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat">
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                        </div>)
                    }
                    else if (this.props.infant.includes(newSeatNo)) {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo" style={{
                                backgroundColor: '#eb21d3',
                                color: 'white'
                            }}
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat">
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                        </div>)
                    }
                    else if (this.props.wheelchair_infant.includes(newSeatNo)) {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo" style={{
                                backgroundColor: '#840bb8',
                                color: 'white'
                            }}
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat">
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                        </div>)
                    }
                    else if (this.props.specialMeal.includes(newSeatNo)) {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo" style={{
                                backgroundColor: 'orange',
                                color: 'white'
                            }}
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat">
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                        </div>)
                    }
                    else {
                        seatMap.push(<div key={newSeatNo}>
                            <div disabled={true} name="seatNo" style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}
                                className="outer-seat" id="div-inline" onClick={this.onSeatSelect.bind(this, newSeatNo)}>
                                <div className="inner-seat">
                                    {(isSpace) ? <span>&nbsp;&nbsp;</span> : null}{newSeatNo}
                                </div>
                            </div>
                        </div>)
                    }

                }
            }
        }
        return (
            //here add flight id as key anc check now
            <div>
                <div className="row" style={{ display: localStorage.getItem('airline') === 'checkin' ? '' : 'none' }}>
                    &nbsp;
                    <div className="col-md-1">
                        <div
                            style={{
                                backgroundColor: 'green',
                                width: '20px',
                                height: '20px'

                            }}>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <b>- Wheelchair</b>
                    </div>

                    <div className="col-md-1">
                        <div
                            style={{
                                backgroundColor: '#eb21d3',
                                width: '20px',
                                height: '20px'
                            }}>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <b>- Infant</b>
                    </div>

                    <div className="col-md-1">
                        <div
                            style={{
                                backgroundColor: 'red',
                                width: '20px',
                                height: '20px'
                            }}>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <b>- Occypied Seat</b>
                    </div>
                </div>
                <div className="row">
                    &nbsp;
                    <div className="col-md-1" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }}>
                        <div
                            style={{
                                backgroundColor: 'orange',
                                width: '20px',
                                height: '20px'
                            }}>
                        </div>
                    </div>
                    <div className="col-md-3" style={{ display: localStorage.getItem('airline') === 'inflight' ? '' : 'none' }}>
                        <b>- Special Meal</b>
                    </div>
                    <div className="col-md-1" style={{ display: localStorage.getItem('airline') === 'checkin' ? '' : 'none' }}>
                        <div
                            style={{
                                backgroundColor: '#840bb8',
                                width: '20px',
                                height: '20px'
                            }}>
                        </div>
                    </div>
                    <div className="col-md-3" style={{ display: localStorage.getItem('airline') === 'checkin' ? '' : 'none' }}>
                        <b>- Wheelchair+Infant</b>
                    </div>
                </div>

                <br></br>

                {seatMap}

                <div className="p-col-6 p-offset-3">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button label="Save" style={{ width: '300px', display: localStorage.getItem('airline') === 'checkin' ? '' : 'none' }} hidden={this.state.savebutton} className="p-button-success" onClick={(e) => { e.preventDefault(); this.props.onSave(this.state.seatNo) }} />
                </div>

            </div >
        )
    }
}

UpdateSeatMap.propTypes = {
    wheelchair: PropTypes.array,
    wheelchair_infant: PropTypes.array,
    specialMeal: PropTypes.array,
    occupiedSeat: PropTypes.array,
    infant: PropTypes.array,
    onSave: PropTypes.func,
};


export default UpdateSeatMap;