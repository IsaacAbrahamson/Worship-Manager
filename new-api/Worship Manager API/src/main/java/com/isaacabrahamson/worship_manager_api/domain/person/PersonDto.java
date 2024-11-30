package com.isaacabrahamson.worship_manager_api.domain.person;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long userId;
}
