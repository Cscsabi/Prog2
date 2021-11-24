import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import { Book } from "./Book";

export const SearchPage = () => {
  const { dispatch, books } = useStoreon("books", "filtered");
  const search = useStoreon("filtered").filtered;

  const improveSearch = (word) => {
    const keyMap = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ö: "o",
      ő: "o",
      ú: "u",
      ü: "u",
      ű: "u",
    };

    const result = [];

    [...word].forEach((c) => {
      let isPushed = false;
      Object.keys(keyMap).forEach((key) => {
        if (key === c) {
          result.push(keyMap[key]);
          isPushed = true;
        }
      });
      if (!isPushed) {
        result.push(c);
      }
    });
    return result.join("");
  };

  useEffect(() => {
    if (!books.length) {
      dispatch(AppEvents.LoadBooks);
    }
  }, [dispatch, books]);

  const bookList = books.reduce((bookAccumulator, book) => {
    if (
      search.length > 0 &&
      (improveSearch(book.title.toLowerCase()).includes(
        improveSearch(search.toString().toLowerCase())
      ) ||
        improveSearch(book.author.toLowerCase()).includes(
          improveSearch(search.toString().toLowerCase())
        ))
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
      <h1 style={{ color: "white" }}>Search results for "{search}"</h1>
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
