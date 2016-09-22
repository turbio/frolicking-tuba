import React from 'react';
import { render } from 'react-dom';
import Landing from './components/Landing.jsx';
import Navbar from './components/Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} />
        <Landing />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
