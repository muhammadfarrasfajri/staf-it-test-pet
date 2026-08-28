<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ActivityLogController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Dashboard Utama
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
// Dashboard Karyawan
Route::get('/employees', [EmployeeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('employees.index');
// Dashboard Pekerjaan
Route::get('/tasks', [TaskController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.index');

// Pengelolaan Karyawan
Route::get('/employees/create', [EmployeeController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('employees.create');
Route::post('/employees', [EmployeeController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('employees.store');
Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('employees.edit');
Route::put('/employees/{employee}', [EmployeeController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('employees.update');
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('employees.destroy');
//Export Laporan karyawan
Route::get('/employees-export', [EmployeeController::class, 'export'])
    ->middleware(['auth', 'verified'])
    ->name('employees.export');


//Pengelolaan Pekerjaan
Route::get('/tasks/create', [TaskController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.create');
Route::post('/tasks', [TaskController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.store');
Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.edit');
Route::put('/tasks/{task}', [TaskController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.destroy');
//Export Laporan Pekerjaan
Route::get('/tasks-export', [TaskController::class, 'export'])
    ->middleware(['auth', 'verified'])
    ->name('tasks.export');

// Log Activity
Route::get('/activity-logs', [ActivityLogController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('logs.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__ . '/auth.php';
