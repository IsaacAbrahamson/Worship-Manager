package com.isaacabrahamson.worship_manager_api.rest.event;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventController {
    @GetMapping("/")
    public void findAllEvents() {
        // TODO: Implement logic
    }

    @PostMapping("/")
    public void createEvent() {
        // TODO: Implement logic
    }

    @DeleteMapping("/")
    public void deleteEvent() {
        // TODO: Implement logic
    }
}
