package com.isaacabrahamson.worship_manager_api.domain.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository repository;

    public List<ServiceDto> findAllServices() {
        return repository.findAll().stream().map(ServiceMapper::toServiceDto).toList();
    }

    public ServiceDto createService(ServiceDto serviceDto) {
        Service newService = ServiceMapper.fromServiceDto(serviceDto);
        Service savedService = repository.save(newService);
        return ServiceMapper.toServiceDto(savedService);
    }

    public void deleteService(Long serviceId) {
        repository.deleteById(serviceId);
    }
}
