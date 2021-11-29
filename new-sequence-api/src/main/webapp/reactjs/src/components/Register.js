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
import { useHistory } from "react-router-dom";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const Register = () => {
  const { dispatch, authenticated } = useStoreon("authenticated");
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(0);

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [history, authenticated]);

  const onlyAlpha = (str) => {
    let res = true;
    const chars = [...str];
    chars.forEach((c) => {
      if (/^[A-Z,Á,É,Í,Ó,Ö,Ő,Ú,Ü,Ű,-]$/i.test(c) === false) {
        res = false;
      }
    });

    return res;
  };

  const registerUser = () => {
    if (
      emailAddress.length !== 0 &&
      password.length !== 0 &&
      firstName.length !== 0 &&
      lastName.length !== 0
    ) {
      const validPassword = password.length > 5;
      const validEmail = checkEmail(emailAddress);
      const validFirstName = firstName.length > 1 && onlyAlpha(firstName);
      const validLastName = lastName.length > 1 && onlyAlpha(lastName);
      if (validPassword && validEmail && validFirstName && validLastName) {
        dispatch(AppEvents.Register, { username: emailAddress, password, last: lastName, first: firstName });
        alert(`User with ${emailAddress} registered successfully!`);
      } else if (!validEmail) {
        alert("Given email is not valid!");
      } else if (!validLastName) {
        if (onlyAlpha(lastName))
          alert(
            "Given lastname is too short! Must be longer than 1 character."
          );
        else alert("Invalid lastname!");
      } else if (!validFirstName) {
        if (onlyAlpha(firstName))
          alert(
            "Given firstname is too short! Must be longer than 1 character."
          );
        else alert("Invalid firstname!");
      } else if (!validPassword) {
        alert("Given password is too short! Must be longer than 5 characters.");
      } else {
        setShow(2);
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setPassword("");
        setTimeout(() => setShow(0), 1500);
      }
    }
  };

  const reverseString = (str) => {
    if (str === "") return "";
    else return reverseString(str.substr(1)) + str.charAt(0);
  };

  function checkEmail(email) {
    email = email.toLowerCase();
    const reverse = reverseString(email);
    if (
      email.includes("@") &&
      reverse.indexOf(".") < reverse.indexOf("@") &&
      (email.endsWith(".com") ||
        email.endsWith(".cc") ||
        email.endsWith(".org") ||
        email.endsWith(".hu"))
    ) {
      return true;
    }
    return false;
  }

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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
                            e.preventDefault();
                          }
                        }}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          registerUser();
                          e.preventDefault();
                        }
                      }}
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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
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
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            registerUser();
                            e.preventDefault();
                          }
                        }}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          registerUser();
                          e.preventDefault();
                        }
                      }}
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
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          registerUser();
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
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          registerUser();
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
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          registerUser();
                          e.preventDefault();
                        }
                      }}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        registerUser();
                        e.preventDefault();
                      }
                    }}
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
