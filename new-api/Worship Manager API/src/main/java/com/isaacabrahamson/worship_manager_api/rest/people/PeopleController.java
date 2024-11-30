package com.isaacabrahamson.worship_manager_api.rest.people;

import com.isaacabrahamson.worship_manager_api.domain.person.PersonDto;
import com.isaacabrahamson.worship_manager_api.domain.person.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/people")
public class PeopleController {
    private final PersonService personService;

    @GetMapping("/{userId}")
    public PersonDto findPerson(@PathVariable Long userId) {
        return personService.findPersonByUserId(userId);
    }

    @PostMapping("/")
    public PersonDto createPerson(@RequestBody PersonDto personDto) {
        return personService.updatePerson(personDto);
    }

    @PutMapping("/")
    public PersonDto updatePerson(@RequestBody PersonDto personDto) {
        return personService.updatePerson(personDto);
    }

    @DeleteMapping("/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.deletePerson(personId);
    }
}
