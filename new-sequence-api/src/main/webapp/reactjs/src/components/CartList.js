import React, { useEffect } from "react";
import { Cart } from "./Cart";
import { Book } from "./Book";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const CartList = () => {
  const { dispatch, books } = useStoreon("books");
  //const { dispatchCart, cart } = useStoreon("books");
  const myStorage = window.localStorage;

  useEffect(() => {
    console.log(booksInCart);
    if (!books.length) {
      dispatch(AppEvents.LoadBooks);
    }
  }, [dispatch, books]);

  /*
  useEffect(() => {
    console.log(cart);
    if (!cart.length) {
      dispatch(AppEvents.AddToCart);
    }
  }, [dispatchCart, cart]);
  */

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
            <Col>Isbn-number</Col>
            <Col>Original Language</Col>
            <Col>Price</Col>
            <Col></Col>
          </Row>
          {booksInCart.map((book) => (
            <Cart bookInCart={book}></Cart>
          ))}
          <Row align="center">
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>{result} Ft</Col>
          </Row>
        </Table>
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
