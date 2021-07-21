import { MDBBtn } from "mdbreact";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PropTypes from 'prop-types';
import React, { Component } from "react";

export class EditSSR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealItem: this.props.services,
            showDialog: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ showDialog: true });
    };

    handleClose = () => {
        this.setState({ showDialog: false });
        let mealItem = this.state.mealItem.slice();
        let items = mealItem.filter(item => item.trim() !== "");
        this.setState({ mealItem: items });
    };

    handleChange = event => {
        let mealItem = this.state.mealItem.slice();
        mealItem[event.target.id] = event.target.value;
        this.setState({ mealItem: mealItem });
    };
    addNewMeal = () => {
        let mealItem = this.state.mealItem.slice();
        mealItem.push("");
        this.setState({ mealItem: mealItem });
    };
    handleDelete = event => {
        let mealItem = this.state.mealItem.slice();
        let deletedItem = mealItem[event.target.id];
        let items = mealItem.filter(item => item !== deletedItem);
        this.setState({ mealItem: items });
    };

    retriveMealItem = () => {
        let items = [];
        this.state.mealItem.map((item, index) =>
            items.push(
                <div key={index}>
                    <input
                        size="35"
                        autoFocus
                        margin="dense"
                        label=".Meals"
                        id={index}
                        type="text"
                        value={item}
                        onChange={this.handleChange} />
                    <MDBBtn
                        onClick={this.handleDelete}
                        id={index}>
                        {" \u00D7"}
                    </MDBBtn>
                </div>
            )
        );
        return items;
    };

    onHideDialog = () => {
        this.setState({ showDialog: false })
    }
    render() {
        return (
            <div>
                <Button label="Open" onClick={this.handleClickOpen} style={{ marginTop: "5em", width: 150, height: 50, fontFamily: 'Times New Roman', fontSize: 18 }} className="p-button-secondary" />

                <Dialog header={this.props.serviceName} visible={this.state.showDialog} style={{ width: '50vw' }} onHide={this.onHideDialog}>

                    {this.retriveMealItem()}
                    &nbsp;<Button label="Add" onClick={this.addNewMeal} style={{ backgroundColor: "#97bbe8", width: 100, height: 40, fontFamily: 'Times New Roman', fontSize: 16 }} className="p-button-secondary" />

                    &nbsp;<Button label="Save" onClick={event => {
                        event.preventDefault();
                        this.onHideDialog();
                        this.props.handleUpdateServices(this.state.mealItem, this.props.serviceName);
                    }} style={{ backgroundColor: "#12e01c", width: 100, height: 40, fontFamily: 'Times New Roman', fontSize: 16 }} className="p-button-secondary" />

                    &nbsp;<Button label="Cancel" onClick={this.handleClose} style={{ backgroundColor: '#fc3838', color: "white", width: 100, height: 40, fontFamily: 'Times New Roman', fontSize: 16 }} className="p-button-secondary" />

                </Dialog>
            </div>
        );
    }
}

EditSSR.propTypes = {
    services: PropTypes.array,
    serviceName: PropTypes.string,
    handleUpdateServices: PropTypes.func,
};
export default EditSSR;
