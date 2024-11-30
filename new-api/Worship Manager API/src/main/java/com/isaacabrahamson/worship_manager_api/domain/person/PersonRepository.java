package com.isaacabrahamson.worship_manager_api.domain.person;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByUserId(Long userId);
}
