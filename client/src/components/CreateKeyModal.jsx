import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import EndpointsDropdown from './EndpointsDropdown.jsx';
import AddNewEndpoint from './AddNewEndpoint.jsx';
import { renderTextField, validate } from './FormHelpers.jsx';


import * as Actions from '../actions/AppActions';


class CreateKeyModal extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    //this.close = this.close.bind(this);
    this.renderEndpointsField = this.renderEndpointsField.bind(this);
  }

  componentDidMount() {
    //fetch endpoints
    //chechk github auth
    console.log('complifecycle', this.props);
    this.props.fetchEndpoints();
  }

  handleFormSubmit(values) {
    console.log(values, this.props, 'test');
    // call this.props.createNewKey(values.name, values.type, values.endpoint)
    //this.props.handleEndpointSubmit(values);
    //this.props.signInUser(values, window.location.pathname);
  }

  close() {
    this.props.hideModal();
  }

  renderEndpointsField({ input, label }) {
    //console.log(this.props.endpoints, 'keymodal');
    // placeholder check
    // replace with whether or not user has any endpoints first
    // OR if selected "addendpoint" === true in store
    if (!this.props.endpoints) {
      return (<AddNewEndpoint input={input} label={label} />);
    }

    return (<EndpointsDropdown
      input={input}
      label={label}
      endpoints={this.state.props.endpoints}
    />);
    //return (<AddNewEndpoint input={input} label={label} />);
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <Modal show={this.props.keymodal} onHide={() => this.close()}>
        <Modal.Header closeButton />
        <Modal.Body>

          <form onSubmit={handleSubmit(this.handleFormSubmit)}>

            <Field
              name="keyname"
              component={renderTextField}
              className="form-control"
              type="text"
              label="Key Name"
              placeholder="Enter an API Key Name"
            />
            <Field
              name="endpoint"
              component={this.renderEndpointsField}
              className="form-control"
              type="text"
              label="Endpoint"
            />

            <button
              action="submit"
              className="btn btn-primary"
            >
              Create Key
            </button>
          </form>

        </Modal.Body>
      </Modal>
      );
  }
}

CreateKeyModal.propTypes = {
  keymodal: PropTypes.bool,
  hideModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  //handleEndpointSubmit: PropTypes.func,
  fetchEndpoints: PropTypes.func,
  endpoints: PropTypes.oneOfType([null, React.PropTypes.array])
};


// renderEndpointsField.propTypes = {
//   input: PropTypes.objectOf(PropTypes.any),
//   label: PropTypes.string
// };

const mapStateToProps = (state) => ({
  keymodal: state.keymodal.showModal,
  endpoints: state.keymodal.endpoints
});


export default connect(mapStateToProps, Actions)(reduxForm(
  { form: 'endpoint', validate })(CreateKeyModal));

