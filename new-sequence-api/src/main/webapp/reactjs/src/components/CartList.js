import React, { useEffect } from "react";
import { Cart } from "./Cart";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import Button from "@restart/ui/esm/Button";

export const CartList = () => {
  const { dispatch, books } = useStoreon("books");

  const myStorage = window.localStorage;

  useEffect(() => {
    console.log(booksInCart);
    if (!books.length) {
      dispatch(AppEvents.LoadBooks);
    }
  }, [dispatch, books]);

  const booksInCart = books.reduce((bookAccumulator, book) => {
    if (book.isbnNumber == myStorage.getItem(book.id)) {
      bookAccumulator.push(book);
    }

    return bookAccumulator;
  }, []);

  const result = booksInCart.map((book) => book.price).reduce(add, 0);

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
          <Row align="center">
            <Col>Cover</Col>
            <Col>Title</Col>
            <Col>Author</Col>
            <Col>ISBN</Col>
            <Col>Language</Col>
            <Col>Price</Col>
            <Col>Actions</Col>
          </Row>
          {booksInCart.map((book) => (
            <Cart bookInCart={book}></Cart>
          ))}
        </Table>
        <Row align="right" className="text-white">
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
          <Col align="right">
            <Button
              onClick={() => localStorage.clear()}
              className={"btn btn-info btn-lg"}
            >
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
          <Row align="center">
            <Col>Cover</Col>
            <Col>Title</Col>
            <Col>Author</Col>
            <Col>Isbn-number</Col>
            <Col>Original Language</Col>
            <Col>Price</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col align="center" colSpan="7">
              No Books In Cart
            </Col>
          </Row>
        </Table>
      </Container>
    );
  }
};
