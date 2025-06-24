<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->tasks()->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task' => 'required|string|max:255',
            'completed' => 'boolean',
        ]);

        $task = $request->user()->tasks()->create([
            'task' => $validated['task'],
            'completed' => $validated['completed'] ?? false,
        ]);

        return response()->json($task);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->update([
            'task' => $request->task,
            'completed' => $request->completed,
        ]);

        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();
        return response()->noContent();
    }
}
