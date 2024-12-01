package com.isaacabrahamson.worship_manager_api.rest.role;

import com.isaacabrahamson.worship_manager_api.domain.role.RoleDto;
import com.isaacabrahamson.worship_manager_api.domain.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/role")
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/")
    public List<RoleDto> findAllRoles() {
        return roleService.findAllRoles();
    }

    @PostMapping("/")
    public RoleDto createRole(@RequestBody RoleDto roleDto) {
        return roleService.createRole(roleDto);
    }

    @DeleteMapping("/{roleId}")
    public void deleteRole(@PathVariable Long roleId) {
        roleService.deleteRole(roleId);
    }
}
