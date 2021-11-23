import Button from "@restart/ui/esm/Button";
import React, { useCallback } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const Book = ({
  book: { id, author, coverPhotoUrl, isbnNumber, language, price, title },
}) => {
  const { dispatch, cart } = useStoreon("cart");
  const toCart = useCallback(() => {
    dispatch(AppEvents.AddToCart, {
      id,
      author,
      coverPhotoUrl,
      isbnNumber,
      language,
      price,
      title,
    });
    alert(title + " added to cart!");
  }, [author, coverPhotoUrl, dispatch, id, isbnNumber, language, price, title]);

  return (
    <Container>
      <Card
        style={{ height: "35rem", width: "22rem" }}
        className="border border-dark bg-dark text-white"
      >
        <Card.Header align="center" style={{ height: "7rem" }}>
          <h1>{author}</h1>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row align="center" style={{ height: "200px" }}>
              <Col>
                <img
                  src={coverPhotoUrl}
                  alt="cover"
                  width="150"
                  height="200"
                ></img>
              </Col>
            </Row>
            <Row align="center">
              <Col>
                <strong>{title}</strong>
              </Col>
            </Row>
            <br />
            <Table striped variant="dark" hover className="text-white">
              <tbody>
                <tr>
                  <td>
                    <span>ISBN:</span>
                  </td>
                  <td>
                    <span>{isbnNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Language:</span>
                  </td>
                  <td>
                    <span>{language}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Price:</span>
                  </td>
                  <td>
                    <span>{price} HUF</span>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Row align="center">
              <Col>
                <Button
                  className="btn btn-primary btn-lg"
                  type="contained"
                  onClick={toCart}
                >
                  Add To Cart
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};
