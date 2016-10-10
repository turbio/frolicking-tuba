import React, { PropTypes } from 'react';

const EndpointsDropdown = ({ input, label, endpoints, useNewEndpoint }) => (
  <fieldset className="form-group">
    <label className="control-label" htmlFor="control-label">{label}</label>
    <div>
      <select
        {...input}
        id="endpointsdropdown"
        onChange={(el) => {
          console.log(el.target.value, el.target, 'test');

          if (el.target.value === 'useNewEndpoint') {
            useNewEndpoint();
            //change so that the useNewEndpoint is not the default selection
          } else {
            input.onChange(el);
          }
        }
        }
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
        <option value="ff0000">TestingRed</option>
        <option value="0000ff">Blue</option>
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

