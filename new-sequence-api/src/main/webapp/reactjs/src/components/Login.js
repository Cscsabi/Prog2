import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { dispatch, authenticated } = useStoreon("authenticated");
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [history, authenticated]);

  const handleClick = useCallback(() => {
    if (emailAddress.length !== 0 || password.length !== 0) {
      dispatch(AppEvents.Login, {
        username: emailAddress,
        password,
        last: lastName,
        first: firstName,
      });
    }
  }, [dispatch, emailAddress, password]);

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
            <Form>
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
