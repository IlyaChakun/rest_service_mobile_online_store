package by.bsuir.service.impl;

import by.bsuir.entity.Brand;
import by.bsuir.repository.BrandRepository;
import by.bsuir.service.BrandService;
import by.bsuir.service.dto.BrandDto;
import by.bsuir.service.dto.Paging;
import by.bsuir.service.dto.mapper.BrandMapper;
import by.bsuir.service.exception.ResourceNotFoundException;
import by.bsuir.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static org.springframework.util.Assert.notNull;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;


    @Autowired
    public BrandServiceImpl(BrandRepository brandRepository,
                            BrandMapper brandMapper) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
    }

    @Override
    @Transactional
    public BrandDto save(BrandDto brandDto) {
        brandRepository.findByName(brandDto.getName())
                .ifPresent(value -> {
                            throw new ServiceException("Brand with name=" + value.getName() + " is already exist!");
                        }
                );
        Brand brand = brandRepository.save(brandMapper.toEntity(brandDto));
        return brandMapper.toDto(brand);
    }

    @Override
    @Transactional
    public BrandDto update(BrandDto brandDto) {
        brandRepository.findById(brandDto.getId())
                .ifPresent(value -> {
                            throw new ResourceNotFoundException(value.getId());
                        }
                );
        Brand updatedBrand = brandRepository.save(brandMapper.toEntity(brandDto));
        return brandMapper.toDto(updatedBrand);
    }

    @Override
    public List<BrandDto> findAll(Paging paging) {
        Pageable pageable = PageRequest.of(paging.getPage(), paging.getSize());
        Page<Brand> tags = brandRepository.findAll(pageable);
        return brandMapper.toDtoList(tags.toList());
    }

    @Override
    public List<BrandDto> findAll() {
        return brandMapper.toDtoList(brandRepository.findAll());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        notNull(id, "Can`t delete, because brandId is null");
        Brand brand =
                brandRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(id));
        brandRepository.delete(brand);
    }

    @Override
    public BrandDto findById(Long id) {
        notNull(id, "Can`t search, because id is null");
        return brandMapper.toDto(
                brandRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(id)));
    }

}
