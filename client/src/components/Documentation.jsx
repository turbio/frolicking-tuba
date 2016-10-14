import React from 'react';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import Highlight from 'react-highlight'
// import Swagger from 'swagger-client';
// import AutoAffix from 'react-overlays';
// import Waypoint from 'react-waypoint';

// import { Nav, NavItem } from 'react-bootstrap';
//import Scrollspy from 'react-scrollspy';

const script1 = "<script src=\"http://getmarkup.com/script.js?key=a22e4697e8255a183b74ba94586e8765\"></script>";
const script2 = `{
  "method": "POST",
    "body": {
      "to": "string",
      "from": "string",
      "title": "string",
      "comment": "string",
      "file": "file or url to file sent",
      "key": "string",
      "screenshot": "screenshot file or url to screenshot file sent",
      "location": "string",
    }
}`;

const Documentation = () => (
  <div>
    <Grid>
      <Row>
        <Col md={12}>
          <h2 className="docsHeading">Client-Side</h2>
          <p className="docsPara">
            Copy and paste our provided tag right before the closing &lt/body&gt tag of a desired page.
          </p>
          <Highlight>{script1}</Highlight>
        </Col>
        <Col md={12}>
          <h2 className="docsHeading">Server-Side</h2>
          <p className="docsPara">
            If you want to configure an endpoint to integrate with a workflow other than github.  Here is an example response in JSON format to your specified URL:<br /><br />
          </p>
          <p>to: String entered by the commenting user.</p>
          <p>from: String entered by the commenting user.</p>
          <p>title: String entered by the commenting user.</p>
          <p>comment: String entered by the commenting user.</p>
          <p>file: String URL of file uploaded by the commmeting user (if provided).</p>
          <p>key: The MARKUP API key of the commenting user.</p>
          <p>screenshot: String URL of screenshot uploaded by the commmeting user (if provided).</p>
          <p>location: String URL of the active web page where the user comment originated.</p>
          <Highlight className="JSON">{script2}</Highlight>
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

