import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";

export const Login = () => {
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
                    //value={email}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email Address"
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
                    type="text"
                    name="email"
                    //value={password}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
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
              //disabled={
              //  this.state.email.length === 0 &&
              //  this.state.password.length === 0
              //}
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
