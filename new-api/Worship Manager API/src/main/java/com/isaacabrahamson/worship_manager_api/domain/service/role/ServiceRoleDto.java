package com.isaacabrahamson.worship_manager_api.domain.service.role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRoleDto {
    private Long id;
    private String role;
    private Long userId;
}
