import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import { Book } from "./Book";

export const SearchPage = () => {
  const { dispatch, test, /*search,*/ books } = useStoreon("filtered", "books");
  const search = "sweet"; // TEST-DATA

  useEffect(() => {
    dispatch(AppEvents.GetFilteredData, test);
  }, [dispatch, test]);

  console.log(test);

  useEffect(() => {
    if (!books.length) {
      dispatch(AppEvents.LoadBooks);
    }
  }, [dispatch, books]);

  const bookList = books.reduce((bookAccumulator, book) => {
    if (
      search.length > 0 &&
      (book.title.toLowerCase().includes(search.toString().toLowerCase()) ||
        book.author.toLowerCase().includes(search.toString().toLowerCase()))
    ) {
      bookAccumulator.push(book);
    }
    return bookAccumulator;
  }, []);

  const bookGroups = bookList.reduce(
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
      <h1 style={{ color: "white" }}>Search results for {search}</h1>
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
