<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Statistik Karyawan
        $totalEmployees = User::count();
        $activeEmployees = User::where('status', 'Aktif')->count();

        // 2. Statistik Pekerjaan
        $totalTasks = Task::count();
        $completedTasks = Task::where('status', 'Selesai')->count();
        $processTasks = Task::where('status', 'Proses')->count();

        // 3. Pekerjaan Prioritas Tinggi yang belum selesai
        $urgentTasks = Task::with('pic')
            ->where('priority', 'Tinggi')
            ->where('status', '!=', 'Selesai')
            ->orderBy('deadline', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'employees' => $totalEmployees,
                'activeEmployees' => $activeEmployees,
                'tasks' => $totalTasks,
                'completedTasks' => $completedTasks,
                'processTasks' => $processTasks,
            ],
            'urgentTasks' => $urgentTasks
        ]);
    }
}
