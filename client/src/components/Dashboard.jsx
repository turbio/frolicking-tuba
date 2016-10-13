import React, { Component, PropTypes } from 'react';
import { Row, Grid, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

import Key from './Key.jsx';
import CreateKeyModal from './CreateKeyModal.jsx';
import EditKeyModal from './EditKeyModal.jsx';

class Dashboard extends Component {
  componentWillMount() {
    this.props.actions.getApiKeys();
    this.props.actions.fetchUrls();
    this.props.actions.fetchGithubAuthStatus();
  }

  render() {
    return (
      <Grid>
        <Row>
          <p>
            <Button
              bsStyle="link"
              onClick={() => this.props.actions.showModal()}
            >Create API Key
            </Button>
          </p>
          <CreateKeyModal />
          <EditKeyModal />
        </Row>
        <Row>

          {
            this.props.keys.map((key) => (
              <Key
                title={key.name}
                endpoint={key.endpoint}
                keyString={key.key}
                key={key.key}
              />
            )
           )
          }
        </Row>
      </Grid>
   );
  }
}

Dashboard.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.any)
};

const mapStateToProps = (state) => ({ keys: state.keys.data });

const mapDispatchToProps
  = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

