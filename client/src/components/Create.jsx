import React, { Component } from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { test: 'test state' };
  }

  render() {
    return (
      <Grid>
        <Row className="mainLanding">
          <Col xs={12} md={12}>
            <h3>Create Key Page</h3>
            <p>{this.state.keys} </p>
            <p><Button bsStyle="primary">Github</Button></p>
            <p><Button bsStyle="primary">Url</Button></p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Create;
