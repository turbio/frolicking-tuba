import React, { Component, PropTypes } from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Key from './Key.jsx';
import * as Actions from '../actions/AppActions';

const Dashboard = () => (
  <Grid>
    <Row>
      <p><Link to="/create">Create Key</Link></p>
    </Row>
    <Row>
      <Key title="key name" endpoint="key endpoint" keyString="api key" />
    </Row>
  </Grid>
);

Dashboard.propTypes = { keys: PropTypes.arrayOf(PropTypes.object) };


const mapStateToProps = (state) => ({ keys: state.apiKeys.keys });

//export default Dashboard;
export default connect(mapStateToProps, Actions)(Dashboard);
