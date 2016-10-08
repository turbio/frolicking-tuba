import React, { PropTypes } from 'react';


const AddNewEndpoint = ({ input, label, type }) => {
//PLACEHOLDERif they have a github auth, only show
//a url input box
  if (!input) {
    return (<div />);
  }
//else show url input box and linkgithub button

  return (
    <div>
      <fieldset className="form-group">
        <label className="control-label" htmlFor="control-label">{label}</label>
        <div>
          <input
            {...input}
            placeholder={label}
            className="form-control" type={type}
          />
        </div>
      </fieldset>

      <div>
        <a
          href="/api/integrations/github"
          className="btn btn-default"
        >Link Github
        </a>
      </div>
    </div>
   );
};

AddNewEndpoint.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  type: PropTypes.string
};

export default AddNewEndpoint;

