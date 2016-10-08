import React, { Component, PropTypes } from 'react';
import { Row, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

import Key from './Key.jsx';
import CreateKeyModal from './CreateKeyModal.jsx';
//import { requestKeys } from '../actions/AppActions';

class Dashboard extends Component {
  componentWillMount() {
    console.log('testing comp will mount', this.props.actions);
    this.props.actions.getApiKeys();
  }

  returnKeys() {
    if (this.props.keys) {
      return (
         this.props.keys.map((key) => (
           <Key
             title={key.name}
             endpoint={key.endpoint}
             keyString={key.api_key}
           />
         )
        )
      );
    }

    return <div />;
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
            this.returnKeys()
           //  this.props.keys.map((key) => (
           //    <Key
           //      title={key.name}
           //      endpoint={key.endpoint}
           //      keyString={key.api_key}
           //    />
           //  )
           // )
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

// const mapStateToProps = (state) => ({ keys: state.keys.data });
const mapStateToProps = (state) => {
  console.log(state, ' map state to props');

  return { keys: state.keys.data };
};


const mapDispatchToProps
  = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

