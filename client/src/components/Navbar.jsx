import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

// const Navbar = ({ loggedIn }) => (
//   <div className="headerBar">
//     <div className="container">
//       Navbar {loggedIn}
//       <div id="rightMenu">
//         <Link to="/signup">Sign Up</Link>
//         <Link to="/login">Log In</Link>
//       </div>
//     </div>
//   </div>
// );

const NavbarComponent = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#/">Frolicking Tuba</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">
          <Link to="/documentation">Documentation</Link>
        </NavItem>
        <NavItem eventKey={2} href="#">Pricing</NavItem>
        <NavItem eventKey={3} href="#">Team</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1}><Link to="/signup">Sign Up</Link></NavItem>
        <NavItem eventKey={2}><Link to="/signin">Log In</Link></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavbarComponent.propTypes = { loggedIn: PropTypes.bool };

export default NavbarComponent;

//Add code back in when wanting to show active page states in nav
//<li className="active"><a href="#">Link <span className="sr-only">
//(current)</span></a></li>

//Add code back in to have a User dropdown
