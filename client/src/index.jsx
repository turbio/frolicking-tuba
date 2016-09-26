import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';
import Auth from './components/auth.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

const store = createStore(myApp);

const App = (props) => (
  <div>
    <NavbarContainer />
    {props.children}
  </div>
);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing}/>
      </Route>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
