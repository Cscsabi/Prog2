package com.newsequence.api.controller;

import com.newsequence.api.model.Book;

import com.newsequence.api.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public Book getById(@PathVariable(value = "id") Long bookId) {
        return this.bookService.getBook(bookId);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }
}
