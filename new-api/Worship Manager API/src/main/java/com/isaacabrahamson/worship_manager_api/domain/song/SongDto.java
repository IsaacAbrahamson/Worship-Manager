package com.isaacabrahamson.worship_manager_api.domain.song;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongDto {
    private Long id;
    private String name;
    private Integer page;
    private Date lastUsed;
    private Long userId;
}
