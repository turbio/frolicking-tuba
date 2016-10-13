//login

import React from 'react';
import { withRouter, Link } from 'react-router';

import {
  Jumbotron, Grid, Row, Col
} from 'react-bootstrap';

import AuthForm from './AuthForm.jsx';

const Signin = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Jumbotron>
          <h3>Welcome Back</h3>
          <AuthForm />
        </Jumbotron>
      </Col>
    </Row>
    <Row>
      <Col md={6} mdOffset={3}>
        Don't have an account?
        <Link
          to="/signup"
        >Sign Up
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Signin);
