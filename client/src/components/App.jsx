import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NavbarContainer from '../containers/NavbarContainer';
import { handleAuthSubmit } from '../actions/AppActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  // handleAuthSubmit({ username, password, companyName }, endpoint) {
  //   const url = `/api/${endpoint}`;
  //   const data = {
  //     email: username,
  //     password
  //   };

  //   const headers = new Headers();

  //   headers.append('Content-Type', 'application/json');

  //   fetch(url, {
  //     method: 'POST',
  //     headers,
  //     credentials: 'same-origin',
  //     body: JSON.stringify(data)
  //   })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     if (json.error) {
  //       console.log(json);
  //     } else {
  //       this.router.push('/dashboard');
  //     }
  //   })
  //   .catch((error) => console.log('fetch error:', error));
  // }
  render() {
    return (
      <div>
        <NavbarContainer
          loggedIn={this.state.loggedIn}
          //dispatch={this.props.dispatch}
        />
        {this.props.children && React.cloneElement(
          this.props.children, {
            loggedIn: this.state.loggedIn,
            //loggedIn: this.props.data.loggedIn,
            handleAuthSubmit
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
// export default withRouter(App);

// Which props do we want to inject, given the global state?
const select = (state) => ({ data: state });

// Wrap the component to inject dispatch and state into it
// export const AppContainer = connect(select)(App);
const AppContainer = connect(select)(App);

