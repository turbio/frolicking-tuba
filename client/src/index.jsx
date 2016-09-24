import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myApp from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';
import Auth from './components/auth.jsx';

const store = createStore(myApp);

const App = () => (
  <div>
    <NavbarContainer />
    <Landing />
    <Auth />
  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
