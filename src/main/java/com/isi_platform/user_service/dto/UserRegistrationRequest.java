package com.isi_platform.user_service.dto;

public record UserRegistrationRequest(
        String username,
        String email,
        String telephone,
        String password,
        String nom,
        String prenom,
        String role // Ce champ contiendra "RECRUTEUR" ou "DIPLOME"
) {}