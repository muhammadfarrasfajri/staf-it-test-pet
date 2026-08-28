<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            // Nama pekerjaan
            $table->string('title');

            // Relasi ke tabel users (Karyawan sebagai PIC)
            $table->foreignId('pic_id')->constrained('users')->onDelete('cascade');

            // Deadline pekerjaan
            $table->date('deadline');

            // Status pekerjaan dengan opsi spesifik
            $table->enum('status', ['Belum Mulai', 'Proses', 'Selesai'])->default('Belum Mulai');

            // Prioritas pekerjaan dengan opsi spesifik
            $table->enum('priority', ['Rendah', 'Sedang', 'Tinggi'])->default('Sedang');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
