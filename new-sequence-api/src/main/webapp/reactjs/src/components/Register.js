import React, { useEffect, useState } from "react";
import { MyToast } from "./MyToast";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { MyToastFail } from "./MyToastFail";
import { useHistory } from "react-router";

export const Register = () => {
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [show, setShow] = useState(0);

  const registerUser = (e) => {
    e.preventDefault();
    const currentUser = { emailAddress, lastName, firstName, password, role };
    const exists = user.find(
      (thisUser) => thisUser.emailAddress === currentUser.emailAddress
    );
    const validPassword = password.length > 5;
    const validEmail = checkEmail(emailAddress);
    const validFirstName = firstName.length > 1;
    const validLastName = lastName.length > 1;
    if (
      !exists &&
      validPassword &&
      validEmail &&
      validFirstName &&
      validLastName
    ) {
      fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      }).then(() => {
        console.log("New user added");
        setShow(1);
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setPassword("");
        setTimeout(() => setShow(0), 3000);
      });
    } else if (!validEmail) {
      alert("Given email is not valid!");
    } else if (!validLastName) {
      alert("Given lastname is too short! Must be longer than 1 character.");
    } else if (!validFirstName) {
      alert("Given firstname is too short! Must be longer than 1 character.");
    } else if (!validPassword) {
      alert("Given password is too short! Must be longer than 5 characters.");
    } else {
      setShow(2);
      setEmailAddress("");
      setPassword("");
      setTimeout(() => setShow(0), 3000);
    }
  };

  function checkEmail(email) {
    email = email.toLowerCase();
    if (
      email.includes("@") &&
      email.indexOf(".") > email.indexOf("@") &&
      (email.endsWith(".com") ||
        email.endsWith(".cc") ||
        email.endsWith(".org") ||
        email.endsWith(".hu"))
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  if (show === 1) {
    return (
      <div>
        <div>
          <MyToast />
        </div>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} /> Register
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
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
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter Email Address"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter Last Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter First Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form.Group
                  as={Col}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
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
                    />
                  </InputGroup>
                </Form.Group>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  className="btn btn-success btn-med"
                  onClick={registerUser}
                  disabled={
                    emailAddress.length === 0 ||
                    password.length === 0 ||
                    firstName.length === 0 ||
                    lastName.length === 0
                  }
                >
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Register
                </Button>{" "}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else if (show === 2) {
    return (
      <div>
        <div>
          <MyToastFail />
        </div>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} /> Register
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
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
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter Email Address"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter Last Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={"bg-dark text-white"}
                        placeholder="Enter First Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <br />
                <Form.Group
                  as={Col}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
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
                    />
                  </InputGroup>
                </Form.Group>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  className="btn btn-success btn-med"
                  onClick={registerUser}
                  disabled={
                    emailAddress.length === 0 ||
                    password.length === 0 ||
                    firstName.length === 0 ||
                    lastName.length === 0
                  }
                >
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Register
                </Button>{" "}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} /> Register
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className={"bg-dark text-white"}
                      placeholder="Enter Email Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
              <br />
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={"bg-dark text-white"}
                      placeholder="Enter Last Name"
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
              <br />
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={"bg-dark text-white"}
                      placeholder="Enter First Name"
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
              <br />
              <Form.Group
                as={Col}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
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
                  />
                </InputGroup>
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                size="sm"
                type="button"
                variant="success"
                className="btn btn-success btn-med"
                onClick={registerUser}
                disabled={
                  emailAddress.length === 0 ||
                  password.length === 0 ||
                  firstName.length === 0 ||
                  lastName.length === 0
                }
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Register
              </Button>{" "}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
};