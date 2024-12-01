package com.isaacabrahamson.worship_manager_api.rest.service;

import com.isaacabrahamson.worship_manager_api.domain.service.ServiceDto;
import com.isaacabrahamson.worship_manager_api.domain.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/service")
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping("/")
    public List<ServiceDto> findAllServices() {
        return serviceService.findAllServices();
    }

    @PostMapping("/")
    public ServiceDto createService(@RequestBody ServiceDto serviceDto) {
        return serviceService.createService(serviceDto);
    }

    @DeleteMapping("/{serviceId}")
    public void deleteService(@PathVariable Long serviceId) {
        serviceService.deleteService(serviceId);
    }
}
