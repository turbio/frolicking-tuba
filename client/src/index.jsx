import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Landing from './components/Landing.jsx';
import Documentation from './components/Documentation.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Team from './components/Team.jsx';
import Create from './components/Create.jsx';
import CreateStart from './components/CreateStart.jsx';
import CreateGithub from './components/CreateGithub.jsx';
import Welcome from './components/Welcome.jsx';
import { auth } from './utils/auth';
import homeReducer from './reducers/reducers';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStoreWithMiddleware(homeReducer);
const store = createStoreWithMiddleware(
  homeReducer,
  window.devToolsExtension && window.devToolsExtension()
  );

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/create" component={Create} onEnter={auth.createOnEnter}>
          <IndexRoute component={CreateStart} />
          <Route
            path="github" component={CreateGithub} onEnter={auth.githubOnEnter}
          />
        </Route>
        <Route path="/team" component={Team} />
        <Route
          path="/dashboard"
          component={Dashboard}
          onEnter={auth.dashboardOnEnter}
        />
        <Route path="/documentation" component={Documentation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
