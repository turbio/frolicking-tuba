import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if
  (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label} className="form-control" type={type}
      />
      {touched && error
        && <div className="help-block">{error}</div>}
    </div>
  </fieldset>
);


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {

    this.props.signInUser(values, window.location.pathname);

  }

  renderAuthenticationError() {
    if (typeof this.props.authenticationError === 'string') {
      return (<div className="alert alert-danger">
        { this.props.authenticationError }
      </div>);
    }

    return <span />;
    // return <div />;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        { this.renderAuthenticationError() }

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            name="email"
            component={renderField}
            className="form-control"
            type="text"
            label="Email"
          />
          <Field
            name="password"
            component={renderField}
            className="form-control"
            type="password"
            label="Password"
          />

          <button
            action="submit"
            className="btn btn-primary"
          >
            Sign In
          </button>
        </form>
      </div>

   );
  }
}

AuthForm.propTypes = {
  signInUser: PropTypes.func,
  authenticationError: PropTypes.oneOfType([null, React.PropTypes.string]),
  handleSubmit: PropTypes.func
};

renderField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any)
};

const mapStateToProps = (state) => (
  { authenticationError: state.auth.error }
);


export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validate
})(AuthForm));
