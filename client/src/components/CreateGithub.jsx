import React from 'react';
import { FormControl } from 'react-bootstrap';

class CreateStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { githubRepos: [] };
  }

  componentDidMount() {
    if (this.props.githubAuth) {
      this.getGithubRepos();
    }
  }

  getGithubRepos() {
    fetch('/api/integrations/github/repos', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {
      this.setState({ githubRepos: json });
    })
    .catch((error) => console.log('fetch repos', error));
  }

  render() {
    const dropdownSelect = (
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    );
    const githubAuthLink = (
      <a href="/api/integrations/github">Auth Github</a>
    );

    return (
      <div>
        <p>Create Gitbuh</p>
        {
          this.props.githubAuth ? dropdownSelect : githubAuthLink
        }
      </div>
    );
  }
}

CreateStart.propTypes = { githubAuth: React.PropTypes.bool };

export default CreateStart;
