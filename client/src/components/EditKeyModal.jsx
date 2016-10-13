import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import {
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

class EditKeyModal extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const keyName = findDOMNode(this.keyName).value;

    if (this.urlText) {
      this.props.createNewKey({
        key: this.props.editKey,
        name: keyName,
        endpoint: findDOMNode(this.urlText).value,
        type: 'url'
      });
    } else {
      const requestBody = JSON.parse(findDOMNode(this.endpointSelect).value);

      requestBody.name = keyName;
      requestBody.key = this.props.editKey;
      this.props.createNewKey(requestBody);
    }
  }

  onDropdownChange() {
    const selectValue = findDOMNode(this.endpointSelect).value;

    if (selectValue === 'addnewurl') {
      this.props.setEditModalNewUrl(true);
    } else {
      this.props.setEditModalNewUrl(false);
    }
  }

  render() {
    let showTextInput = !(this.props.github || (this.props.urls.length > 0));

    if (!showTextInput) {
      showTextInput = this.props.modalModeAddUrl;
    }

    let defaultValues = this.props.keys.reduce((prev, key) => {
      let values = prev;

      if (values === null && key.key === this.props.editKey) {
        values = {
          name: key.name,
          endpoint: `{"type":"${key.type}","endpoint":"${key.endpoint}"}`
        };
      }

      return values;
    }, null);

    defaultValues = defaultValues || {};

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
          defaultValue={defaultValues.endpoint}
          ref={(ref) => { this.endpointSelect = ref; }}
          onChange={this.onDropdownChange}
        >
          {
            this.props.urls.map((url) => (
              <option
                value={`{"type":"url","endpoint":"${url.url}"}`}
                key={url.url}
              >
                {url.url}
              </option>)
            )
          }
          {
            this.props.repos.map((repo) => (
              <option
                value={`{"type":"github","endpoint":"${repo.full_name}"}`}
                key={repo.full_name}
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
        <div className="text-center"> ---OR--- </div>
        <br />
        <Button
          bsStyle="primary"
          onClick={(event) => {
            event.preventDefault();
            document.location = '/api/integrations/github';
          }}
          block
        >
          Link Github Account
        </Button>
      </div>
    );


    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.props.setEditModalNewUrl(false);
          this.props.hideEditModal();
        }}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <form>
            <FormGroup controlId="keyn">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                defaultValue={defaultValues.name}
                ref={(ref) => { this.keyName = ref; }}
              />
            </FormGroup>
            { !this.props.github
              && this.props.urls.length === 0 ? '' : dropdown }
            { showTextInput ? urlTextInput : '' }
            { this.props.github ? '' : authGithubButton }
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            bsStyle="primary"
            onClick={this.onFormSubmit}
          >
            Update Key
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditKeyModal.propTypes = {
  show: PropTypes.bool,
  editKey: PropTypes.string,
  modalModeAddUrl: PropTypes.bool,
  keys: PropTypes.arrayOf(PropTypes.any),
  github: PropTypes.bool,
  urls: PropTypes.arrayOf(PropTypes.any),
  repos: PropTypes.arrayOf(PropTypes.any),
  hideEditModal: PropTypes.func,
  setEditModalNewUrl: PropTypes.func,
  createNewKey: PropTypes.func
};

const mapStateToProps = (state) => ({
  show: state.editmodal.show,
  editKey: state.editmodal.key,
  modalModeAddUrl: state.editmodal.modalModeAddUrl,
  keys: state.keys.data,
  github: state.auth.github,
  urls: state.urls.urls,
  repos: state.repos.repos
});

export default connect(mapStateToProps, Actions)(EditKeyModal);
