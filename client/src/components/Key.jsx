import React, { PropTypes } from 'react';
import {
  Panel,
  FormGroup,
  InputGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

const Title = ({ text }) => (
  <span>{text}</span>
);

Title.propTypes = { text: PropTypes.string };

const Key = ({ title, endpoint, keyString }) => {
  const onSettingsClick = () => {
    console.log('Settings clicked, key:', keyString);
  };

  return (
    <Panel
      header={
        <div>
          <Title text={title} />
          <Button bsStyle="link" onClick={onSettingsClick}>Settings</Button>
        </div>
      }
    >
      <FormGroup>
        <ControlLabel>Endpoint</ControlLabel>
        <FormControl type="text" disabled defaultValue={endpoint} />
      </FormGroup>

      <FormGroup>
        <ControlLabel>API Key</ControlLabel>
        <InputGroup>
          <FormControl type="text" disabled defaultValue={
            `<script src="https://d1p3e8i5yp3axf.cloudfront.net/?key=\
${keyString}"></script>`
          } />
          <InputGroup.Button>
            <Button>Copy</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Panel>
  )
};

Key.propTypes = {
  title: PropTypes.string,
  endpoint: PropTypes.string,
  keyString: PropTypes.string
};

export default Key;
