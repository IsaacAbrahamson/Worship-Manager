package com.isaacabrahamson.worship_manager_api.rest.event;

import com.isaacabrahamson.worship_manager_api.domain.event.EventDto;
import com.isaacabrahamson.worship_manager_api.domain.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/event")
public class EventController {
    private final EventService eventService;

    @GetMapping("/")
    public List<EventDto> findAllEvents() {
        return eventService.findAllEvents();
    }

    @PostMapping("/")
    public EventDto createEvent(@RequestBody EventDto eventDto) {
        return eventService.createEvent(eventDto);
    }

    @DeleteMapping("/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
    }
}
