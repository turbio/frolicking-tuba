import React, { Component, PropTypes } from 'react';
import { Row, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Key from './Key.jsx';
import * as Actions from '../actions/AppActions';
import CreateKeyModal from './CreateKeyModal.jsx';
//import { requestKeys } from '../actions/AppActions';

class Dashboard extends Component {
  componentDidMount() {
    console.log('testing comp will mount', this.props.actions.getApiKeys);
    this.props.actions.getApiKeys();
  }

  render() {
    return (
      <Grid>
        <Row>
          {console.log(this.props.keys, 'keys')}
          <p><Link to="/create">Create Key</Link></p>
          <p>
            <Button
              bsStyle="link"
              onClick={() => this.props.actions.showModal()}
            >Create API Key
            </Button>
          </p>
          <CreateKeyModal />
        </Row>
        <Row>

          {
            this.props.keys.map((key) => (
              <Key
                title={key.name}
                endpoint={key.endpoint}
                keyString={key.api_key}
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

