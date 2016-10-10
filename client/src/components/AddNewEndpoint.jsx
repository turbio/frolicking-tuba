import React, { PropTypes } from 'react';


const AddNewEndpoint = ({ input, label, type, githubAuthState }) => {

  const field = () => (
    <fieldset className="form-group">
      <label className="control-label" htmlFor="control-label">{label}</label>
      <div>
        <input
          {...input}
          placeholder="Enter a URL"
          className="form-control" type={type}
        />
      </div>
    </fieldset>
  );

//PLACEHOLDERif they have a github auth, only show
//a url input box
  console.log(githubAuthState, 'authstate');

  if (githubAuthState) {
    return (
      <div>
        { field() }
      </div>
      );
  }
//else show url input box and linkgithub button

  return (
    <div>
      { field() }
      <div>
        <div> ---OR--- </div>
        <br />
        <a
          href="/api/integrations/github"
          className="btn btn-default"
        >Link Github
        </a>
      </div>
      <br />
    </div>
   );
};

AddNewEndpoint.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  type: PropTypes.string,
  githubAuthState: PropTypes.bool
};


export default AddNewEndpoint;

