import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import { Book } from "./Book";

export const BookList = () => {
  const { dispatch, books } = useStoreon("books");

  useEffect(() => {
    console.log(books);
    if (!books.length) {
      dispatch(AppEvents.LoadBooks);
    }
  }, [dispatch, books]);

  const bookGroups = books.reduce(
    (bookAccumulator, book, index) => {
      if (index % 3 === 0 && index !== 0) {
        bookAccumulator.push([book]);
      } else {
        const currentGroup = Math.floor(index / 3);
        bookAccumulator[currentGroup].push(book);
      }
      return bookAccumulator;
    },
    [[]]
  );

  return (
    <Container>
      {bookGroups.map((bookGroup, bookGroupIndex) => (
        <Row key={`BookGroup-${bookGroupIndex}`}>
          {bookGroup.map((book, bookIndex) => (
            <Col key={`Book-${bookIndex}`}>
              <Book book={book}></Book>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
