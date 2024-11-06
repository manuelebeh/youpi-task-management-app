# Projet de gestion de tâches avec React et Laravel - YOUPI SARL

## Description

Ce projet est une application de gestion de tâches qui permet aux utilisateurs de créer, modifier, supprimer et afficher leurs tâches. L'application utilise React.js pour le frontend et Laravel pour le backend. Les utilisateurs peuvent se connecter grace a l'authentification avec Sanctum. Ce qui permet de sécuriser leurs interactions avec l'API.

## Fonctionnalités principales

- Gestions des utilisateurs : Inscription, connexion
- Gestion des taches : Afficher, ajouter, modifier et supprimer les taches spécifique à un utilisateur

## Technologies utilisées

- **Laravel** : Framework principal.
- **Sanctum** : Pour l'authentification
- **Bootstrap** : Pour la mise en page réactive.
- **MySQL** : Base de données relationnelle.
- **React.js** (requis) : Librairie principale - Pour la partie Frontend

## Structure du projet

Le projet suit la structure **MVC** classique de Laravel. Voici les principaux dossiers et fichiers :

- `app/Http/Controllers/` : Contient les contrôleurs qui gèrent les requêtes.
- `app/Models/` : Contient les modèles liés aux tables de la base de données.
- `routes/api.php` : Fichier de route principal.

Le projet React suit une structure plus modulaire qui permet une bonne flexibilité et une meilleure scalabilité. Voici les principaux dossiers et fichiers :

- `src/assets/` : Contient toutes les images utilisées.
- `src/features/` : Contient les différentes fonctionnalité de l'application. A l'intérieur, nous retrouvons pages, components... qui sont relatif a la fonctionnalité.
- `src/shared/` : Contient toutes les différentes ressources partagées dans l'application (hooks, config...).

## Prérequis

Pour installer et exécuter ce projet en local, vous aurez besoin de :

- **PHP 8.2** ou supérieur.
- **Composer** pour la gestion des dépendances PHP.
- **MySQL** pour la base de données.
- **Node.js** : Pour lancer react.

## Installation

1. Clonez ce repository :

   ```bash
   git clone https://github.com/manuelebeh/youpi-task-management-app
   ```

2. Installez les dépendances PHP via Composer :

   ```bash
   cd backend/
   composer install
   ```

3. Créez un fichier `.env` en copiant l'exemple fourni :

   ```bash
   cp .env.example .env
   ```

4. Configurez les informations de base de données dans le fichier `.env`.

5. Générez une clé d’application Laravel :

   ```bash
   php artisan key:generate
   ```

6. Effectuez les migrations pour créer les tables de la base de données :
   ```bash
   php artisan migrate
   ```
7. Lancer la partie backend

   ```bash
   php artisan serve
   ```

8. Installez les dépendances npm pour le frontend :
   A la racine du projet :
   `bash
    cd client/
    npm install
    `
9. Lancer la partie frontend
   ```bash
   npm run dev
   ```
