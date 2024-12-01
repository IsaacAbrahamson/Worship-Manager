package com.isaacabrahamson.worship_manager_api.domain.service;

public class ServiceMapper {
    public static ServiceDto toServiceDto(Service service) {
        return new ServiceDto(
                service.getId(),
                service.getDate(),
                service.getTheme(),
                service.getTypeId(),
                service.getUserId()
        );
    }

    public static Service fromServiceDto(ServiceDto serviceDto) {
        return new Service(
                serviceDto.getId(),
                serviceDto.getDate(),
                serviceDto.getTheme(),
                serviceDto.getTypeId(),
                serviceDto.getUserId()
        );
    }
}
