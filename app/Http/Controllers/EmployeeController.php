<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $department = $request->input('department');

        $query = User::when($search, function ($q, $search) {
            // Dikelompokkan agar OR tidak merusak filter lain
            $q->where(function ($subQuery) use ($search) {
                $subQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('department', 'like', "%{$search}%")
                    ->orWhere('employee_id', 'like', "%{$search}%");
            });
        })->when($status, function ($q, $status) {
            $q->where('status', $status);
        })->when($department, function ($q, $department) {
            $q->where('department', $department);
        });

        $employees = $query->paginate(10)->withQueryString();

        $allEmployees = User::all();
        $totalEmployees = $allEmployees->count();
        $activeEmployees = $allEmployees->where('status', 'Aktif')->count();
        $inactiveEmployees = $allEmployees->where('status', '!=', 'Aktif')->count();
        $actdepartmentCounts = $allEmployees->where('status', 'Aktif')->groupBy('department')->map->count();
        $inactdepartmentCounts = $allEmployees->where('status', '!=', 'Aktif')->groupBy('department')->map->count();

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'stats' => [
                'total' => $totalEmployees,
                'active' => $activeEmployees,
                'inactive' => $inactiveEmployees,
                'actdepartments' => $actdepartmentCounts,
                'inactdepartments' => $inactdepartmentCounts,
            ],
            // Kirim kembali nilai filter ke React
            'filters' => $request->only('search', 'status', 'department')
        ]);
    }


    public function create()
    {
        return Inertia::render('Employee/Create');
    }

    // Memproses data yang dikirim dari form
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string|unique:users,employee_id',
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email',
            'department'  => 'required|string|max:255',
            'position'    => 'required|string|max:255',
            'status'      => 'required|string',
        ]);

        User::create([
            'employee_id' => $request->employee_id,
            'name'        => $request->name,
            'email'       => $request->email,
            'department'  => $request->department,
            'position'    => $request->position,
            'status'      => $request->status,
            'password'    => Hash::make('password123'), // Password default agar bisa login
        ]);

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Tambah',
            'module' => 'Karyawan',
            'description' => 'Menambahkan karyawan baru: ' . $request->name . ' (Departemen: ' . $request->department . ')'
        ]);

        // Kembali ke dashboard setelah berhasil disimpan
        return redirect()->route('employees.index')->with('message', 'Karyawan baru berhasil ditambahkan!');
    }

    // Menampilkan form edit karyawan
    public function edit(User $employee)
    {
        return Inertia::render('Employee/Edit', [
            'employee' => $employee
        ]);
    }

    // Memproses pembaruan data karyawan
    public function update(Request $request, User $employee)
    {
        $request->validate([
            // Pengecualian unique ID dan Email untuk user yang sedang diedit
            'employee_id' => 'required|string|unique:users,employee_id,' . $employee->id,
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email,' . $employee->id,
            'department'  => 'required|string|max:255',
            'position'    => 'required|string|max:255',
            'status'      => 'required|string',
        ]);

        $employee->update([
            'employee_id' => $request->employee_id,
            'name'        => $request->name,
            'email'       => $request->email,
            'department'  => $request->department,
            'position'    => $request->position,
            'status'      => $request->status,
        ]);

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Edit',
            'module' => 'Karyawan',
            'description' => 'Memperbarui karyawan: ' . $request->name . ' (Departemen: ' . $request->department . ')'
        ]);

        return redirect()->route('employees.index')->with('message', 'Data Karyawan berhasil diperbarui!');
    }

    // Menghapus data karyawan
    public function destroy(User $employee)
    {
        $employee->delete();
        ActivityLog::create([
            'user_id' => Auth::id(),
            'action' => 'Hapus',
            'module' => 'Karyawan',
            'description' => 'Menghapus karyawan: ' . $employee->name . ' (Departemen: ' . $employee->department . ')'
        ]);
        return redirect()->route('employees.index')->with('message', 'Karyawan berhasil dihapus!');
    }

    public function export()
    {
        $employees = User::all();
        $filename = "Laporan_Karyawan_" . date('Y-m-d') . ".csv";

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID Karyawan', 'Nama', 'Email', 'Departemen', 'Jabatan', 'Status'];

        $callback = function () use ($employees, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns); // Tulis Header Tabel

            foreach ($employees as $emp) {
                fputcsv($file, [
                    $emp->employee_id,
                    $emp->name,
                    $emp->email,
                    $emp->department,
                    $emp->position,
                    $emp->status
                ]); // Tulis isi datanya
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
