package com.isaacabrahamson.worship_manager_api.domain.service.people;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicePeopleDto {
    private Long id;
    private Long serviceId;
    private Long personId;
    private Long roleId;
}
