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

const Landing = () => (
  <div>
    <svg
      className="swoosh"
      viewBox="0 0 1031 650"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient
          x1="100%"
          y1="50%"
          x2="0%"
          y2="50%"
          id="linearGradient-1"
        >
          <stop stopColor="#EE433D" offset="0%" />
          <stop stopColor="#EC3846" offset="49.6568765%" />
          <stop stopColor="#EC2C51" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M0,0 L1024,0 L1024,376 L1024,382 L1024,384 C950,384 647.47765,432.199 407,499 C165.899454,565.974031 0,650 0,650 L0,0 Z"  // eslint-disable-line
        id="Rectangle-2"
        stroke="none"
        fill="url(#linearGradient-1)"
        fillRule="evenodd"
      />
    </svg>
    <Grid className="landingPageGrid">
      <Row className="mainLandingSpacer" />
      <Row className="mainLanding">
        <Col xs={12} md={6}>
          <div className="landingBackground">
            <div className="main-area">
              <h3 className="homeHeader">API For Gathering Visual Feedback</h3>
              <p className="homePara">Enable commenting directly on your website and integrate with whichever workflow tool you already use.</p>
              <p>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button bsStyle="primary" className="button1">Sign Up</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button bsStyle="primary" className="button2">Read Docs</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </p>
            </div>
          </div>
        </Col>
        <Col xs={0} md={6 }>
          <Image src="Markup_Landingpage_Image.png" thumbnail className="mainLandingImg"/>
        </Col>
      </Row>

      <Row className="section1">
        <Col xs={12} md={4}>
          <div className="section1Container1">
            <h3 className="homeHeader">Easy Setup</h3>
            <p className="homePara">This is the Content.</p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="section1Container2">
            <h3>section1Container2</h3>
            <p>This is the Content.</p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="section1Container3">
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
