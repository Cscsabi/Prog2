package com.newsequence.api.service;

import com.newsequence.api.model.Book;

public interface BookService {

    Book addBook(Book book);

    Book getBook(Long id);

}
