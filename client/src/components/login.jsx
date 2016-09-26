//login

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  render() {
    return (
      <form>
        <div>
          <label htmlFor="USERNAME">USERNAME</label>
          <input
            name="USERNAME"
            type="text"
            value={this.state.username}
            onChange={(event) => {
              this.setState({ username: event.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="PASSWORD">PASSWORD</label>
          <input
            name="PASSWORD"
            type="password"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
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
          >Log In</button>
        </div>
        <Link to="/signup">Sign Up</Link>
      </form>
    );
  }
}

Login.propTypes = { callback: PropTypes.func };

export default Login;
