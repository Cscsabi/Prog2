import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchBar = ({ input, setInput, update }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputGroup className="mb-2" style={{ width: "40rem" }}>
        <FormControl
          id="inlineFormInputGroup"
          placeholder="Search for books or authors"
          onChange={(input) => setInput(input.target.value)}
          autoComplete="false"
          value={input}
        />
        <InputGroup.Text>
          <Link to={"search"} onClick={update}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
