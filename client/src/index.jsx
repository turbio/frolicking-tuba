import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  Router, Route, hashHistory, IndexRoute, withRouter
} from 'react-router';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';
import Documentation from './components/Documentation.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

const store = createStore(myApp);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  handleAuthSubmit({ username, password, companyName }, endpoint) {
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
      } else {
        this.router.push('/dashboard');
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
            handleAuthSubmit: this.handleAuthSubmit
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
const AppWrapper = withRouter(App);

// onEnter hook for Dashboard route
const dashboardOnEnter = (nextState, replace, callback) => {
  // check if authenticated
  fetch('/api/users/signedin', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    if (!json.signedin) {
      replace({ pathname: '/signin' });
    }
    callback();
  })
  .catch((error) => console.log('fetch /api/me error:', error));
};

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppWrapper}>
        <IndexRoute component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/welcome" component={Welcome} />
        <Route
          path="/dashboard"
          component={Dashboard}
          onEnter={dashboardOnEnter}
        />
        <Route path="/documentation" component={Documentation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
