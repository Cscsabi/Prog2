import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="" className="navbar-brand">
          <img src="./book-icon-145.png" alt="brand" width="50" height="50" />
          Book Shop
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="navbar-brand">
            Add Book
          </Link>
          <Link to={"list"} className="navbar-brand">
            Book List
          </Link>
          <Link to={"cart"} className="navbar-brand">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
