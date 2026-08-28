<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Data Karyawan (Project 1)
        $karyawan = [
            ['employee_id' => '001', 'name' => 'Andi Saputra', 'department' => 'Finance', 'position' => 'Staff Finance', 'email' => 'andi@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '002', 'name' => 'Budi Santoso', 'department' => 'IT', 'position' => 'Programmer Junior', 'email' => 'budi@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '003', 'name' => 'Citra Lestari', 'department' => 'HR', 'position' => 'HR Administrator', 'email' => 'citra@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '004', 'name' => 'Dewi Anggraini', 'department' => 'Environment', 'position' => 'Environmental Staff', 'email' => 'dewi@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '005', 'name' => 'Eko Pratama', 'department' => 'Operation', 'position' => 'Operational Staff', 'email' => 'eko@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '006', 'name' => 'Hendra Wijaya', 'department' => 'IT', 'position' => 'Database Administrator', 'email' => 'hendra@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '007', 'name' => 'Lukman Hakim', 'department' => 'IT', 'position' => 'System Analyst', 'email' => 'lukman@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '008', 'name' => 'Maya Putri', 'department' => 'HR', 'position' => 'HR Supervisor', 'email' => 'maya@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '009', 'name' => 'Taufik Hidayat', 'department' => 'Environment', 'position' => 'Environmental Analyst', 'email' => 'taufik@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '010', 'name' => 'Rizky Maulana', 'department' => 'IT', 'position' => 'Web Developer', 'email' => 'rizky@properindoenviro.co.id', 'status' => 'Aktif'],
            // Tambahan PIC yang ada di Project 2 namun tidak ada di Project 1
            ['employee_id' => '011', 'name' => 'Sari Wulandari', 'department' => 'HR', 'position' => 'HR Staff', 'email' => 'sari@properindoenviro.co.id', 'status' => 'Aktif'],
            ['employee_id' => '012', 'name' => 'Karin Amelia', 'department' => 'Finance', 'position' => 'Finance Staff', 'email' => 'karin@properindoenviro.co.id', 'status' => 'Aktif'],
        ];

        // Memasukkan data ke tabel users
        foreach ($karyawan as $data) {
            User::create([
                'employee_id' => $data['employee_id'],
                'name'        => $data['name'],
                'department'  => $data['department'],
                'position'    => $data['position'],
                'email'       => $data['email'],
                'status'      => $data['status'],
                'password'    => Hash::make('password123'), // Default password untuk login
            ]);
        }

        // 2. Data Pekerjaan (Project 2)
        $pekerjaan = [
            ['title' => 'Pembuatan laporan PROPER Tahunan', 'pic_name' => 'Andi Saputra', 'deadline' => '2026-09-30', 'status' => 'Proses', 'priority' => 'Tinggi'],
            ['title' => 'Update database perusahaan', 'pic_name' => 'Budi Santoso', 'deadline' => '2026-09-25', 'status' => 'Belum Mulai', 'priority' => 'Sedang'],
            ['title' => 'Review dokumen lingkungan', 'pic_name' => 'Dewi Anggraini', 'deadline' => '2026-09-28', 'status' => 'Selesai', 'priority' => 'Sedang'],
            ['title' => 'Pembuatan invoice proyek', 'pic_name' => 'Citra Lestari', 'deadline' => '2026-09-27', 'status' => 'Proses', 'priority' => 'Tinggi'],
            ['title' => 'Backup database server', 'pic_name' => 'Hendra Wijaya', 'deadline' => '2026-09-26', 'status' => 'Selesai', 'priority' => 'Tinggi'],
            ['title' => 'Pembuatan dashboard monitoring', 'pic_name' => 'Lukman Hakim', 'deadline' => '2026-10-05', 'status' => 'Proses', 'priority' => 'Tinggi'],
            ['title' => 'Rekap absensi karyawan', 'pic_name' => 'Sari Wulandari', 'deadline' => '2026-10-01', 'status' => 'Belum Mulai', 'priority' => 'Rendah'],
            ['title' => 'Audit dokumen internal', 'pic_name' => 'Maya Putri', 'deadline' => '2026-10-10', 'status' => 'Belum Mulai', 'priority' => 'Sedang'],
            ['title' => 'Pembuatan laporan keuangan', 'pic_name' => 'Karin Amelia', 'deadline' => '2026-10-15', 'status' => 'Proses', 'priority' => 'Tinggi'],
            ['title' => 'Perbaikan sistem aplikasi', 'pic_name' => 'Rizky Maulana', 'deadline' => '2026-10-12', 'status' => 'Proses', 'priority' => 'Tinggi'],
        ];

        // Memasukkan data ke tabel tasks beserta relasi foreign key
        foreach ($pekerjaan as $data) {
            $user = User::where('name', $data['pic_name'])->first();

            if ($user) {
                Task::create([
                    'title'    => $data['title'],
                    'pic_id'   => $user->id,
                    'deadline' => $data['deadline'],
                    'status'   => $data['status'],
                    'priority' => $data['priority'],
                ]);
            }
        }
    }
}
