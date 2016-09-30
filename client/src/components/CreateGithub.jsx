import React from 'react';
import { FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';

class CreateGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      githubRepos: ['repo1', 'repo2'],
      githubAuth: false
    };
  }

  componentWillMount() {
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
        this.getGithubRepos();
      }
    })
    .catch((error) => console.log('fetch repos', error));
  }

  getGithubRepos() {
    console.log('getGithubRepos called!!');
    fetch('/api/integrations/github/repos', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {
      console.log('json:', json);
      this.setState({ githubRepos: json });
    })
    .catch((error) => console.log('fetch repos', error));
  }

  render() {
    console.log('this.state.githubAuth in CreateGithub', this.state.githubAuth);
    const dropdownSelect = (
      <form>
        <FormGroup>
          <FormControl componentClass="select" placeholder="select">
            {
              this.state.githubRepos.map((repo) => <option value={repo}>
                {repo}
              </option>)
            }
          </FormControl>
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
      </form>
    );
    const githubAuthLink = (
      <a href="/api/integrations/github">Auth Github</a>
    );

    return (
      <Row>
        <Col md={6}>
          <p>Create Gitbuh</p>
          {
            this.state.githubAuth ? dropdownSelect : githubAuthLink
          }
        </Col>
      </Row>
    );
  }
}

CreateGithub.propTypes = { githubAuth: React.PropTypes.bool };

export default CreateGithub;
