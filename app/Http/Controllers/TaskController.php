<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Task/index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'successMsg' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name','asc')->get();
        $users = User::query()->orderBy('name','asc')->get();

        return inertia('Task/create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $data['project_id'] = (int)$data['project_id'];
        $data['assigned_user_id'] = (int)$data['assigned_user_id'];
        $image = $data['img'] ?? null;

        if ($image) {
            $data['image_path'] = $image->store('task', 'public');
        }

        Task::create($data);

        return to_route('task.index')->with('success', 'Task was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/show', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::query()->orderBy('name','asc')->get();
        $projects = Project::query()->orderBy('name','asc')->get();

        return inertia('Task/edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if($data['img']) {
            if($task->image_path) {
                Storage::disk('public')->delete($task->image_path);
            }
            $data['image_path'] = $data['img']->store('task', 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', 'Task "' . $task->name . '" was updated!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if($task->image_path) {
            Storage::disk('public')->delete($task->image_path);
        }

        $task->delete();
    }

    public function myTasks()
    {
        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('name','like','%'. request('name') .'%');
        }

        if(request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Task/index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'successMsg' => session('success')
        ]);
    }
}
