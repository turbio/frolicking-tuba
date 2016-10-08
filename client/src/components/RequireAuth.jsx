import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(WrappedComponent) {
  class Auth extends React.Component {
    componentWillMount() {

      if (!this.props.authenticated) {
        let hasLocalStorageUser = false;

        if (localStorage.token) {
          hasLocalStorageUser = true;
        }

        console.log(hasLocalStorageUser, localStorage.token, 'haslocalstorage');

        // for (let key in localStorage) {
        //   if (key.startsWith("firebase:authUser:")) {
        //     hasLocalStorageUser = true;
        //   }
        // }

        if (!hasLocalStorageUser) {
          browserHistory.push('/signin');
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Auth.propTypes = { authenticated: PropTypes.bool };


  const mapStateToProps
    = (state) => ({ authenticated: state.auth.authenticated });

  return connect(mapStateToProps)(Auth);
}

