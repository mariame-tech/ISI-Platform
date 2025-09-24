# On part de l'image officielle de Keycloak comme base
FROM quay.io/keycloak/keycloak:25.0.2

# On copie notre dossier de thème local DANS l'image, au bon endroit
COPY ./mon-theme-keycloak /opt/keycloak/themes/mon-theme-keycloak

# On force la reconstruction des optimisations du serveur pour qu'il découvre notre thème
RUN /opt/keycloak/bin/kc.sh build