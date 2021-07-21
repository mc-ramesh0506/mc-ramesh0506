import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { updatePassenger } from '../../axios/GetDetails';

class EditPaxContainer extends React.Component {

    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            paxUpdated: false,
            pax: this.props.pax,
        }
    }
    savePassenger = (pax, fname, lname, dob, email, gender, mob, country, docType, docNo, address) => {
        let updatedPax = [];
        this._isMounted = true;
        updatedPax = updatePassenger(fname, lname, dob, email, gender, mob, country, this.props.pax.id, docNo, address);
        updatedPax.then(response => {
            this.props.onPaxUpdate(response.data, true)
            if (this._isMounted) {
                this.setState({ paxUpdated: true, pax: response.data })
            }
        })
    }


    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const EditPassenger = React.lazy(() => import('../components/EditPassenger'));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <EditPassenger pax={this.state.pax} savePassenger={this.savePassenger} />
            </Suspense>
        )

    }
}

EditPaxContainer.propTypes = {
    pax: PropTypes.object,
    onPaxUpdate: PropTypes.func
};
export default EditPaxContainer;