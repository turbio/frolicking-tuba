import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test state',
      githubAuth: false
    };
  }

  componentDidMount() {
    this.getGithubAuth();
  }

  getGithubAuth() {
    fetch('/api/integrations/github/repos', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        this.setState({ githubAuth: false });
      } else {
        this.setState({ githubAuth: true });
      }
    })
    .catch((error) => console.log('fetch repos', error));
  }

  render() {
    return (
      <Grid>
        <Row className="mainLanding">
          <Col xs={12} md={12}>
            <h3>Create Key Page</h3>
            {this.props.children && React.cloneElement(
              this.props.children, { githubAuth: this.state.githubAuth }
            )}
          </Col>
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
