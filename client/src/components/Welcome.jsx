import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client_id: '' };
  }
  componentWillMount() {
    if (this.state.client_id === '') {
      fetch('/api/me', { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((json) => {
        if (json.github_client_id) {
          this.setState({ client_id: json.github_client_id });
        }
      })
      .catch((error) => console.log('fetch /api/me error:', error));
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Welcome content</p>
        <a
          href="/api/integrations/github"
        >Auth Github</a>
      </div>
    );
  }
}

export default Welcome;
