import React from 'react';
import {
  Row,
  Col,
  Grid,
  Button,
  Image
} from 'react-bootstrap';

const homeParagraph = 'Enable commenting directly on your website and '
  + 'integrate with whichever workflow tool you already use.';

const Landing = () => (
  <Grid id="landing-content">
    <Row id="above-the-fold">
      <Image className="swoosh" src="/swoosh_fill.svg" />
      <Col sm={12} md={6} className="left-side-blurb">
        <h3>API For Gathering Visual Feedback</h3>
        <p>{homeParagraph}</p>
        <p>
          <Button bsStyle="primary" className="fill">Sign Up </Button>
          <Button bsStyle="primary" className="outline">Read Docs </Button>
        </p>
      </Col>
      <Col sm={12} md={6} className="right-side-image hidden-sm hidden-xs">
        <Image src="/landing_example_image.svg" />
      </Col>
    </Row>

    <Row id="image-blurbs" className="landing-section">
      <h3>Collaborate Better Across Teams</h3>
      <Col sm={12} md={4}>
        <div>
          <Image src="/landing_example_image.svg" />
          <h4>Easily Set Up New Projects</h4>
          <p>
            Generate a custom script tag for every unique project.
            Insert our script tag on any page to get started instantly.
          </p>
        </div>
      </Col>
      <Col sm={12} md={4}>
        <div>
          <Image src="/landing_example_image.svg" />
          <h4>Enable Frictionless Feedback</h4>
          <p>
            Gather feedback directly on your front-end from all of
            your relevant teams without requiring any additional setup.
          </p>
        </div>
      </Col>
      <Col sm={12} md={4}>
        <div>
          <Image src="/landing_example_image.svg" />
          <h4>Speed Up Communication</h4>
          <p>
            Comments are sent directly to github or can be
            configured to whichever workflow tool works best for you
          </p>
        </div>
      </Col>
    </Row>
    <Row id="use-cases" className="landing-section">
      <h3>Use Cases</h3>
    </Row>
    <Row id="pricing" className="landing-section">
      <h3>Pricing</h3>
    </Row>
  </Grid>
);

export default Landing;
