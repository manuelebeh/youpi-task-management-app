<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Fonction d'enregistrement d'un nouvel utilisateur
    // Utilise la classe RegisterRequest pour valider les données entrantes
    public function register(RegisterRequest $request): JsonResponse
    {
        // Création d'un nouvel utilisateur avec les données validées
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash du mot de passe pour des raisons de sécurité
        ]);

        // Génération d'un token d'authentification pour l'utilisateur nouvellement créé
        $token = $user->createToken('TaskManagerApp')->plainTextToken;

        // Retourne une réponse JSON contenant le token et un code de statut 201 (créé)
        return response()->json(['token' => $token], 201);
    }

    // Fonction de connexion d'un utilisateur existant
    // Utilise la classe LoginRequest pour valider les informations d'identification
    public function login(LoginRequest $request): JsonResponse
    {
        // Recherche de l'utilisateur dans la base de données par email
        $user = User::where('email', $request->email)->first();

        // Vérifie si l'utilisateur existe et que le mot de passe est correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            // Lève une exception si les informations d'identification sont incorrectes
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification sont incorrectes.'],
            ]);
        }

        // Génération d'un token d'authentification pour l'utilisateur
        $token = $user->createToken('TaskManagerApp')->plainTextToken;

        // Retourne une réponse JSON contenant le token
        return response()->json(['token' => $token]);
    }

    // Fonction de déconnexion d'un utilisateur
    // Requiert que l'utilisateur soit authentifié
    public function logout(Request $request): JsonResponse
    {
        // Supprime tous les tokens de l'utilisateur actuel, ce qui révoque toutes les sessions actives
        $request->user()->tokens()->delete();

        // Retourne une réponse JSON indiquant le succès de la déconnexion
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
