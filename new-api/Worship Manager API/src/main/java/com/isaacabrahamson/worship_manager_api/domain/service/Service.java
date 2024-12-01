package com.isaacabrahamson.worship_manager_api.domain.service;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "theme", nullable = false)
    private String theme;

    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
