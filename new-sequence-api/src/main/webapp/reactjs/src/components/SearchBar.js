import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const SearchBar = ({ input, setInput, update }) => {
  return (
    <Form
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          update();
          e.preventDefault();
        }
      }}
    >
      <InputGroup className="mb-2" style={{ width: "40rem" }}>
        <FormControl
          id="inlineFormInputGroup"
          placeholder="Search for books or authors"
          onChange={(input) => setInput(input.target.value)}
          autoComplete="off"
          value={input}
        />
        <InputGroup.Text>
          <Button style={{ border: 0 }} onClick={update}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
