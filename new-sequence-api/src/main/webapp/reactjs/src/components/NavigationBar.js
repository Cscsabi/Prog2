import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="navbar-left">
          <Link to="" className="navbar-brand">
            <FontAwesomeIcon icon={faBook} />
            Book Shop
          </Link>
          <Link to={"add"} className="navbar-brand">
            Add Book
          </Link>
          <Link to={"list"} className="navbar-brand">
            Book List
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"registration"} className="navbar-brand">
            Register
          </Link>
          <Link to={"login"} className="navbar-brand">
            Login
          </Link>
          <Link to={"cart"} className="navbar-brand">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
