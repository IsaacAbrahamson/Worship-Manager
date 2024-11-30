package com.isaacabrahamson.worship_manager_api.domain.person;

public class PersonMapper {
    public static PersonDto toPersonDto(Person person) {
        return new PersonDto(
                person.getId(),
                person.getFirstName(),
                person.getLastName(),
                person.getEmail(),
                person.getUserId()
        );
    }

    public static Person fromPersonDto(PersonDto personDto) {
        return new Person(
                personDto.getId(),
                personDto.getFirstName(),
                personDto.getLastName(),
                personDto.getEmail(),
                personDto.getUserId()
        );
    }
}
