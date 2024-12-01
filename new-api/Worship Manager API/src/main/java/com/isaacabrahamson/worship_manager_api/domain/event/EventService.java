package com.isaacabrahamson.worship_manager_api.domain.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository repository;

    public List<EventDto> findAllEvents() {
        return repository.findAll().stream().map(EventMapper::toEventDto).toList();
    }

    public EventDto createEvent(EventDto eventDto) {
        Event newEvent = EventMapper.fromEventDto(eventDto);
        Event savedEvent = repository.save(newEvent);
        return EventMapper.toEventDto(savedEvent);
    }

    public void deleteEvent(Long eventId) {
        repository.deleteById(eventId);
    }
}
