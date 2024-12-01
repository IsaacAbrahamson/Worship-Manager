package com.isaacabrahamson.worship_manager_api.domain.song;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository repository;

    public List<SongDto> findAllSongs() {
        return repository.findAll().stream().map(SongMapper::toSongDto).toList();
    }

    public SongDto createSong(SongDto songDto) {
        Song newSong = SongMapper.fromSongDto(songDto);
        Song savedSong = repository.save(newSong);
        return SongMapper.toSongDto(savedSong);
    }

    public void deleteSong(Long songId) {
        repository.deleteById(songId);
    }
}
