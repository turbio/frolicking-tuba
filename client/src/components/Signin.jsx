//login

import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import {
  FormGroup, FormControl, Jumbotron, Grid, Row, Col, Button, Alert
} from 'react-bootstrap';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  // handleUsernameChange(event) {
  //   this.setState({ username: event.target.value });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value });
  // }

  componentWillMount() {
    this.props.dismissAlert();
  }

  onClickHandler(event) {
    event.preventDefault();
    this.props.handleAuthSubmit(this.state, 'signin');
  }

  render() {
    let alert = '';

    if (this.props.alert) {
      alert = (
        <Alert bsStyle="danger">
          <strong>Holy guacamole!</strong> {this.props.alert_msg}
        </Alert>
      );
    }

    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Jumbotron>
              <h1>Log In</h1>
              {alert}
              <form>
                <FormGroup
                  controlId="username"
                  //validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    value={this.state.value}
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
                    value={this.state.value}
                    placeholder="Password"
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </FormGroup>
                <div>
                  <Button
                    bsStyle="primary"
                    onClick={this.onClickHandler}
                  >Log In</Button>
                </div>
                <Link to="/signup">Sign Up</Link>
              </form>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Signin.propTypes = {
  handleAuthSubmit: PropTypes.func,
  alert: PropTypes.bool,
  alert_msg: PropTypes.string,
  dismissAlert: PropTypes.func
};

export default withRouter(Signin);
