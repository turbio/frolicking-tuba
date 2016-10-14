//signup

import React from 'react';
import { withRouter, Link } from 'react-router';
import {
  Panel, Grid, Row, Col
} from 'react-bootstrap';
import AuthForm from './AuthForm.jsx';

const Signup = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Panel header="Create an Account" className="signup-form-container">
          <AuthForm />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col md={6} mdOffset={3} className="no-account-2">
        <p>Don't have an account?</p>
        <Link
          to="/signup"
          className="no-account"
        >Sign Up
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Signup);
