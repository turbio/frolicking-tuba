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
  <div id="landing-content">
    <Image className="swoosh" src="/swoosh_fill.svg" />
    <Grid>
      <Row className="above-the-fold">
        <Col sm={12} md={6} >
          <h3>API For Gathering Visual Feedback</h3>
          <p>{homeParagraph}</p>
          <p>
            <Button bsStyle="primary" className="button1">Sign Up </Button>
            <Button bsStyle="primary" className="button2">Read Docs </Button>
          </p>
        </Col>
        <Col sm={12} md={6} className="right-side-image hidden-sm hidden-xs">
          <Image src="/landing_example_image.svg" />
        </Col>
      </Row>

      <Row className="section1">
        <Col sm={12} md={12}>
          <h3 className="sectionHeader">Collaborate Better Across Teams</h3>
        </Col>
        <Col sm={12} md={4}>
          <div className="section1Container1">
            <div className="rectanglePlaceholder" />
            <h3>Easily Set Up New Projects</h3>
            <p>section1Container1</p>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="section1Container2">
            <div className="rectanglePlaceholder" />
            <h3>section1Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="section1Container3">
            <div className="rectanglePlaceholder" />
            <h3>section1Container3</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section2">
        <Col sm={12} md={8}>
          <div className="section2Container1">
            <h3>Capture Feedback Quickly</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="section2Container2">
            <h3>section2Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section3">
        <Col sm={12} md={4}>
          <div className="section3Container1">
            <h3>Workflow Options</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col sm={12} md={8}>
          <div className="section3Container2">
            <h3>section3Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section4">
        <Col sm={12} md={12}>
          <div className="finalCTA">
            <div>
              <h3>Try Markup Today</h3>
              <p>This is the Content.</p>
              <p><Button bsStyle="primary">Learn more</Button></p>
            </div>
          </div>
        </Col>
      </Row>

    </Grid>
  </div>
);

export default Landing;
