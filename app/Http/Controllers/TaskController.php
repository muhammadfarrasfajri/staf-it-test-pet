<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $pic_id = $request->input('pic_id');
        $status = $request->input('status');
        $deadline = $request->input('deadline');

        $query = Task::with('pic')->when($search, function ($q, $search) {
            $q->where(function ($subQuery) use ($search) {
                $subQuery->where('title', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('priority', 'like', "%{$search}%");
            });
        })->when($pic_id, function ($q, $pic_id) {
            $q->where('pic_id', $pic_id);
        })->when($status, function ($q, $status) {
            $q->where('status', $status);
        })->when($deadline, function ($q, $deadline) {
            $q->whereDate('deadline', $deadline);
        });

        $tasks = $query->paginate(10)->withQueryString();

        // Ambil data karyawan untuk dimasukkan ke opsi dropdown filter PIC
        $employees = User::all();

        // ... (KODE STATISTIK BIARKAN SAMA SEPERTI SEBELUMNYA) ...
        $allTasks = Task::all();
        $totalTasks = $allTasks->count();
        $completedTasks = $allTasks->where('status', 'Selesai')->count();
        $processTasks = $allTasks->where('status', 'Proses')->count();
        $pendingTasks = $allTasks->where('status', 'Belum Mulai')->count();
        $priorityCounts = [
            'Tinggi' => $allTasks->where('priority', 'Tinggi')->count(),
            'Sedang' => $allTasks->where('priority', 'Sedang')->count(),
            'Rendah' => $allTasks->where('priority', 'Rendah')->count(),
        ];
        $oneWeekAhead = now()->addDays(7);
        $urgentDeadlineCount = $allTasks->filter(function ($task) use ($oneWeekAhead) {
            return $task->status !== 'Selesai' && \Carbon\Carbon::parse($task->deadline)->between(now(), $oneWeekAhead);
        })->count();

        return Inertia::render('Task/Index', [
            'tasks' => $tasks,
            'employees' => $employees, // Kirim ke React
            'stats' => [
                'total' => $totalTasks,
                'completed' => $completedTasks,
                'process' => $processTasks,
                'pending' => $pendingTasks,
                'priorities' => $priorityCounts,
                'urgentDeadline' => $urgentDeadlineCount,
            ],
            'filters' => $request->only('search', 'pic_id', 'status', 'deadline')
        ]);
    }

    public function create()
    {
        // Mengambil semua data karyawan untuk dijadikan opsi di Dropdown PIC
        $employees = User::all();

        return Inertia::render('Task/Create', [
            'employees' => $employees
        ]);
    }

    // Memproses penyimpanan data
    public function store(Request $request)
    {
        $request->validate([
            'title'    => 'required|string|max:255',
            'pic_id'   => 'required|exists:users,id',
            'deadline' => 'required|date',
            'status'   => 'required|in:Belum Mulai,Proses,Selesai',
            'priority' => 'required|in:Rendah,Sedang,Tinggi',
        ]);

        Task::create([
            'title'    => $request->title,
            'pic_id'   => $request->pic_id,
            'deadline' => $request->deadline,
            'status'   => $request->status,
            'priority' => $request->priority,
        ]);

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Tambah',
            'module' => 'Pekerjaan',
            'description' => 'Menambahkan pekerjaan baru: ' . $request->title
        ]);


        return redirect()->route('tasks.index')->with('message', 'Pekerjaan berhasil ditambahkan!');
    }

    // Menampilkan form edit pekerjaan
    public function edit(Task $task)
    {
        $employees = User::all();
        return Inertia::render('Task/Edit', [
            'task' => $task,
            'employees' => $employees
        ]);
    }

    // Memproses pembaruan data
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title'    => 'required|string|max:255',
            'pic_id'   => 'required|exists:users,id',
            'deadline' => 'required|date',
            'status'   => 'required|in:Belum Mulai,Proses,Selesai',
            'priority' => 'required|in:Rendah,Sedang,Tinggi',
        ]);

        $task->update([
            'title'    => $request->title,
            'pic_id'   => $request->pic_id,
            'deadline' => $request->deadline,
            'status'   => $request->status,
            'priority' => $request->priority,
        ]);

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Edit',
            'module' => 'Pekerjaan',
            'description' => 'Memperbarui pekerjaan: ' . $request->title
        ]);

        return redirect()->route('tasks.index')->with('message', 'Pekerjaan berhasil diperbarui!');
    }

    // Menghapus data pekerjaan
    public function destroy(Task $task)
    {
        $task->delete();

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Hapus',
            'module' => 'Pekerjaan',
            'description' => 'Menghapus pekerjaan: ' . $task->title
        ]);
        
        return redirect()->route('tasks.index')->with('message', 'Pekerjaan berhasil dihapus!');
    }

    public function export()
    {
        $tasks = Task::with('pic')->get();
        $filename = "Laporan_Pekerjaan_" . date('Y-m-d') . ".csv";

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Judul Pekerjaan', 'Penanggung Jawab (PIC)', 'Deadline', 'Status', 'Prioritas'];

        $callback = function () use ($tasks, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($tasks as $task) {
                fputcsv($file, [
                    $task->title,
                    $task->pic ? $task->pic->name : 'Tidak ada PIC',
                    $task->deadline,
                    $task->status,
                    $task->priority
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
