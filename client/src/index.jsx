import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';
import Documentation from './components/Documentation.jsx';
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
      context.props.router.push('/dashboard');
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
        <Route path="/signup" component={SingupWrapper} />
        <Route path="/signin" component={SinginWrapper} />
        <Route path="welcome" component={Welcome} />
        <Route
          path="dashboard"
          component={Dashboard}
          onEnter={() => {
            console.log('Dashboard onEnter');
          }}
        />
        <Route path="/documentation" component={Documentation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

App.propTypes = { children: PropTypes.instanceOf(Object) };
