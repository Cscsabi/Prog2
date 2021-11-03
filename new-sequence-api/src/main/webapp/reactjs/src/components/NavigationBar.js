import React, {Component} from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to={""} className="navbar-brand">
                        <img src={require("./book-icon-156.jpg")} alt="brand" width="25" height="25"/>Book Shop
                    </Link>
                    <Nav className="mr-auto">
                        <Link to={"add"} className="navbar-brand">Add Book</Link>
                        <Link to={"list"} className="navbar-brand">Book List</Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}