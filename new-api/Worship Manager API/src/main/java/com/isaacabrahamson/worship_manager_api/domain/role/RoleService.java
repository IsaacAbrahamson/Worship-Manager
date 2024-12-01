package com.isaacabrahamson.worship_manager_api.domain.role;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoleService {
    private final RoleRepository repository;

    public List<RoleDto> findAllRoles() {
        return repository.findAll().stream().map(RoleMapper::toRoleDto).toList();
    }

    public RoleDto createRole(RoleDto roleDto) {
        Role newRole = RoleMapper.fromRoleDto(roleDto);
        Role savedRole = repository.save(newRole);
        return RoleMapper.toRoleDto(savedRole);
    }

    public void deleteRole(Long roleId) {
        repository.deleteById(roleId);
    }
}
