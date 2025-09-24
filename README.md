# Plateforme ISI - Service Utilisateur & Portail Front-end

Ce projet contient le back-end (`user-service`) et un front-end de démonstration pour la gestion des utilisateurs (Diplômés, Recruteurs, Admins) de la plateforme ISI.

## Architecture

Le système est composé de 3 services principaux :
1.  **Keycloak (Serveur d'Authentification) :** Tourne sur `http://localhost:8180`. Gère les identités, les rôles et délivre les tokens JWT.
2.  **User Service (Back-end Java/Spring Boot) :** Tourne sur `http://localhost:8083`. Fournit une API REST pour interagir avec Keycloak (ex: créer des utilisateurs).
3.  **Frontend App (Front-end React) :** Tourne sur `http://localhost:3000`. L'interface utilisateur pour l'inscription, la connexion et les dashboards.

## Prérequis

- **Java 17** (JDK)
- **Node.js** (v18 ou supérieure)
- **Docker** & **Docker Compose**

## Guide d'Installation Complet

Suivez ces étapes dans l'ordre pour lancer l'environnement complet.

### 1. Cloner le Projet
Clonez ce dépôt sur votre machine. Toutes les commandes suivantes sont à exécuter depuis la racine du projet `ISI-Platform`.

### 2. Lancer Keycloak
Nous utilisons Docker Compose pour lancer Keycloak avec une configuration personnalisée.

1.  **Créez les dossiers nécessaires** (s'ils n'existent pas) à la racine du projet :
    ```bash
    mkdir mon-theme-keycloak
    mkdir keycloak-data
    ```
2.  **Assurez-vous que les fichiers de thème** et le `Dockerfile` sont présents (ils devraient être dans le commit).
3.  **Lancez Docker Compose :**
    ```bash
    docker compose up -d --build
    ```
    La première fois, cela construira l'image personnalisée, ce qui peut prendre quelques minutes.

### 3. Configurer Keycloak
Connectez-vous à la console d'administration sur `http://localhost:8180` (`admin`/`admin`).
- **Créer le Realm :** Nom `ISI-Platform`.
- **Créer les Clients :**
    - `user-service` (pour le back-end) : `Client authentication: ON`, `Service accounts roles: ON`.
    - `frontend-app` (pour le front-end) : `Client authentication: OFF`, `Standard flow: ON`, `Valid Redirect URIs: http://localhost:3000/*`, `Web origins: http://localhost:3000`.
- **Configurer les Rôles :**
    - Dans `Realm Roles`, créez les rôles : `DIPLOME`, `RECRUTEUR`, `admin`.
    - Pour le client `user-service`, dans l'onglet `Service Account roles`, assignez le rôle `manage-users` du client `realm-management`.

### 4. Lancer le Back-end (User Service)
1.  Ouvrez le projet `ISI-Platform` dans IntelliJ.
2.  Allez dans `Run` > `Edit Configurations...`.
3.  Dans `Environment variables`, ajoutez :
    - `KEYCLOAK_ADMIN_USER` = `admin`
    - `KEYCLOAK_ADMIN_PASSWORD` = `admin`
4.  Cliquez sur le bouton "Play" (▶️) pour lancer le service.

### 5. Lancer le Front-end (React App)
1.  Ouvrez un nouveau terminal et naviguez dans le dossier du front-end :
    ```bash
    cd frontend-app
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Lancez le serveur de développement :
    ```bash
    npm start
    ```

Votre application est maintenant accessible sur `http://localhost:3000`. Vous pouvez vous inscrire, vous connecter et tester les redirections par rôle.