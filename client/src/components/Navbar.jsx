import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ loggedIn }) => (
  <div>
    Navbar {loggedIn}
    <Link to="/signup">Sign Up</Link>
    <Link to="/login">Log In</Link>
  </div>
);

Navbar.propTypes = { loggedIn: PropTypes.bool };

export default Navbar;
