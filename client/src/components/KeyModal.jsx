import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

class KeyModal extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const keyName = findDOMNode(this.keyName).value;

    console.log('keyName:', keyName);
    if (this.urlText) {
      this.props.createNewKey({
        name: keyName,
        endpoint: findDOMNode(this.urlText).value,
        type: 'url'
      });
    } else {
      const requestBody = JSON.parse(findDOMNode(this.endpointSelect).value);

      requestBody.name = keyName;
      this.props.createNewKey(requestBody);
    }
  }

  onDropdownChange() {
    const selectValue = findDOMNode(this.endpointSelect).value;

    if (selectValue === 'addnewurl') {
      this.props.setModalModeAddUrl(true);
    } else {
      this.props.setModalModeAddUrl(false);
    }
  }

  render() {
    let showTextInput = !(this.props.github || (this.props.urls.length > 0));

    if (!showTextInput) {
      showTextInput = this.props.modalModeAddUrl;
    }

    const urlTextInput = (
      <FormGroup controlId="formBasicText">
        <ControlLabel>URL</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter URL"
          ref={(ref) => { this.urlText = ref; }}
        />
      </FormGroup>
    );

    const dropdown = (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Endpoint</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="select"
          ref={(ref) => { this.endpointSelect = ref; }}
          onChange={this.onDropdownChange}
        >
          {
            this.props.urls.map((url) => (
              <option value={`{"type":"url","endpoint":"${url.url}"}`}>
                {url.url}
              </option>)
            )
          }
          {
            this.props.repos.map((repo) => (
              <option
                value={`{"type":"github","endpoint":"${repo.full_name}"}`}
              >
                {repo.full_name}
              </option>
            ))
          }
          <option value="addnewurl">Add a new URL</option>
        </FormControl>
      </FormGroup>
    );

    const authGithubButton = (
      <div>
        <div>
          Or
        </div>
        <button
          className="btn btn-primary"
          onClick={(event) => {
            event.preventDefault();
            document.location = '/api/integrations/github';
          }}
        >
          Link Github Account
        </button>
        <br />
        <br />
      </div>
    );

    return (
      <Modal
        show={this.props.keymodal}
        onHide={() => {
          this.props.setModalModeAddUrl(false);
          this.props.hideModal();
        }}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <form>
            <FormGroup controlId="keyn">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                ref={(ref) => { this.keyName = ref; }}
              />
            </FormGroup>
            { !this.props.github
              && this.props.urls.length === 0 ? '' : dropdown }
            { showTextInput ? urlTextInput : '' }
            { this.props.github ? '' : authGithubButton }
            <button
              action="submit"
              className="btn btn-primary"
              onClick={this.onFormSubmit}
            >
              Generate Key
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

KeyModal.propTypes = {
  keymodal: PropTypes.bool,
  modalModeAddUrl: PropTypes.bool,
  github: PropTypes.bool,
  urls: PropTypes.arrayOf(PropTypes.any),
  repos: PropTypes.arrayOf(PropTypes.any),
  hideModal: PropTypes.func,
  setModalModeAddUrl: PropTypes.func,
  createNewKey: PropTypes.func
};

const mapStateToProps = (state) => ({
  keymodal: state.keymodal.showModal,
  modalModeAddUrl: state.keymodal.modalModeAddUrl,
  github: state.auth.github,
  urls: state.urls.urls,
  repos: state.repos.repos
});

export default connect(mapStateToProps, Actions)(KeyModal);
