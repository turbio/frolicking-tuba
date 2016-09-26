//signup

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      companyName: ''
    };
  }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  // handleCompanyNameChange(event) {
  //   this.setState({ companyName: event.target.value });
  // }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form>
          <div>
            <label htmlFor="USERNAME">USERNAME</label>
            <input
              type="text"
              //value={this.state.username}
              onChange={(event) => {
                this.setState({ username: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="PASSWORD">PASSWORD</label>
            <input
              type="password"
              //value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="COMPANY">COMPANY</label>
            <input
              type="text"
              //value={this.state.companyName}
              onChange={(event) => {
                this.setState({ companyName: event.target.value });
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                this.props.callback(this.state);
              }}
            >Submit</button>
          </div>
          <Link to="/signin">Log In</Link>
        </form>
      </div>
    );
  }
}

Signup.propTypes = { callback: PropTypes.func };

export default Signup;
