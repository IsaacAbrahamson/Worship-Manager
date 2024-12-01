package com.isaacabrahamson.worship_manager_api.domain.type;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeService {
    private final TypeRepository repository;

    public List<TypeDto> findAllTypes() {
        return repository.findAll().stream().map(TypeMapper::toTypeDto).toList();
    }

    public TypeDto createType(TypeDto typeDto) {
        Type newType = TypeMapper.fromTypeDto(typeDto);
        Type savedType = repository.save(newType);
        return TypeMapper.toTypeDto(savedType);
    }

    public void deleteType(Long typeId) {
        repository.deleteById(typeId);
    }
}
