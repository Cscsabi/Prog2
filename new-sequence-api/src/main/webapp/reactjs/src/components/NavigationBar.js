import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import SearchBar from "./SearchBar";

export const NavigationBar = () => {
  const [input, setInput] = useState("");
  const { dispatch, search } = useStoreon("filtered");

  const toAdd = () => {
    dispatch(AppEvents.FilterData, input);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="navbar-left">
          <Link to="" className="navbar-brand">
            <FontAwesomeIcon icon={faBook} /> Book Shop
          </Link>
          <Link to={"list"} className="navbar-brand">
            All Books
          </Link>
        </Nav>
        <Nav className="navbar-center">
          <SearchBar
            input={input}
            setInput={(input) => setInput(input)}
            update={toAdd}
          ></SearchBar>
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
