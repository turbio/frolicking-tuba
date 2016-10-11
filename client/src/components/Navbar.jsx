import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
//import { logout } from '../actions/AppActions';
//import { SET_AUTH } from '../utils/AppConstants';
import * as Actions from '../actions/AppActions';

class NavbarComponent extends React.Component {

  runlogout() {
    this.props.logOut();
  }

  render() {
    const pricingLink = (<NavItem eventKey={2}>Pricing</NavItem>);
    const teamLink = (<NavItem eventKey={3}>
      <Link to="/team">Team</Link>
    </NavItem>);
    const dashboardLink = (<NavItem eventKey={3}>
      <Link to="/dashboard">Dashboard</Link>
    </NavItem>);
    const authLinks = (<Nav pullRight>
      <NavItem eventKey={1}><Link to="/signup">Sign Up</Link></NavItem>
      <NavItem eventKey={2}><Link to="/signin">Log In</Link></NavItem>
    </Nav>);
    const profileDropdown = (<Nav pullRight>
      <NavDropdown
        eventKey={3}
        title={this.props.email}
        id="basic-nav-dropdown"
      >
        <MenuItem eventKey={3.1}>Profile</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2}>
          <Link to="/" onClick={() => this.runlogout()}>Log Out</Link>
        </MenuItem>
      </NavDropdown>
    </Nav>);


    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Frolicking Tuba</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/documentation">Documentation</Link>
            </NavItem>
            {this.props.authenticated ? '' : pricingLink}
            {this.props.authenticated ? '' : teamLink}
            {this.props.authenticated ? dashboardLink : ''}
          </Nav>
          {this.props.authenticated ? profileDropdown : authLinks}
        </Navbar.Collapse>
      </Navbar>
      );
  }

}


NavbarComponent.propTypes = {
  authenticated: PropTypes.oneOfType([PropTypes.func, PropTypes.boolean]),
  logOut: PropTypes.func,
  email: PropTypes.string
};

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    email: state.auth.email
  }
);

export default connect(mapStateToProps, Actions)(NavbarComponent);

//Add code back in when wanting to show active page states in nav
//<li className="active"><a href="#">Link <span className="sr-only">
//(current)</span></a></li>

//Add code back in to have a User dropdown
