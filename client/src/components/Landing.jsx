import React from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';


const Landing = () => (

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
);

export default Landing;
