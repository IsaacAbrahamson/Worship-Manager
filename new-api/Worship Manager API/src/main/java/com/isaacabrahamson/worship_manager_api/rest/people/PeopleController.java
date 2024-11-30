package com.isaacabrahamson.worship_manager_api.rest.people;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/people")
public class PeopleController {
    @GetMapping("/")
    public void findAllPeople() {
        // TODO: Implement logic
    }

    @PostMapping("/new")
    public void createPerson() {
        // TODO: Implement logic
    }

    @PutMapping("/")
    public void updatePerson() {
        // TODO: Implement logic
    }

    @DeleteMapping("/")
    public void deletePerson() {
        // TODO: Implement logic
    }
}
