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
/*
    private Long bookId = 100L;
    private Map<Long, Book> bookMap = new HashMap<Long, Book>();

    {
        Book book = new Book();
        book.setId(bookId);
        book.setTitle("Spring Microservices in Action");
        book.setAuthor("John Carnell");
        book.setCoverPhotoUrl("https://images.manning.com/book/a/6485b53-630d-4e44-9503-46d4329fbd35/Huaylupo-2ed-HI.png");
        book.setIsbnNumber(1617293989L);
        book.setPrice(18740.00);
        book.setLanguage("English");
        bookMap.put(book.getId(), book);
    }*/

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book getBook(Long id) {
        return bookRepository.findById(id).get();
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }
}
