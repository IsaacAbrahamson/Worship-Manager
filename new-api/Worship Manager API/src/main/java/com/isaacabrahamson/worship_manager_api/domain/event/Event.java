package com.isaacabrahamson.worship_manager_api.domain.event;

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
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    @Column(name = "type_id", nullable = false)
    private Long typeId;

    @Column(name = "event_order", nullable = false)
    private Long eventOrder;

    @Column(name = "song_id", nullable = false)
    private Long songId;
}
