package com.isaacabrahamson.worship_manager_api.domain.person;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository repository;

    public PersonDto findPersonByUserId(Long userId) {
        Person person = repository.findByUserId(userId);
        return PersonMapper.toPersonDto(person);
    }

    public PersonDto updatePerson(PersonDto personDto) {
        Person newPerson = PersonMapper.fromPersonDto(personDto);
        Person savedPerson = repository.save(newPerson);
        return PersonMapper.toPersonDto(savedPerson);
    }

    public void deletePerson(Long personId) {
        repository.deleteById(personId);
    }
}
