import React, { PropTypes } from 'react';
import { Row, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Key from './Key.jsx';
import * as Actions from '../actions/AppActions';
import CreateKeyModal from './CreateKeyModal.jsx';


const Dashboard = ({ keys, showModal }) => (
  <Grid>
    <Row>
      {
        keys.map((key) => key.name)
      }
      {console.log(keys)}
      <p><Link to="/create">Create Key</Link></p>
      <p>
        <Button
          bsStyle="link"
          onClick={() => showModal()}
        >Create API Key
        </Button>
      </p>
      <CreateKeyModal />
    </Row>
    <Row>
      <Key title="key name" endpoint="key endpoint" keyString="api key" />
    </Row>
  </Grid>
);

Dashboard.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func
};

const mapStateToProps = (state) => (
  { keys: state.keys }
);

export default connect(mapStateToProps, Actions)(Dashboard);
