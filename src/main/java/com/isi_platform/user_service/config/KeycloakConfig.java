package com.isi_platform.user_service.config;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/*@Configuration
public class KeycloakConfig {

    @Value("${keycloak.admin-client.server-url}")
    private String serverUrl;

    @Value("${keycloak.admin-client.realm}")
    private String realm;

    @Value("${keycloak.admin-client.client-id}")
    private String clientId;

    @Value("${keycloak.admin-client.client-secret}")
    private String clientSecret;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType("client_credentials") // Authentification de machine à machine
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
    }
}*/

@Configuration
public class KeycloakConfig {

    @Value("${keycloak.admin-client.server-url}")
    private String serverUrl;

    @Value("${keycloak.admin-client.admin-realm}")
    private String adminRealm;

    @Value("${keycloak.admin-client.admin-client-id}")
    private String adminClientId;

    @Value("${keycloak.admin-client.admin-username}")
    private String adminUsername;

    @Value("${keycloak.admin-client.admin-password}")
    private String adminPassword;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(adminRealm)
                .grantType(OAuth2Constants.PASSWORD)
                .clientId(adminClientId)
                .username(adminUsername)
                .password(adminPassword)
                .build();
    }
}
