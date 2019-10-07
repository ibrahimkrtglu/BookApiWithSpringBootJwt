package io.ibo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.ibo.model.Book;

@Repository
public interface BookRepository extends CrudRepository<Book,Long> {

}
