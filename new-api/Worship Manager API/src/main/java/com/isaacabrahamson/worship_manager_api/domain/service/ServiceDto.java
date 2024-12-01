package com.isaacabrahamson.worship_manager_api.domain.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDto {
    private Long id;
    private Date date;
    private String theme;
    private Long typeId;
    private Long userId;
}
