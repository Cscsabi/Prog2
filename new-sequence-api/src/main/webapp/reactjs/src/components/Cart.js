import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

export const Cart = ({
  bookInCart: { id, author, coverPhotoUrl, isbnNumber, language, price, title },
}) => {
  const [cheat, setCheat] = useState(0);

  const removeFromCart = () => {
    localStorage.removeItem(id);
    alert(title + " deleted successfully!");
    setCheat(cheat + 1);
  };

  return (
    <Row align="center" className="align-items-center">
      <Col>
        {" "}
        <img src={coverPhotoUrl} alt="cover" width="150" height="200"></img>
      </Col>
      <Col>{title}</Col>
      <Col>{author}</Col>
      <Col>{isbnNumber}</Col>
      <Col>{language}</Col>
      <Col>{price} Ft</Col>
      <Col align="center">
        <Button
          className="btn btn-dark btn-sm"
          type="contained"
          onClick={removeFromCart}
        >
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </Button>
      </Col>
    </Row>
  );
};
