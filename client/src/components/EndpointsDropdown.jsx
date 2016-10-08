import React, { PropTypes } from 'react';

const EndpointsDropdown = ({ input, label, endpoints }) => (
  <fieldset className="form-group">
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <select
        {...input}
        className="form-control"
      >
        <option disabled selected> Select an Endpoint</option>
        {
          endpoints.map((endpoint) =>
            <option value={endpoint}>{endpoint}</option>
          )
        }
        <option value="ff0000">TestingRed</option>
        <option value="url:http://localhost:3000/dashboard">Green</option>
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
  label: PropTypes.string,
  endpoints: PropTypes.arrayOf(PropTypes.string)
};

export default EndpointsDropdown;

//onChange={(el) => console.log(el.target.value, 'test')}
