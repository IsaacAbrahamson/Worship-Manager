package com.isaacabrahamson.worship_manager_api.domain.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.MissingResourceException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.fromUserDto(userDto);
        User savedUser = repository.save(user);
        return UserMapper.toUserDto(savedUser);
    }

    public UserDto findUserById(Long userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("No user found with id " + userId));
        return UserMapper.toUserDto(user);
    }
}
