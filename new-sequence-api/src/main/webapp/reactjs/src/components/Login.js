import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { useAppContext } from "../lib/contextLib";
import { AppEvents } from "../store";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const { dispatch } = useStoreon("authenticated");

  const [user, setUser] = useState([]);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = { emailAddress, password };

  const handleClick = () => {
    if (emailAddress.length !== 0 || password.length !== 0) {
      const found = user.find(
        (thisUser) =>
          thisUser.emailAddress === currentUser.emailAddress &&
          thisUser.password === currentUser.password
      );

      if (found) {
        dispatch(AppEvents.Login);
        dispatch(
          AppEvents.SetCurrentUser,
          found.firstName + " " + found.lastName
        );
        alert("Logged in successfully!");
        history.push("/");
        setEmailAddress("");
        setPassword("");
      } else {
        alert("User not found!");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  const history = useHistory();

  return (
    <Row className="justify-content-md-center">
      <Col xs={5}>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email Address"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        handleClick();
                        e.preventDefault();
                      }
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <br />
            <Form ű>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        handleClick();
                        e.preventDefault();
                      }
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer style={{ "text-align": "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              className="btn btn-primary btn-med"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Login
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
