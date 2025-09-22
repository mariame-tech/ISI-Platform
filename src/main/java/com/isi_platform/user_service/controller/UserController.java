package com.isi_platform.user_service.controller;
import com.isi_platform.user_service.dto.UserRegistrationRequest;
import com.isi_platform.user_service.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    // Nous injecterons et utiliserons le service à la prochaine étape.
    private final UserService userService;

    public UserController(UserService userService) {
       this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {

        userService.registerNewUser(registrationRequest);
        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }
}
