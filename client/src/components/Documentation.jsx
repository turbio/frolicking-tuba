import React from 'react';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
// import Swagger from 'swagger-client';
// import AutoAffix from 'react-overlays';
// import Waypoint from 'react-waypoint';

// import { Nav, NavItem } from 'react-bootstrap';
//import Scrollspy from 'react-scrollspy';

const Documentation = () => (
  <div>
    <Grid>
      <Row>
        <Col md={12}>
          <h2 className="docsHeading">example heading</h2>
          <p className="docsPara">
            example para asdfasdfasdfasdfasdf asdfasd fasd fasdf asd
          </p>
        </Col>
      </Row>
    </Grid>
  </div>
);


// const client = new Swagger({
//   url: 'http://localhost:3000/api-docs.json',
//   supportHeaderParams: false,
//   supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
//   success: () => {
//     client((test) => {
//       console.log('pet', test);
//     });
//   }
// });

export default Documentation;

