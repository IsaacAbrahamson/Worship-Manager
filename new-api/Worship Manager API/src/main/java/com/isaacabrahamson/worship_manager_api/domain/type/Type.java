package com.isaacabrahamson.worship_manager_api.domain.type;

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
@Table(name = "type")
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "background", nullable = false)
    private String background;

    @Column(name = "user_id", nullable = false)
    private Long userId;
}
