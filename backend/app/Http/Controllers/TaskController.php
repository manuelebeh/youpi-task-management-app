<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    // Liste toutes les tâches de l'utilisateur authentifié
    public function index(): JsonResponse
    {
        // Récupère les tâches de l'utilisateur actuellement authentifié
        $tasks = auth()->user()->tasks;

        // Retourne les tâches au format JSON
        return response()->json($tasks);
    }

    // Crée une nouvelle tâche pour l'utilisateur authentifié
    public function store(TaskRequest $request): JsonResponse
    {
        // Utilise les données validées de TaskRequest pour créer une nouvelle tâche
        $task = auth()->user()->tasks()->create($request->validated());

        // Retourne la tâche nouvellement créée avec un code de statut 201 (créé)
        return response()->json($task, 201);
    }

    // Affiche une tâche spécifique si elle appartient à l'utilisateur authentifié
    public function show(Task $task): JsonResponse
    {
        // Vérifie si l'utilisateur est propriétaire de la tâche
        if ($task->user_id !== auth()->id()) {
            // Retourne une erreur si l'utilisateur n'est pas autorisé
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Retourne la tâche si elle appartient à l'utilisateur
        return response()->json($task);
    }

    // Met à jour une tâche existante si elle appartient à l'utilisateur authentifié
    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        // Vérifie si l'utilisateur est propriétaire de la tâche
        if ($task->user_id !== auth()->id()) {
            // Retourne une erreur si l'utilisateur n'est pas autorisé
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Met à jour la tâche avec les données validées de TaskRequest
        $task->update($request->validated());

        // Retourne la tâche mise à jour
        return response()->json($task);
    }

    // Supprime une tâche spécifique si elle appartient à l'utilisateur authentifié
    public function destroy(Task $task): JsonResponse
    {
        // Vérifie si l'utilisateur est propriétaire de la tâche
        if ($task->user_id !== auth()->id()) {
            // Retourne une erreur si l'utilisateur n'est pas autorisé
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Supprime la tâche
        $task->delete();

        // Retourne un message confirmant la suppression de la tâche
        return response()->json(['message' => 'Task deleted']);
    }
}
