import React from 'react';
import { Row, Col, Grid, Button } from 'react-bootstrap';


const Dashboard = () => (
  <Grid>
    <Row className="mainLanding">
      <Col xs={12} md={12}>
        <h3>YOUR SCRIPT TAG</h3>
        <p>Copy and paste this into your html body.</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Col>
    </Row>
  </Grid>
);

export default Dashboard;
