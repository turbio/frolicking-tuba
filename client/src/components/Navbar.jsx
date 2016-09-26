import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ loggedIn }) => (
  <nav>
    <div>
      Navbar {loggedIn}
      <ul>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Log In</Link></li>
      </ul>
    </div>
  </nav>
);

Navbar.propTypes = { loggedIn: PropTypes.bool };

export default Navbar;
