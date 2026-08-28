<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Task; // 1. TAMBAHKAN IMPORT INI

class DeadlineNotification extends Notification
{
    use Queueable;

    // 2. TAMBAHKAN TIPE 'Task' DI SINI
    protected Task $task;

    // 3. TAMBAHKAN TIPE 'Task' PADA PARAMETER CONSTRUCTOR
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $isOverdue = \Carbon\Carbon::parse($this->task->deadline)->isPast();

        return [
            'task_id' => $this->task->id,
            'title' => $isOverdue ? '⚠️ Melewati Deadline!' : '⏰ Deadline Mendekat!',
            'message' => "Tugas '{$this->task->title}' " . ($isOverdue ? 'telah melewati batas waktu' : 'harus segera diselesaikan sebelum') . " tanggal {$this->task->deadline}."
        ];
    }
}
