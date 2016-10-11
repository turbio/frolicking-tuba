import React from 'react';
import { FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';


class CreateGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      githubRepos: ['repo1', 'repo2'],
      githubAuth: false,
      sel_repo: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillMount() {
    this.getGithubAuth();
  }

  onClickHandler(event) {
    console.log('onClickHandler called!');
    event.preventDefault();
    this.setGithubRepo();
  }

  onChangeHandler(event) {
    this.setState({ sel_repo: event.target.value });
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
      this.setState({ githubRepos: json });
      this.setState({ sel_repo: json[0] });
    })
    .catch((error) => console.log('fetch repos', error));
  }

  setGithubRepo() {
    // ajax call to /api/integrations/github/repos POST
    // javascript { "name": String }
    console.log('setGithubRepo called!');

    const data = { name: this.state.sel_repo };

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    fetch('/api/integrations/github/repos', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        console.log('json:', json);
      } else {
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => console.log('set repo error', error));
  }

  render() {
    const dropdownSelect = (
      <form>
        <FormGroup>
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={this.onChangeHandler}
          >
            {
              this.state.githubRepos.map((repo) => <option value={repo}>
                {repo}
              </option>)
            }
          </FormControl>
        </FormGroup>
        <Button type="submit" onClick={this.onClickHandler} bsStyle="primary">
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
