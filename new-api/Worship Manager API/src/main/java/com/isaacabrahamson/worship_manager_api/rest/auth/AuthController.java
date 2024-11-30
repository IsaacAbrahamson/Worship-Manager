package com.isaacabrahamson.worship_manager_api.rest.auth;

import com.isaacabrahamson.worship_manager_api.domain.user.UserDto;
import com.isaacabrahamson.worship_manager_api.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public void login() {
        // TODO: Implement logic
    }

    @GetMapping("/logout")
    public void logout() {
        // TODO: Implement logic
    }

    @GetMapping("/user")
    public void findCurrentUser() {
        // TODO: Implement logic
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }
}