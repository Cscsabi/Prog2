package com.newsequence.api.service.impl;
import com.newsequence.api.model.Book;
import com.newsequence.api.repository.BookRepository;
import com.newsequence.api.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class NewSequenceBookService implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book getBook(Long id) {
        return bookRepository.getById(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }
}
