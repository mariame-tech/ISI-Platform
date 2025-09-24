package com.isi_platform.user_service.controller;
/*
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
}*/

//Dikhsa EDIT

// NOUVEAU: Importations nécessaires pour le nouvel endpoint.
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;


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

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // C'est ta méthode d'enregistrement. Elle reste inchangée.
    // Elle est publique grâce à notre nouvelle configuration de sécurité.
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        userService.registerNewUser(registrationRequest);
        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }

    // NOUVEAU: Une méthode de test pour les routes sécurisées.
    // @GetMapping crée un endpoint qui répond aux requêtes GET.
    // L'URL complète sera http://localhost:8083/api/v1/users/me
    @GetMapping("/me")
    public ResponseEntity<String> getMyInfo(@AuthenticationPrincipal Jwt principal) {
        // @AuthenticationPrincipal est une annotation "magique" de Spring Security.
        // Elle injecte directement les informations de l'utilisateur qui a été authentifié via le token.
        // L'objet 'principal' est notre token JWT décodé.

        // On extrait une information du token (une "claim").
        // "preferred_username" est le champ standard où Keycloak met le nom d'utilisateur.
        String username = principal.getClaimAsString("preferred_username");

        // On retourne une réponse simple avec le nom d'utilisateur trouvé dans le token.
        return ResponseEntity.ok("Tu es connecté en tant que : " + username);
    }
}
