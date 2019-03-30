import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

/**
 * Display the header
 */
export default class Header extends Component {
  render() {
    return (
      <div>
        <header role="banner">
          <Container>
            <Row>
              <Col xs="12" sm="9">
                <div>
                  <h1>WIMF<span style={{fontSize:"0.7rem",marginLeft:"0.7rem"}}>(what's in my fridge)</span></h1>
                  </div>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    )
  }
}