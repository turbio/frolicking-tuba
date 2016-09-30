import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { test: 'test state' };
  }

  render() {
    return (
      <Grid>
        <Row className="mainLanding">
          <Row>
            <Col xs={12} md={12}>
              <h3>Create Key Page</h3>
            </Col>
          </Row>
          {this.props.children && React.cloneElement(
            this.props.children
          )}
        </Row>
      </Grid>
    );
  }
}

Create.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default Create;
