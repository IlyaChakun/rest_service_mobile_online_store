package by.bsuir.service.dto.mapper;

import by.bsuir.entity.AbstractEntity;
import by.bsuir.service.dto.AbstractDto;

import java.util.List;

public interface Mapper<E extends AbstractEntity, D extends AbstractDto> {

    E toEntity(D d);

    D toDto(E e);

    List<D> toDtoList(List<E> eList);
}