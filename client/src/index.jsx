import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

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
import RequireAuth from './components/RequireAuth.jsx';
//import { requireAuth, auth } from './utils/auth';
import configureStore from './store/configureStore';
//import { requireAuth } from './actions/AppActions';


// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStoreWithMiddleware(homeReducer);
// const store = createStoreWithMiddleware(
//   homeReducer,
//   window.devToolsExtension && window.devToolsExtension()
//   );

const store = configureStore();

persistStore(store);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/create" component={RequireAuth(Create)}>
          <IndexRoute component={CreateStart} />
          <Route
            path="github" component={RequireAuth(CreateGithub)}
          />
        </Route>
        <Route path="/team" component={Team} />
        <Route
          path="/dashboard"
          component={RequireAuth(Dashboard)}
          // onEnter={auth.requireAuth}
          //onEnter={requireAuth}
        />
        <Route path="/documentation" component={Documentation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
