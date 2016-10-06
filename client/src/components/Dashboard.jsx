import React, { Component, PropTypes } from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Key from './Key.jsx';
import * as Actions from '../actions/AppActions';

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     keys: [{
  //       name: 'MyRow',
  //       api_key: 'somestring',
  //       endpoint: 'somenedpoint'
  //     },
  //     {
  //       name: 'MyRow2',
  //       api_key: 'somestring2',
  //       endpoint: 'somenedpoint2'
  //     }]
  //   };
  // }

  componentDidMount() {
    this.props.getApiKeys();
  }

  // getApiKeys() {
  //   fetch('/api/keys', { credentials: 'same-origin' })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     const keys = json.map((key) => {
  //       const newKey = key;

  //       newKey.api_key = `<script src="http://getmarkup.com/script.js?key=\
  //                         ${key.api_key}"></script>`;

  //       return newKey;
  //     });

  //     this.setState({ keys });
  //   })
  //   .catch((error) => console.log('fetch /api/keys error:', error));
  // }

  render() {
    return (
      <Grid>
        <Row>
          <p><Link to="/create">Create Key</Link></p>
        </Row>
        <Row>
          <Key title="key name" endpoint="key endpoint" keyString="api key" />
        </Row>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  getApiKeys: PropTypes.func,
  keys: PropTypes.arrayOf(PropTypes.object)
};


const mapStateToProps = (state) => ({ keys: state.apiKeys.keys });

//export default Dashboard;
export default connect(mapStateToProps, Actions)(Dashboard);
