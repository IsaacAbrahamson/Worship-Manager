package com.isaacabrahamson.worship_manager_api.domain.song;

public class SongMapper {
    public static SongDto toSongDto(Song song) {
        return new SongDto(
                song.getId(),
                song.getName(),
                song.getPage(),
                song.getLastUsed(),
                song.getUserId()
        );
    }

    public static Song fromSongDto(SongDto songDto) {
        return new Song(
                songDto.getId(),
                songDto.getName(),
                songDto.getPage(),
                songDto.getLastUsed(),
                songDto.getUserId()
        );
    }
}
