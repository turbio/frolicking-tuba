import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  Router, Route, hashHistory, IndexRoute
} from 'react-router';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import Documentation from './components/Documentation.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';
import Create from './components/Create.jsx';
import App from './components/App.jsx';

const store = createStore(myApp);

// onEnter hook for Dashboard route
const dashboardOnEnter = (nextState, replace, callback) => {
  // check if authenticated
  fetch('/api/users/signedin', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((json) => {
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
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/create" component={Create} />
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
