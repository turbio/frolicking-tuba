//signup

import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import {
  FormGroup, FormControl, Jumbotron, Grid, Row, Col, Button
} from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      companyName: ''
    };
  }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  // handleCompanyNameChange(event) {
  //   this.setState({ companyName: event.target.value });
  // }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Jumbotron>
              <h1>Sign Up</h1>
              <form>
                <FormGroup
                  controlId="username"
                  //validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    placeholder="Email"
                    onChange={(event) => {
                      this.setState({ username: event.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup
                  controlId="password"
                  //validationState={this.getValidationState()}
                >
                  <FormControl
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup
                  controlId="company"
                  //validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    placeholder="Company"
                    onChange={(event) => {
                      this.setState({ companyName: event.target.value });
                    }}
                  />
                </FormGroup>
                <div>
                  <Button
                    bsStyle="primary"
                    onClick={(event) => {
                      event.preventDefault();
                      this.props.callback(this.state, 'signup', this);
                    }}
                  >Submit</Button>
                </div>
                <Link to="/signin">Log In</Link>
              </form>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Signup.propTypes = { callback: PropTypes.func };

export default withRouter(Signup);
