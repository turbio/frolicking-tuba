import React, { PropTypes } from 'react';
import { Row, Grid } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Key from './Key.jsx';
import { requestKeys } from '../actions/AppActions';

const Dashboard = ({ keys }) => (
  <Grid>
    <Row>
      {
        keys.map((key) => key.name)
      }
      {console.log(keys)}
      <p><Link to="/create">Create Key</Link></p>
    </Row>
    <Row>
      <Key title="key name" endpoint="key endpoint" keyString="api key" />
    </Row>
  </Grid>
);

Dashboard.propTypes = { keys: PropTypes.arrayOf(PropTypes.object) };

const mapStateToProps = (state) => ({ keys: state.keys });

const mapDispatchToProps = (dispatch) => ({
  getKeys() {
    dispatch(requestKeys());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
