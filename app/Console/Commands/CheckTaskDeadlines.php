<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:check-task-deadlines')]
#[Description('Command description')]
class CheckTaskDeadlines extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
