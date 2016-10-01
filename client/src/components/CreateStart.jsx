import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const CreateStart = () => {
  const onClickHandler = () => {
    browserHistory.push('/create/github');
  };

  return (
    <div>
      <p>
        <Button bsStyle="primary" onClick={onClickHandler}>Github Repo</Button>
      </p>
      <p><Button bsStyle="primary">Url</Button></p>
    </div>
  );
};

export default CreateStart;
