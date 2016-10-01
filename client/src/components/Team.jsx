import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


const Team = () => (
  <Grid className="teamProfiles">
    <Row>
      <Col xs={12} sm={12} md={12}>
        <h1>Tuba Team</h1>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={6} md={3}>
        <img
          width="250"
          role="presentation"
          src={`https://s3-us-west-1.amazonaws.com/
tuba-images-bucket/MasonClayton-sqc-smw.jpg`}
        />
        <h3>"Lint Stricter"</h3>
        <p>Example text here about this person.
Super duper paratrooper.  Tuba!
        </p>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <img
          width="250"
          role="presentation"
          src={`https://s3-us-west-1.amazonaws.com/
tuba-images-bucket/SeanYang-sqc-smw.jpg`}
        />
        <h3>Sean Yang</h3>
        <p>Example text here about this person.
Super duper paratrooper.  Tuba!
        </p>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <img
          width="250"
          role="presentation"
          src={`https://s3-us-west-1.amazonaws.com/
tuba-images-bucket/TeagueAshburn-sqc-smw.jpg`}
        />
        <h3>Teague Ashburn</h3>
        <p>Example text here about this person.
Super duper paratrooper.  Tuba!
        </p>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <img
          width="250"
          role="presentation"
          src={`https://s3-us-west-1.amazonaws.com/
tuba-images-bucket/TimurZhartybayev-sqc-smw.jpg`}
        />
        <h3>Timur Zhartybayev</h3>
        <p>Example text here about this person.
Super duper paratrooper.  Tuba!
        </p>
      </Col>
    </Row>
  </Grid>
);

export default Team;
