import React from "react";
import { Col, Container, Navbar } from "react-bootstrap";

export const Footer = () => {
  let fullYear = new Date().getFullYear();

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>&copy;{fullYear} All Rights Reserved by New Sequence</div>
        </Col>
      </Container>
    </Navbar>
  );
};
