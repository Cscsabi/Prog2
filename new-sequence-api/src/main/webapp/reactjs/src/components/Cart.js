import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const Cart = ({
  bookInCart: { id, author, coverPhotoUrl, isbnNumber, language, price, title },
}) => {
  const removeFromCart = () => {
    localStorage.removeItem(id);
  };

  return (
    <Row align="center" className="align-items-center">
      <Col>
        {" "}
        <img src={coverPhotoUrl} alt="cover" width="150" height="150"></img>
      </Col>
      <Col>{title}</Col>
      <Col>{author}</Col>
      <Col>{isbnNumber}</Col>
      <Col>{language}</Col>
      <Col>{price} Ft</Col>
      <Col>
        <Button
          className="btn btn-dark btn-lg"
          type="contained"
          onClick={removeFromCart}
        >
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </Button>
      </Col>
    </Row>
  );
};
