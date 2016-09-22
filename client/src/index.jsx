import React from 'react';
import { render } from 'react-dom';
import Landing from './components/Landing.jsx';

//const App = () => <Landing />;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  render() {
    return (
      <Landing loggedIn={this.state.loggedIn} />
    );
  }
}

render(<App />, document.getElementById('app'));
