<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;
use App\Notifications\DeadlineNotification;
use Carbon\Carbon;

class CheckDeadline extends Command
{
    protected $signature = 'app:check-deadline';
    protected $description = 'Cek deadline pekerjaan dan kirim notifikasi ke PIC';

    public function handle()
    {
        // Cari tugas yang BELUM SELESAI dan deadline-nya kurang dari 7 hari ke depan (termasuk yang sudah lewat)
        $tasks = Task::with('pic')
            ->where('status', '!=', 'Selesai')
            ->whereDate('deadline', '<=', Carbon::now()->addDays(7))
            ->get();

        foreach ($tasks as $task) {
            // Jika ada PIC-nya, kirim notifikasi ke user tersebut
            if ($task->pic) {
                $task->pic->notify(new DeadlineNotification($task));
            }
        }

        $this->info("Pengecekan deadline selesai. Total: {$tasks->count()} tugas dikirim notifikasi.");
    }
}
