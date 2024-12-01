package com.isaacabrahamson.worship_manager_api.domain.event;

public class EventMapper {
    public static EventDto toEventDto(Event event) {
        return new EventDto(
                event.getId(),
                event.getServiceId(),
                event.getTypeId(),
                event.getEventOrder(),
                event.getSongId()
        );
    }

    public static Event fromEventDto(EventDto eventDto) {
        return new Event(
                eventDto.getId(),
                eventDto.getServiceId(),
                eventDto.getTypeId(),
                eventDto.getEventOrder(),
                eventDto.getSongId()
        );
    }
}
