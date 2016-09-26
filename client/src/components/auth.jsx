import React, { Component } from 'react';
import Login from './Signin.jsx';
import Signup from './Signup.jsx';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { signup: false };
  }

  // onLoginHandler({ username, password }) {
  //   console.log('username: ', username, 'password: ', password);
  // }

  // onSignupHandler({ username, password, companyName }) {
  //   console.log('username: ', username,
  //               'password: ', password,
  //               'companyName: ', companyName);
  // }

  toggleAuthView() {
    this.setState({ signup: !this.state.signup });
  }

  render() {
    if (this.state.signup) {
      return (<Signup
        callback={({ username, password }) => {
          console.log('username: ', username, 'password: ', password);
        }}
        toggleAuthView={() => this.toggleAuthView()}
      />);
    }

    return (<Login
      callback={({ username, password, companyName }) => {
        console.log('username: ', username,
                    'password: ', password,
                    'companyName: ', companyName);
      }}
      toggleAuthView={() => this.toggleAuthView()}
    />);
  }
}


export default Auth;
