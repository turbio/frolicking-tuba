import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';

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
        <IndexRoute component={Landing} />
      </Route>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.Object };
