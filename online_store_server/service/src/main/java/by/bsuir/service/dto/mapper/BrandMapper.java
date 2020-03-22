package by.bsuir.service.dto.mapper;

import by.bsuir.entity.Brand;
import by.bsuir.service.dto.BrandDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BrandMapper extends AbstractMapper<Brand, BrandDto> {

    @Autowired
    public BrandMapper() {
        super(Brand.class, BrandDto.class);
    }

}

