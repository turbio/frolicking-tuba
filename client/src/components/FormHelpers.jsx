import React, { PropTypes } from 'react';


export const renderTextField
  = ({ input, label, type, meta: { touched, error } }) => (
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

export const validate = (values) => {
  const errors = {};

  //used to validate signin form
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if
  (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  //used to validate api key modal
  if (!values.keyname) {
    errors.keyname = 'Please enter an API keyname.';
  }

  return errors;
};

renderTextField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any)
};
