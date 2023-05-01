<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectUpdateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskCommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth Routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Settings Routes
Route::post('/settings/newUser', [UserController::class, 'newUser']);
Route::get('/settings/getAllUsers', [UserController::class, 'getAllUsers']);
Route::delete("/settings/deleteUser/{id}", [UserController::class, 'deleteUser']);
Route::put("/settings/changePassword/{id}", [UserController::class, 'changePassword']);
Route::post('/settings/searchUsers', [UserController::class, 'searchUsers']);

// Projects  Routes
Route::post('/projects/newProject', [ProjectsController::class, 'newProject']);
Route::get('/projects/getAllProjects/{filter}/{order}/{id}', [ProjectsController::class, 'getAllProjects']);
Route::post('/projects/searchProjects', [ProjectsController::class, 'searchProjects']);
Route::get('/projects/getAllTeamMembers', [ProjectsController::class, 'getAllTeamMembers']);
Route::get('/projects/getProjectInfos/{projectid}', [ProjectsController::class, 'getProjectInfos']);
Route::delete('/projects/deleteProject/{projectid}', [ProjectsController::class, 'deleteProject']);

// Notifications Routes
Route::get('/notifications/getAllNotifications/{id}', [NotificationController::class, 'getAllNotifications']);

// Boards Routes
Route::get('/boards/getAllBoards/{id}', [BoardController::class, 'getAllBoards']);
Route::post('/boards/newBoard', [BoardController::class, 'newBoard']);
Route::put('/boards/renameBoard/{id}', [BoardController::class, 'renameBoard']);
Route::delete('/boards/deleteBoard/{id}/{projectid}/{userid}', [BoardController::class, 'deleteBoard']);
Route::get('/boards/getBoardInfos/{id}', [BoardController::class, 'getBoardInfos']);

// Project Updates Routes
Route::put('/boards/setProjectLastUpdates', [ProjectUpdateController::class, 'setProjectLastUpdates']);

// Tasks Routes
Route::get('/tasks/getAllTasks/{id}', [TaskController::class, 'getAllTasks']);

// Profile Routes
Route::get('/profile/getUserInfos/{userid}', [ProfileController::class, 'getUserInfos']);

// Project Routes
Route::get('/project/checkProjectMember/{userid}', [ProjectController::class, 'checkProjectMember']);
Route::get('/project/getProjectMembers/{projectid}', [ProjectController::class, 'getProjectMembers']);

// Task Routes
Route::post('/task/newTask', [TaskController::class, 'newTask']);
Route::get('/task/getAllTasks/{projectid}/{boardid}', [TaskController::class, 'getAllTasks']);
Route::put('/task/updateTaskData/{taskid}', [TaskController::class, 'updateTaskData']);
Route::delete('/task/deleteTask/{taskid}/{userid}', [TaskController::class, 'deleteTask']);
Route::get('/task/getTaskInfos/{taskid}', [TaskController::class, 'getTaskInfos']);
Route::put('/task/changeTaskInfos/{taskid}', [TaskController::class, 'changeTaskInfos']);

// Task Comment Routes
Route::get('/taskcomment/getTaskComments/{taskid}', [TaskCommentController::class, 'getTaskComments']);
Route::post('/taskcomment/newTaskComment', [TaskCommentController::class, 'newTaskComment']);
Route::delete('/taskcomment/deleteTaskComment/{commentid}/{userid}', [TaskCommentController::class, 'deleteTaskComment']);