package com.isaacabrahamson.worship_manager_api.domain.service.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceTypeDto {
    private Long id;
    private String type;
    private String color;
    private String background;
    private Long userId;
}
