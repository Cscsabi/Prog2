import React from "react";
import { Container } from "react-bootstrap";

export const Welcome = () => (
  <Container>
    <div className="container-fluid bg-dark text-white p-5">
      <h1 className="display-4">Welcome to the New Sequence Book Shop</h1>
      <hr className="my-4" />
      <blockquote className="blockquote mb-0">
        <p>
          “If you only read the books that everyone else is reading, you can
          only think what everyone else is thinking.”
        </p>
        <footer className="blockquote-footer">Haruki Murakami</footer>
      </blockquote>
    </div>
  </Container>
);
