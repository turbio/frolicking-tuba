import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import NavbarContainer from '../containers/NavbarContainer';
import NavbarComponent from './Navbar.jsx';
//import { handleAuthSubmit } from '../actions/AppActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = this.props;
  }


  render() {
    return (
      <div>
        <NavbarComponent />
        {this.props.children}
      </div>
    );
  }
}


App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};


export default App;

