import React from 'react';
import { withRouter, browserHistory } from 'react-router';
import NavbarContainer from '../containers/NavbarContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      alert: false,
      alert_msg: 'test'
    };
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
  }

  dismissAlert() {
    this.setState({ alert: false });
  }

  handleAuthSubmit({ username, password, companyName }, endpoint) {
    this.setState({ alert: false });
    const url = `/api/${endpoint}`;
    const data = {
      email: username,
      password
    };

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    fetch(url, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        console.log(json);
        this.setState({ alert: true });
        this.setState({ alert_msg: json.error });
      } else {
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => console.log('fetch error:', error));
  }
  render() {
    return (
      <div>
        <NavbarContainer loggedIn={this.state.loggedIn} />
        {this.props.children && React.cloneElement(
          this.props.children, {
            loggedIn: this.state.loggedIn,
            handleAuthSubmit: this.handleAuthSubmit,
            alert: this.state.alert,
            alert_msg: this.state.alert_msg,
            dismissAlert: this.dismissAlert
          }
        )}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default withRouter(App);
