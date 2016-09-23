import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dashboard from './reducers';
import Landing from './components/Landing.jsx';
import NavbarContainer from './containers/NavbarContainer';

const store = createStore(dashboard);

const App = () => (
  <div>
    <NavbarContainer />
    <Landing />
  </div>
);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { loggedIn: false };
//   }
//   render() {
//     return (
//       <div>
//         <NavbarContainer />
//         <Landing />
//       </div>
//     );
//   }
// }

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
