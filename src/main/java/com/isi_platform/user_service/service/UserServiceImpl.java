package com.isi_platform.user_service.service;

import com.isi_platform.user_service.dto.UserRegistrationRequest;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserServiceImpl implements UserService {
    private final Keycloak keycloak;
    private final String targetRealm; // NOUVEAU: Champ pour stocker le nom du realm cible

    // MODIFIÉ: Le constructeur injecte maintenant le nom du realm depuis application.yml
    public UserServiceImpl(Keycloak keycloak, @Value("${keycloak.admin-client.target-realm}") String targetRealm) {
        this.keycloak = keycloak;
        this.targetRealm = targetRealm;
    }

    @Override
    public void registerNewUser(UserRegistrationRequest registrationRequest) {
        // (1) Préparer la représentation de l'utilisateur pour Keycloak
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(registrationRequest.username());
        user.setEmail(registrationRequest.email());
        user.setFirstName(registrationRequest.prenom());
        user.setLastName(registrationRequest.nom());
        user.singleAttribute("telephone", registrationRequest.telephone());
        user.setEmailVerified(true);

        // (2) Préparer le mot de passe
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(registrationRequest.password());
        user.setCredentials(Collections.singletonList(credential));

        // (3) Obtenir la ressource du royaume et créer l'utilisateur
        // MODIFIÉ: Utilise la variable 'targetRealm' au lieu d'un texte en dur
        RealmResource realmResource = keycloak.realm(targetRealm);
        UsersResource usersResource = realmResource.users();

        // (4) Envoyer la requête de création à Keycloak
        Response response = usersResource.create(user);

        // (5) Vérifier le statut de la réponse (201 pour succès)
        if (response.getStatus() != 201) {
            // Gérer l'erreur : l'utilisateur existe peut-être déjà ou les données sont invalides
            // Vous pouvez lancer une exception personnalisée ici.
            String errorMessage = "Échec de la création de l'utilisateur dans Keycloak. Statut: " + response.getStatus();
            if (response.hasEntity()) {
                errorMessage += ", Raison: " + response.readEntity(String.class);
            }
            response.close(); // Important: Toujours fermer la réponse pour libérer les ressources
            throw new RuntimeException(errorMessage);
        }
        response.close(); // Fermer aussi en cas de succès

        // (6) Récupérer l'ID de l'utilisateur créé pour lui assigner un rôle
        String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        System.out.println("Utilisateur créé avec l'ID : " + userId);

        // (7) Assigner le rôle à l'utilisateur
        String roleName = registrationRequest.role().toUpperCase(); // "RECRUTEUR" ou "DIPLOME"
        RoleRepresentation roleRepresentation = realmResource.roles().get(roleName).toRepresentation();
        usersResource.get(userId).roles().realmLevel().add(Collections.singletonList(roleRepresentation));

        System.out.println("Rôle '" + roleName + "' assigné à l'utilisateur " + registrationRequest.username());
    }
}