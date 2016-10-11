import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import EndpointsDropdown from './EndpointsDropdown.jsx';
import AddNewEndpoint from './AddNewEndpoint.jsx';
import { renderTextField, validate } from './FormHelpers.jsx';


import * as Actions from '../actions/AppActions';

const parseValue = (value) => {
  let type = '';
  let endpointname = '';

  if (value.substring(0, value.indexOf(':')) === 'github') {
    type = 'github';
    endpointname = value.substring(value.indexOf(':') + 1, value.length);
  } else {
    type = 'url';
    if (value.indexOf(':') < 0) {
      endpointname = value;
    } else {
      endpointname
        = value.substring(value.indexOf(':') + 1, value.length);
    }
  }

  return [type, endpointname];
};

class CreateKeyModal extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderEndpointsField = this.renderEndpointsField.bind(this);
    this.addingnewendpoint = this.addingnewendpoint.bind(this);
  }

  componentWillMount() {
    this.props.fetchEndpoints();
  }

  handleFormSubmit(values) {
    const results = parseValue(values.endpoint);
    const endpointtype = results[0];
    const endpointname = results[1];

    this.props.createNewKey(values.keyname, endpointtype, endpointname);
  }


  addingnewendpoint() {
    this.props.addNewEndpt();
  }

  close() {
    this.props.hideModal();
  }

  renderEndpointsField({ input, label, type }) {
    // placeholder check
    // replace with whether or not user has any endpoints first
    // OR if selected "addendpoint" === true in store
    if (this.props.endpoints.length < 1 || this.props.addingNewEndpoint) {
      return (<AddNewEndpoint
        input={input}
        label={label}
        type={type}
        githubAuthState={this.props.githubAuthState}
      />);
    }

    return (<EndpointsDropdown
      input={input}
      label={label}
      endpoints={this.props.endpoints}
      useNewEndpoint={this.addingnewendpoint}
    />);
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
  createNewKey: PropTypes.func,
  fetchEndpoints: PropTypes.func,
  addNewEndpt: PropTypes.func,
  endpoints: PropTypes.oneOfType([null, React.PropTypes.array]),
  addingNewEndpoint: PropTypes.bool,
  githubAuthState: PropTypes.bool
};


const mapStateToProps = (state) => ({
  keymodal: state.keymodal.showModal,
  endpoints: state.keymodal.endpoints,
  addingNewEndpoint: state.keymodal.addingNewEndpoint,
  githubAuthState: state.keymodal.githubAuthStatus
});


export default connect(mapStateToProps, Actions)(reduxForm(
  { form: 'endpoint', validate })(CreateKeyModal));

