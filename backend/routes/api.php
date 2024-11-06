<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route pour récupérer les informations de l'utilisateur connecté
// Protégée par le middleware 'auth:sanctum' pour s'assurer que l'utilisateur est authentifié
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Routes publiques pour l'authentification
// Enregistrement d'un nouvel utilisateur
Route::post('register', [AuthController::class, 'register']);

// Connexion d'un utilisateur existant
Route::post('login', [AuthController::class, 'login']);

// Déconnexion de l'utilisateur connecté, protégée par le middleware 'auth:sanctum'
// Cette route révoque tous les tokens de l'utilisateur connecté
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Groupe de routes protégées par 'auth:sanctum' pour les tâches
// Seul un utilisateur authentifié peut accéder à ces routes
Route::middleware('auth:sanctum')->group(function () {

    // Récupérer toutes les tâches de l'utilisateur connecté
    Route::get('tasks', [TaskController::class, 'index']);

    // Créer une nouvelle tâche pour l'utilisateur connecté
    Route::post('tasks', [TaskController::class, 'store']);

    // Afficher les détails d'une tâche spécifique
    // L'utilisateur ne peut accéder qu'aux tâches qu'il possède
    Route::get('tasks/{task}', [TaskController::class, 'show']);

    // Mettre à jour une tâche spécifique
    // L'utilisateur doit être propriétaire de la tâche pour pouvoir la modifier
    Route::put('tasks/{task}', [TaskController::class, 'update']);

    // Supprimer une tâche spécifique
    // L'utilisateur doit être propriétaire de la tâche pour pouvoir la supprimer
    Route::delete('tasks/{task}', [TaskController::class, 'destroy']);
});
