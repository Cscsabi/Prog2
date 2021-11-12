import React, { useEffect, useState } from "react";
import {
  faEnvelope,
  faLock,
  faPhone,
  faSignInAlt,
  faUndo,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const Register = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/register")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  /*const registerUser = () => {
    if () {}
  } */

  return (
    <Row className="justify-content-md-center">
      <Col xs={5}>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Register
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    //value={email}
                    className={"bg-dark text-white"}
                    placeholder="Enter Name"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <br />
            <Form>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    //value={password}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email Address"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <br />
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="password"
                  name="password"
                  //value={email}
                  className={"bg-dark text-white"}
                  placeholder="Enter Password"
                />
              </InputGroup>
            </Form.Group>
            <br />
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="email"
                  //value={email}
                  className={"bg-dark text-white"}
                  placeholder="Enter Contact Number"
                />
              </InputGroup>
            </Form.Group>
          </Card.Body>
          <Card.Footer style={{ "text-align": "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              className="btn btn-success btn-med"
              //onClick={registerUser}
              //disabled={email.length === 0 && password.length === 0}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Register
            </Button>{" "}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
