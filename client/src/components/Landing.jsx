import React from 'react';
import { browserHistory } from 'react-router';

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
        <h1>API For Gathering Visual Feedback</h1>
        <p>{homeParagraph}</p>
        <p>
          <Button
            bsStyle="primary"
            className="fill"
            onClick={() => browserHistory.push('/signup')}
          > Sign Up
          </Button>
          <Button
            bsStyle="primary"
            className="outline"
            onClick={() => browserHistory.push('/documentation')}
          >Read Docs
          </Button>
        </p>
      </Col>
      <Col
        sm={12}
        md={6}
        className="right-side-image hidden-sm hidden-xs"
      >
        <Image src="/landing_example_image.svg" />
      </Col>
    </Row>

    <Row id="image-blurbs" className="landing-section">
      <h1>Collaborate Better Across Teams</h1>
      <Col sm={12} md={4}>
        <div>
          <Image src="/LandingPageSection1Image1.svg" />
          <h4>Easily Set Up New Projects</h4>
          <p>
            Generate a custom script tag for every unique project.
            Insert our script tag on any page to get started instantly.
          </p>
        </div>
      </Col>
      <Col sm={12} md={4}>
        <div>
          <Image src="/LandingPageSection1Image2.svg" />
          <h4>Enable Frictionless Feedback</h4>
          <p>
            Gather feedback directly on your front-end from all of
            your relevant teams without requiring any additional setup.
          </p>
        </div>
      </Col>
      <Col sm={12} md={4}>
        <div>
          <Image src="/LandingPageSection1Image3.svg" />
          <h4>Speed Up Communication</h4>
          <p>
            Comments are sent directly to github or can be
            configured to whichever workflow tool works best for you
          </p>
        </div>
      </Col>
    </Row>
    <Row id="use-cases" className="landing-section">
      <h1>Use Cases</h1>
      <Col sm={12} md={6}>
        <div className="tile">
          <h4>Colloborative Sourcing</h4>
          <p>Allow users to colloborate on open
          source projects by enabling direct feedback on your site</p>
        </div>
        <div className="tile">
          <h4>Manage Multiple Clients</h4>
          <p>Set up different API Keys to easily
          organize information from various clients and projects</p>
        </div>
      </Col>
      <Col sm={12} md={6}>
        <div className="tile">
          <h4>Bug Reporting</h4>
          <p>Easily report bugs by integrating our reporting tool
          with your existing issue tracker</p>
        </div>
        <div className="tile">
          <h4>Visual Feedback</h4>
          <p>Gather visual feedback on your frontend from internal
          teams before launching</p>
        </div>
      </Col>
    </Row>
    <Row className="final-cta">
      <h1>Get Started Free</h1>
      <Button
        className="fill"
        onClick={() => browserHistory.push('/signup')}
      > Sign Up Now
      </Button>
      <Button
        className="outline"
        onClick={() => browserHistory.push('/documentation')}
      >Read The Docs
      </Button>
    </Row>
  </Grid>
);

export default Landing;
