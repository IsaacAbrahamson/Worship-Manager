package com.isaacabrahamson.worship_manager_api.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private Long id;
    private Long serviceId;
    private Long typeId;
    private Long eventOrder;
    private Long songId;
}
