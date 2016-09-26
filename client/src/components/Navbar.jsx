import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ loggedIn, onLoginClick }) => (
  <div>
    Navbar
    <Link to="/signup">Sign Up</Link>
    <Link to="/login">Log In</Link>
  </div>
);

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
  onLoginClick: PropTypes.func
};

export default Navbar;
