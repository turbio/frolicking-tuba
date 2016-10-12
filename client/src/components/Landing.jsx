import React from 'react';
import {
  Row,
  Col,
  Grid,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Image
} from 'react-bootstrap';

const homeParagraph = 'Enable commenting directly on your website and'
  + 'integrate with whichever workflow tool you already use.';

const Landing = () => (
  <div>
    <Image className="swoosh" src="swoosh.svg" />
    <Grid className="landingPageGrid">
      <Row className="mainLandingSpacer" />
      <Row className="mainLanding">
        <Col xs={12} md={6}>
          <div className="landingBackground">
            <div className="main-area">
              <h3 className="homeHeader">API For Gathering Visual Feedback</h3>
              <p className="homePara">{homeParagraph}</p>
              <p>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button
                      bsStyle="primary"
                      className="button1"
                    >Sign Up
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button
                      bsStyle="primary"
                      className="button2"
                    >Read Docs
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </p>
            </div>
          </div>
        </Col>
        <Col xs={0} md={6}>
          <Image
            src="Markup_Landingpage_Image.png"
            thumbnail className="mainLandingImg"
          />
        </Col>
      </Row>

      <Row className="section1">
        <Col xs={12} md={12}>
          <h3 className="sectionHeader">Collaborate Better Across Teams</h3>
        </Col>
        <Col xs={12} md={4}>
          <div className="section1Container1">
            <div className="rectanglePlaceholder" />
            <h3>Easily Set Up New Projects</h3>
            <p>section1Container1</p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="section1Container2">
            <div className="rectanglePlaceholder" />
            <h3>section1Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="section1Container3">
            <div className="rectanglePlaceholder" />
            <h3>section1Container3</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section2">
        <Col xs={12} md={8}>
          <div className="section2Container1">
            <h3>Capture Feedback Quickly</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="section2Container2">
            <h3>section2Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section3">
        <Col xs={12} md={4}>
          <div className="section3Container1">
            <h3>Workflow Options</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col xs={12} md={8}>
          <div className="section3Container2">
            <h3>section3Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
      </Row>

      <Row className="section4">
        <Col xs={12} md={12}>
          <div className="finalCTA">
            <div className="main-area">
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
