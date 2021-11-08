import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const submitBook = (event) => {
    alert("Title: " + title + " Author: " + author);
    event.preventDefault();
  };

  const bookChange = (event) => {
    setTitle(event.target.value);
  };

  const authorChange = (event) => {
    setAuthor(event.target.value);
  };

  return (
    <Card className="border border-dark bg-dark text-white">
      <Card.Header>
        <FontAwesomeIcon icon={faPlusSquare} />
        Add New Book
      </Card.Header>
      <Form onSubmit={submitBook} id="bookFormId">
        <Card.Body as={Row}>
          <Form.Group className="mb-3" controlId="formGridTitle" as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              autocomplete="off"
              type="test"
              name="title"
              value={title}
              onChange={bookChange}
              className={"bg-dark text-white"}
              placeholder="Enter Book Title"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              autocomplete="off"
              controlId="formGridAuthor"
              value={author}
              onChange={authorChange}
              type="test"
              name="author"
              className={"bg-dark text-white"}
              placeholder="Enter Book Author"
            />
          </Form.Group>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} />
              Submit
            </Button>
          </Card.Footer>
        </Card.Body>
      </Form>
    </Card>
  );
};
