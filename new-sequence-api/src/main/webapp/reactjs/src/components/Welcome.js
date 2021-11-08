import React from "react";
import { Container } from "react-bootstrap";

export const Welcome = () => (
  <Container>
    <div className="container-fluid bg-dark text-white p-5">
      <h1 className="display-4">Welcome to the Book Shop</h1>
      <hr className="my-4" />
      <blockquote className="blockquote mb-0">
        <p>
          Good friends, good books, and a sleepy conscience: this is the ideal
          life.
        </p>
        <footer className="blockquote-footer">Mark Twain</footer>
      </blockquote>
      <a className="btn btn-primary btn-lg" href="#" role="button">
        Learn more
      </a>
    </div>
  </Container>
);
