import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faSave} from '@fortawesome/free-solid-svg-icons'

export default class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {title:'', author:''};
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    submitBook(event) {
        alert('Title: ' + this.state.title + ' Author: ' + this.state.author);
        event.preventDefault();
    }

    bookChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/>Add New Book</Card.Header>
                <Form onSubmit={this.submitBook} id="bookFormId">
                    <Card.Body as={Row}>
                            <Form.Group
                                className="mb-3"
                                controlId="formGridTitle"
                                as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type="test" name="title"
                                    value={this.state.title}
                                    onChange={this.bookChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Title" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    required
                                    controlId="formGridAuthor"
                                    value={this.state.author}
                                    onChange={this.bookChange}
                                    type="test" name="author"
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Author" />
                            </Form.Group>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave}/>Submit
                                </Button>
                            </Card.Footer>
                    </Card.Body>
                </Form>
            </Card>
        );
    }
}