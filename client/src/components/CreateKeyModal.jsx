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
    this.addingnewendpoint = this.addingnewendpoint.bind(this);
  }

  componentDidMount() {
    //fetch endpoints
    //chechk github auth
    console.log('complifecycle', this.props);
    this.props.fetchEndpoints();
  }

  handleFormSubmit(values) {
    console.log('values submitted are:', values);
    // call this.props.createNewKey(values.name, values.type, values.endpoint)
    //this.props.handleEndpointSubmit(values);
    //this.props.signInUser(values, window.location.pathname);
  }

  addingnewendpoint() {
    console.log('does it reach here?');
    this.props.addNewEndpt();
  }

  close() {
    this.props.hideModal();
  }

  renderEndpointsField({ input, label }) {
    //console.log(this.props.endpoints, 'keymodal');
    // placeholder check
    // replace with whether or not user has any endpoints first
    // OR if selected "addendpoint" === true in store
    // if (!this.props.endpoints || this.props.addingNewEndpoint) {
    if (this.props.addingNewEndpoint) {

      return (<AddNewEndpoint input={input} label={label} />);
      // return (<EndpointsDropdown
      //   input={input}
      //   label={label}
      //   //endpoints={this.state.props.endpoints}
      //   endpoints={['string1', 'string2']}
      //   runFunc={this.addingnewendpoint}
      // />);
    }

    return (<EndpointsDropdown
      input={input}
      label={label}
      //   //endpoints={this.state.props.endpoints}
      endpoints={['string1', 'string2']}
      runFunc={this.addingnewendpoint}
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
  addNewEndpt: PropTypes.func,
  endpoints: PropTypes.oneOfType([null, React.PropTypes.array]),
  addingNewEndpoint: PropTypes.bool
};


// renderEndpointsField.propTypes = {
//   input: PropTypes.objectOf(PropTypes.any),
//   label: PropTypes.string
// };

const mapStateToProps = (state) => ({
  keymodal: state.keymodal.showModal,
  endpoints: state.keymodal.endpoints,
  addingNewEndpoint: state.keymodal.addingNewEndpoint
});


export default connect(mapStateToProps, Actions)(reduxForm(
  { form: 'endpoint', validate })(CreateKeyModal));

