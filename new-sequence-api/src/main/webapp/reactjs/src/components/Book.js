import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const Book = ({
  book: { author, coverPhotoUrl, isbnNumber, language, price, title },
}) => {
  return (
    <Card className="border border-dark bg-dark text-white">
      <Card.Header align="center">
        <h1>{author}</h1>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row align="center">
            <Col>
              <img
                src={coverPhotoUrl}
                alt="cover"
                width="150"
                height="150"
              ></img>
            </Col>
          </Row>
          <Row align="center">
            <Col>
              <span>{title}</span>
            </Col>
          </Row>
          <Row align="center">
            <Col>
              <span>Isbn-number:{isbnNumber}</span>
            </Col>
            <Row align="center">
              <span>{price} HUF</span>
            </Row>
          </Row>
          <Row align="center">
            <Col>
              <a className="btn btn-primary btn-lg" href="/cart" role="button">
                Add To Cart
              </a>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
