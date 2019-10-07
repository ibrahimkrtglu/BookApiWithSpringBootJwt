package io.ibo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.ibo.model.Book;
import io.ibo.repository.BookRepository;


@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> getAllBooks() {
		List<Book> list=new ArrayList<>();
		bookRepository.findAll()
		.forEach(list::add);
		return list;
	}

	public Book addBook(Book book) {
		return bookRepository.save(book);
	}

	public Book updateBook(Book new_book, long id) {
		return bookRepository.save(new_book);
		
	}

	public long deleteBook(long id) {
		bookRepository.deleteById(id);
		return id;
	}

	
}
