package com.isaacabrahamson.worship_manager_api.domain.service.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEventTypeDto {
    private Long id;
    private String type;
    private Long userId;
}
