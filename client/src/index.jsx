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
import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

const store = createStore(myApp);

const App = (props) => (
  <div>
    <NavbarContainer />
    {props.children}
  </div>
);

const handleSubmit = ({
  username,
  password,
  companyName
}, endpoint, context) => {
  const url = `/api/${endpoint}`;
  const data = {
    email: username,
    password
  };

  fetch(url, {
    method: 'POST',
    body: data
  })
  .then((response) => {
    console.log('login success!', response.ok);

    return fetch('/api/me');
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    if (json.github_authenticated) {
      context.router.push('/welcome');
    } else {
      context.router.push('/dashboard');
    }
  })
  .catch((error) => console.log('fetch error:', error));
};

const SingupWrapper = () => (<Signup callback={handleSubmit} />);
const SinginWrapper = () => (<Signin callback={handleSubmit} />);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="welcome" component={Welcome} />
        <Route path="dashboard" component={Dashboard} />
      </Route>
      <Route path="/signup" component={SingupWrapper} />
      <Route path="/signin" component={SinginWrapper} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
