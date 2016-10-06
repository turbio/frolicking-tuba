import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import EndpointsDropdown from './EndpointsDropdown.jsx';

import * as Actions from '../actions/AppActions';


const renderNameField = ({ input, label, type }) => (
  <fieldset className="form-group">
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label} className="form-control" type={type}
      />
    </div>
  </fieldset>
);

const renderEndpointsField = ({ input, label }) => {
  // placeholder check - replace with whether or not user has any endpoints first
  if (window.location.pathname.length < 4) {
    return (<select />);
  }

  return (<EndpointsDropdown select={input} label={label} />);
};


class CreateKeyModal extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    console.log(values, this.props, 'test');
    //this.props.handleEndpointSubmit()
    //this.props.signInUser(values, window.location.pathname);
  }

  close() {
    this.props.hideModal();
  }

  open() {
    this.props.showModal();
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
              component={renderNameField}
              className="form-control"
              type="text"
              label="Key Name"
              placeholder="Enter an API Key Name"
            />
            <Field
              name="endpoint"
              component={renderEndpointsField}
              className="form-control"
              type="text"
              label="Endpoint"
            />

            <button
              action="submit"
              className="btn btn-primary"
            >
              Sign In
            </button>
          </form>

        </Modal.Body>
      </Modal>
      );
  }
}

CreateKeyModal.propTypes = {
  keymodal: PropTypes.objectOf(PropTypes.any),
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  handleSubmit: PropTypes.func
};

renderNameField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  type: PropTypes.string
};

renderEndpointsField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string
};

const mapStateToProps = (state) => ({ keymodal: state.keymodal.showModal });

export default connect(mapStateToProps, Actions)(reduxForm(
  { form: 'endpoint' })(CreateKeyModal));

