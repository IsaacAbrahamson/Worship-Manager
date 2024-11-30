package com.isaacabrahamson.worship_manager_api.rest.services;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
public class ServicesController {
    @GetMapping("/upcoming")
    public void findUpcoming() {
        // TODO: Implement logic
    }

    @GetMapping("/past")
    public void findPast() {
        // TODO: Implement logic
    }

    @PostMapping("/")
    public void createService() {
        // TODO: Implement logic
    }

    @GetMapping("/{id}")
    public void findService(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @PutMapping("/{id}")
    public void updateService(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @GetMapping("/{id}/events")
    public void findServiceEvents(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @PostMapping("/{id}/events")
    public void createServiceEvent(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @DeleteMapping("/{id}/events")
    public void deleteServiceEvent(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @GetMapping("/{id}/people")
    public void findServicePeople(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @PostMapping("/{id}/people")
    public void createServicePerson(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }

    @DeleteMapping("/{id}/people")
    public void deleteServicePerson(@PathVariable("id") Long serviceId) {
        // TODO: Implement logic
    }
}
