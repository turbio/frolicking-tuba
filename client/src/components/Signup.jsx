//signup

import React from 'react';
import { withRouter } from 'react-router';
import {
  Jumbotron, Grid, Row, Col
} from 'react-bootstrap';
import AuthForm from './AuthForm.jsx';


const Signup = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Jumbotron>
          <h1>Sign Up</h1>
          <AuthForm />
        </Jumbotron>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Signup);
