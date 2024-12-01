package com.isaacabrahamson.worship_manager_api.domain.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeDto {
    private Long id;
    private String type;
    private String color;
    private String background;
    private Long userId;
}
