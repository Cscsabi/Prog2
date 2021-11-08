package com.newsequence.api.service;

import com.newsequence.api.model.Book;

import java.util.List;

public interface BookService {

    Book addBook(Book book);

    Book getBook(Long id);

    List<Book> getBooks();

}
