import React from "react";
import { Cart } from "./Cart";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import Button from "@restart/ui/esm/Button";
import { AppEvents } from "../store";

export const CartList = () => {
  const { dispatch, cart } = useStoreon("cart");

  const handleClick = () => {
    dispatch(AppEvents.ClearCart);
    alert("You will be redirected to the payment page");
  };

  let result = Object.values(cart)
    .map((book) => book.price * book.quantity)
    .reduce(add, 0);

  function add(accumulator, a) {
    return accumulator + a;
  }

  if (result !== 0) {
    return (
      <Container>
        <Table
          bordered
          hover
          striped
          variant="dark"
          className="bg-dark text-white"
        >
          <thead align="center">
            <tr>
              <td>Cover</td>
              <td>Title</td>
              <td>Author</td>
              <td>Isbn-number</td>
              <td>Language</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {Object.values(cart).map((book, index) => (
              <Cart key={`Cart-${index}`} bookInCart={book}></Cart>
            ))}
          </tbody>
        </Table>
        <Row align="right" className="text-white">
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col className="bg-dark">Delivery cost:</Col>
          <Col className="bg-dark">FREE</Col>
        </Row>
        <Row align="right" className="text-white">
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col className="bg-dark">Total:</Col>
          <Col className="bg-dark">{result} Ft</Col>
        </Row>
        <br />
        <Row className="text-white">
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col align="right">
            <Button onClick={handleClick} className={"btn btn-info btn-lg"}>
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Table
          bordered
          hover
          striped
          variant="dark"
          className="bg-dark text-white"
        >
          <thead align="center">
            <tr>
              <td>Cover</td>
              <td>Title</td>
              <td>Author</td>
              <td>Isbn-number</td>
              <td>Original Language</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center" colSpan="8">
                No Books In Cart
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
};
