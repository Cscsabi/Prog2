import {
  faBook,
  faList,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import SearchBar from "./SearchBar";
import { useHistory } from "react-router-dom";

export const NavigationBar = () => {
  const [input, setInput] = useState("");
  const { dispatch, authenticated, currentUser } = useStoreon(
    "authenticated",
    "currentUser"
  );

  useEffect(() => {
    localStorage.getItem("loginState");
  }, []);

  const toAdd = () => {
    dispatch(AppEvents.FilterData, input);
    setInput("");
    history.push("/search");
  };

  function handleLogout() {
    dispatch(AppEvents.Logout);
    alert("Logged out successfully!");
  }

  let history = useHistory();

  function capitalize([first, ...rest]) {
    return first.toUpperCase() + rest.join("").toLowerCase();
  }

  function displayReady(str) {
    return capitalize(str.split(" ")[0]) + " " + capitalize(str.split(" ")[1]);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="navbar-left">
          <Link to="" className="navbar-brand">
            <FontAwesomeIcon icon={faBook} /> Book Shop
          </Link>
          <Link to={"list"} className="navbar-brand">
            <FontAwesomeIcon icon={faList} /> All Books
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
          {authenticated ? (
            <>
              <h6
                style={{
                  color: "white",
                  marginRight: "2.5em",
                  marginTop: "0.8em",
                }}
              >
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </h6>
              <Link to={"/"} onClick={handleLogout} className="navbar-brand">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to={"registration"} className="navbar-brand">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Link>
              <Link to={"login"} className="navbar-brand">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
            </>
          )}

          <Link to={"cart"} className="navbar-brand">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
