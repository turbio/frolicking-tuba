import React, { PropTypes } from 'react';

const Navbar = ({ loggedIn }) => (
  <div>
    Navbar
    {loggedIn ? <span>Sign Out</span> : <span>Log In / Sign Up</span>}
  </div>
);

Navbar.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default Navbar;
