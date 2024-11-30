package com.isaacabrahamson.worship_manager_api.rest.auth;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public void login() {
        // TODO: Implement logic
    }

    @GetMapping("/logout")
    public void logout() {
        // TODO: Implement logic
    }

    @GetMapping("/user")
    public void findUser() {
        // TODO: Implement logic
    }

    @PostMapping("/register")
    public void register() {
        // TODO: Implement logic
    }
}