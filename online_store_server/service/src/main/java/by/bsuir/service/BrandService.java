package by.bsuir.service;

import by.bsuir.service.dto.BrandDto;

import java.util.List;

public interface BrandService extends CrudService<BrandDto> {

    List<BrandDto> findAll();
}
