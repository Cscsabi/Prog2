import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { useStoreon } from "storeon/react";
import { AppEvents } from "../store";

export const Cart = ({
  bookInCart: {
    id,
    author,
    coverPhotoUrl,
    isbnNumber,
    language,
    price,
    quantity,
    title,
  },
}) => {
  const increaseQuantity = () => {
    dispatch(AppEvents.AddToCart, book);
  };

  const book = {
    id,
    author,
    coverPhotoUrl,
    isbnNumber,
    language,
    price,
    quantity,
    title,
  };
  const removeFromCart = () => {
    let values = Object.values(cart);
    console.log(values);
    values = values.filter((x) => x.id === book.id);
    dispatch(AppEvents.RemoveFromCart, values[0]);
    console.log(values);
    alert(title + " deleted successfully!");
    //console.log(cart);
  };

  const { dispatch, cart } = useStoreon("cart");

  return (
    <tr align="center" className="align-items-center">
      <td>
        {" "}
        <img src={coverPhotoUrl} alt="cover" width="150" height="200"></img>
      </td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{isbnNumber}</td>
      <td>{language}</td>
      <td>{price * quantity} Ft</td>
      <td>{quantity}</td>

      <td align="center">
        <br />
        <br />
        <Button
          className="btn btn-dark btn-sm"
          type="contained"
          onClick={increaseQuantity}
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
        <br />
        <br />
        <br />
        <Button
          className="btn btn-dark btn-sm"
          type="contained"
          onClick={removeFromCart}
        >
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </Button>
      </td>
    </tr>
  );
};
