package by.bsuir.service;

import by.bsuir.service.dto.Paging;

import java.util.List;

public interface CrudService<E> {

    E save(E e);

    E update(E e);

    List<E> findAll(Paging paging);

    void delete(Long id);

    E findById(Long id);
}
