import {
  faBook,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const [search, setSearch] = useState("");

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="navbar-left">
          <Link to="" className="navbar-brand">
            <FontAwesomeIcon icon={faBook} />
            Book Shop
          </Link>
          <Link to={"list"} className="navbar-brand">
            All Books
          </Link>
        </Nav>
        <Nav className="navbar-center">
          <Form>
            <InputGroup className="mb-2" style={{ width: "40rem" }}>
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Search for books"
                onChange={searchChange}
                value={search}
              />
              <InputGroup.Text>
                <Link to={""} onClick={() => setSearch("")}>
                  <FontAwesomeIcon icon={faSearch} />
                </Link>
              </InputGroup.Text>
            </InputGroup>
          </Form>
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
