package com.isaacabrahamson.worship_manager_api.domain.role;

public class RoleMapper {
    public static RoleDto toRoleDto(Role role) {
        return new RoleDto(
                role.getId(),
                role.getRoleName(),
                role.getUserId()
        );
    }

    public static Role fromRoleDto(RoleDto roleDto) {
        return new Role(
                roleDto.getId(),
                roleDto.getRole(),
                roleDto.getUserId()
        );
    }
}
