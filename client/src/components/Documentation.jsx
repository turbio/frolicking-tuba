import React from 'react';
import {
  Row,
  Col,
  Grid,
  Table
} from 'react-bootstrap';
import Highlight from 'react-highlight';
// import Swagger from 'swagger-client';
// import AutoAffix from 'react-overlays';
// import Waypoint from 'react-waypoint';

// import { Nav, NavItem } from 'react-bootstrap';
//import Scrollspy from 'react-scrollspy';

const script1 = "<script src=\"http://getmarkup.com/script.js?" //eslint-disable-line
  + "key=a22e4697e8255a183b74ba94586e8765\"></script>"; // eslint-disable-line
const script2 = `{
  "method": "POST",
    "body": {
      "to": "Amanda",
      "from": "Jeff",
      "title": "Error on landing page",
      "comment": "Please update Uber logo on the home page to reflect their rebrand",
      "file": "https://s3-us-west-1.amazonaws.com/tuba-images-bucket/1475882069369dog.txt",
      "key": "a22e4697e8255a183b74ba94586e8765",
      "screenshot": "https://s3-us-west-1.amazonaws.com/tuba-images-bucket/exampleScreenshot.png",
      "location": "https://www.google.com/",
    }
}`; // eslint-disable-line
const bodyTag = '<body>';

const Documentation = () => (
  <div>
    <Grid>
      <Row>
        <Col md={12} className="docs-section">
          <h2 className="docsHeading">Introduction</h2>
          <p className="docsPara">
            Enable commenting directly on your website,
            and integrate with Github Issues or a custom endpoint
            of your choosing.
          </p>
        </Col>
        <Col md={12} className="docs-section">
          <h2 className="docsHeading">Client-Side</h2>
          <p className="docsPara">
            Copy and paste our provided tag right before the closing
            <code>{bodyTag}</code> tag of a desired page.
          </p>
          <Highlight>{script1}</Highlight>
        </Col>
        <Col md={12} className="docs-section">
          <h2 className="docsHeading">Output option: Github Issues</h2>
          <p className="docsPara">
            We take care of this for you!
            When you create your key, you'll have the option
            to authorize Github, and choose the repo.<br />
          </p>
        </Col>
        <Col md={12} className="docs-section">
          <h2 className="docsHeading">Output option: Custom API Endpoint</h2>
          <p className="docsPara">
            If you want to configure an endpoint to integrate with a workflow
            other than github.  Here is an example response in JSON format to
            your specified URL.<br />
          </p>
          <Table condensed hover>
            <thead>
              <td><strong>Field Name</strong></td>
              <td><strong>Description</strong></td>
            </thead>
            <tbody>
              <tr>
                <td>to</td>
                <td>String entered by the commenting user.</td>
              </tr>
              <tr>
                <td>from</td>
                <td>String entered by the commenting user.</td>
              </tr>
              <tr>
                <td>title</td>
                <td>String entered by the commenting user.</td>
              </tr>
              <tr>
                <td>comment</td>
                <td>String entered by the commenting user.</td>
              </tr>
              <tr>
                <td>file</td>
                <td>String URL of file uploaded by the
                commmeting user (if provided).</td>
              </tr>
              <tr>
                <td>file</td>
                <td>String URL of file uploaded by the
                commmeting user (if provided).</td>
              </tr>
              <tr>
                <td>key</td>
                <td>The MARKUP API key of the commenting user.</td>
              </tr>
              <tr>
                <td>screenshot</td>
                <td>String URL of screenshot uploaded by the
                commmeting user (if provided).</td>
              </tr>
              <tr>
                <td>location</td>
                <td>String URL of the active web page where the
                user comment originated.</td>
              </tr>
            </tbody>
          </Table>
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

