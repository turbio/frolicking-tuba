import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Landing from './components/Landing.jsx';
import Documentation from './components/Documentation.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Create from './components/Create.jsx';
import CreateStart from './components/CreateStart.jsx';
import CreateGithub from './components/CreateGithub.jsx';
import Welcome from './components/Welcome.jsx';

import myApp from './reducers';

const store = createStore(myApp);

const checkAuth = (callback) => {
  fetch('/api/users/signedin', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((json) => {
    callback(null, json.signedin);

    return;
  })
  .catch((error) => console.log('fetch /api/me error:', error));
};

// onEnter hook for Dashboard route
const dashboardOnEnter = (nextState, replace, callback) => {
  // check if authenticated
  checkAuth((err, signedin) => {
    if (err) {
      console.log(err);
    }
    if (!signedin) {
      replace({ pathname: '/signin' });
    }
    callback();
  });
};

const createOnEnter = (nextState, replace, callback) => {
  // check if authenticated
  checkAuth((err, signedin) => {
    if (err) {
      console.log(err);
    }
    if (!signedin) {
      replace({ pathname: '/signin' });
    }
    callback();
  });
};

const githubOnEnter = (nextState, replace, callback) => {
  console.log('test githubOnEnter');
  callback();
};

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/create" component={Create} onEnter={createOnEnter}>
          <IndexRoute component={CreateStart} />
          <Route
            path="github" component={CreateGithub} onEnter={githubOnEnter}
          />
        </Route>
        <Route
          path="/dashboard" component={Dashboard} onEnter={dashboardOnEnter}
        />
        <Route path="/documentation" component={Documentation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
