import React, { PropTypes } from 'react';

const EndpointsDropdown = ({ input, label }) => (
  <fieldset className="form-group">
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <select
        {...input}
        className="form-control"
        onChange={(el) => console.log(el.target.value, 'test')}
      >
        <option disabled selected> Select an Endpoint</option>
        <option value="ff0000">Red</option>
        <option value="00ff00">Green</option>
        <option value="0000ff">Blue</option>
        <hr />
        <option
          value="0000ff"
        >Use New Endpoint
        </option>
      </select>
    </div>
  </fieldset>
);

EndpointsDropdown.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string
};

export default EndpointsDropdown;
