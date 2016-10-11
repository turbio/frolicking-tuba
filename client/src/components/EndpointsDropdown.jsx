import React, { PropTypes } from 'react';

const EndpointsDropdown = ({ input, label, endpoints, useNewEndpoint }) => (
  <fieldset className="form-group">
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <select
        {...input}
        id="endpointsdropdown"
        onChange={(el) => {
          if (el.target.value === 'useNewEndpoint') {
            useNewEndpoint();
          }
          input.onChange(el);
        }}
        className="form-control"
      >
        <option disabled selected> Select an Endpoint</option>
        {
          endpoints.map((endpoint) =>
            <option
              value={`${endpoint.type}:${endpoint.name}`}
            >{endpoint.name}</option>
          )
        }
        <hr />
        <option
          value="useNewEndpoint"
        >Use New Endpoint
        </option>
      </select>
    </div>
  </fieldset>
);

EndpointsDropdown.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  endpoints: PropTypes.arrayOf(PropTypes.string),
  useNewEndpoint: PropTypes.func
};

export default EndpointsDropdown;

