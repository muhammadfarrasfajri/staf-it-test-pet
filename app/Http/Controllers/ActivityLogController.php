<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        // Mengambil log terbaru beserta nama pelakunya
        $logs = ActivityLog::with('user')->latest()->paginate(15);

        return Inertia::render('LogsActivity/Index', [
            'logs' => $logs
        ]);
    }
}
