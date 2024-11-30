package com.isaacabrahamson.worship_manager_api.domain.user;

public class UserMapper {
    public static UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }

    public static User fromUserDto(UserDto dto) {
        return new User(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail()
        );
    }
}
