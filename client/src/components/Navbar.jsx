import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
//import { logout } from '../actions/AppActions';
//import { SET_AUTH } from '../utils/AppConstants';
import * as Actions from '../actions/AppActions';

class NavbarComponent extends React.Component {

  runlogout() {
    this.props.logOut();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return (<Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/" onClick={() => this.runlogout()}>Log Out</Link>
        </NavItem>
      </Nav>);
    }

    return (<Nav pullRight>
      <NavItem eventKey={1}><Link to="/signup">Sign Up</Link></NavItem>
      <NavItem eventKey={2}><Link to="/signin">Log In</Link></NavItem>
    </Nav>);

  }


  render() {
    return (
      <Navbar fixedTop className="navbarLoggedOut">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Markup</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/documentation">Documentation</Link>
            </NavItem>
            <NavItem eventKey={2}>Pricing</NavItem>
            <NavItem eventKey={3}><Link to="/team">Team</Link></NavItem>
          </Nav>
          { this.renderAuthLinks() }
        </Navbar.Collapse>
      </Navbar>
      );
  }

}


NavbarComponent.propTypes = {
  authenticated: PropTypes.oneOfType([PropTypes.func, PropTypes.boolean]),
  logOut: PropTypes.func
};

const mapStateToProps = (state) => (
  { authenticated: state.auth.authenticated }
);

export default connect(mapStateToProps, Actions)(NavbarComponent);

//Add code back in when wanting to show active page states in nav
//<li className="active"><a href="#">Link <span className="sr-only">
//(current)</span></a></li>

//Add code back in to have a User dropdown
