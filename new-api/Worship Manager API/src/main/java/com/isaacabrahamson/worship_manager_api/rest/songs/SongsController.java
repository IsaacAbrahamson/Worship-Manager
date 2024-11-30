package com.isaacabrahamson.worship_manager_api.rest.songs;

import com.isaacabrahamson.worship_manager_api.domain.song.SongDto;
import com.isaacabrahamson.worship_manager_api.domain.song.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/songs")
public class SongsController {
    private final SongService songService;

    @GetMapping("/")
    public List<SongDto> findAllSongs() {
        return songService.findAllSongs();
    }

    @PostMapping("/")
    public SongDto createSong(@RequestBody SongDto songDto) {
        return songService.updateSong(songDto);
    }

    @PutMapping("/")
    public SongDto updateSong(@RequestBody SongDto songDto) {
        return songService.updateSong(songDto);
    }

    @DeleteMapping("/{songId}")
    public void deleteSong(@PathVariable Long songId) {
        songService.deleteSong(songId);
    }
}
