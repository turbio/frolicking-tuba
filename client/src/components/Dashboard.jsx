import React, { Component, PropTypes } from 'react';
import { Row, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

import Key from './Key.jsx';
// import CreateKeyModal from './CreateKeyModal.jsx';
import KeyModal from './KeyModal.jsx';
//import { requestKeys } from '../actions/AppActions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.actions.getApiKeys();
    this.props.actions.fetchUrls();
    this.props.actions.fetchGithubAuthStatus();
  }

  returnKeys() {
    if (this.props.keys) {
      return (
         this.props.keys.map((key) => (
           <Key
             title={key.name}
             endpoint={key.endpoint}
             keyString={key.key}
             key={key.key}
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

          <p><Link to="/create">Create Key</Link></p>
          <p>
            <Button
              bsStyle="link"
              onClick={() => this.props.actions.showModal()}
            >Create API Key
            </Button>
          </p>
          {
            // (<CreateKeyModal />)
          }
          <KeyModal />
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

const mapStateToProps = (state) => ({ keys: state.keys.data });
// const mapStateToProps = (state) => {
//   return { keys: state.keys.data };
// };


const mapDispatchToProps
  = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

