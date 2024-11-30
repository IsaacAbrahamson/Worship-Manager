package com.isaacabrahamson.worship_manager_api.rest.options;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/options")
public class OptionsController {
    @GetMapping("/events")
    public void findAllEvents() {
        // TODO: Implement logic
    }

    @PostMapping("/events")
    public void createEvent() {
        // TODO: Implement logic
    }

    @DeleteMapping("/events")
    public void deleteEvent() {
        // TODO: Implement logic
    }

    @GetMapping("/roles")
    public void findAllRoles() {
        // TODO: Implement logic
    }

    @PostMapping("/roles")
    public void createRole() {
        // TODO: Implement logic
    }

    @DeleteMapping("/roles")
    public void deleteRole() {
        // TODO: Implement logic
    }

    @GetMapping("/types")
    public void findAllTypes() {
        // TODO: Implement logic
    }

    @PostMapping("/types")
    public void createType() {
        // TODO: Implement logic
    }

    @PutMapping("/types")
    public void updateType() {
        // TODO: Implement logic
    }

    @DeleteMapping("/types")
    public void deleteType() {
        // TODO: Implement logic
    }
}
