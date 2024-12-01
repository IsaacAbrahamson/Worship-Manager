package com.isaacabrahamson.worship_manager_api.domain.service.people;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service_people")
public class ServicePeople {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    @Column(name = "person_id", nullable = false)
    private Long personId;

    @Column(name = "role_id", nullable = false)
    private Long roleId;
}
