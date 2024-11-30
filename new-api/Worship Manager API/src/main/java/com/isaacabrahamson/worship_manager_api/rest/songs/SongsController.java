package com.isaacabrahamson.worship_manager_api.rest.songs;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/songs")
public class SongsController {
    @GetMapping("/")
    public void findAllSongs() {
        // TODO: Implement logic
    }

    @PostMapping("/")
    public void createSong() {
        // TODO: Implement logic
    }

    @PatchMapping("/")
    public void updateSong() {
        // TODO: Implement logic
    }

    @DeleteMapping("/")
    public void deleteSong() {
        // TODO: Implement logic
    }
}
