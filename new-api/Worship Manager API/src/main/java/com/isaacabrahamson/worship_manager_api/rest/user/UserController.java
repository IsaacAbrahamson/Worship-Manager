package com.isaacabrahamson.worship_manager_api.rest.user;

import com.isaacabrahamson.worship_manager_api.domain.user.UserDto;
import com.isaacabrahamson.worship_manager_api.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/{@userId}")
    public UserDto findCurrentUser(@PathVariable Long userId) {
        return userService.findUserById(userId);
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }
}