import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import NavbarContainer from '../containers/NavbarContainer';
import NavbarComponent from './Navbar.jsx';
import Footer from './Footer.jsx';
//import { handleAuthSubmit } from '../actions/AppActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = this.props;
  }

  render() {
    const onHomePage = () => (
      window.location.pathname === '/' ? 'home' : 'norm'
    );

    return (
      <div>
        <NavbarComponent onHomePage={onHomePage} />
        {this.props.children}
        <Footer />
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

