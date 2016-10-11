import React from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';

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
        d="M0,0 L1024,0 C1024,0 1026.6096,384 1024,384 C950,384 647.47765,432.199 407,499 C165.899454,565.974031 0,650 0,650 L0,0 Z"  // eslint-disable-line
        id="Rectangle-2"
        stroke="none"
        fill="url(#linearGradient-1)"
        fillRule="evenodd"
      />
    </svg>
    <Grid>
      <Row className="mainLanding">
        <Col xs={12} md={12}>
          <div className="landingBackground">
            <div className="main-area">
              <h3>Landing Page. Hello World!</h3>
              <p>This is the Content.</p>
              <p><Button bsStyle="primary">Learn more</Button></p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="section1">
        <Col xs={12} md={4}>
          <div className="section1Container1">
            <h3>section1Container1</h3>
            <p>This is the Content.</p>
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
            <h3>section2Container1</h3>
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
            <h3>section3Container1</h3>
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
              <h3>Final CTA AREA</h3>
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
