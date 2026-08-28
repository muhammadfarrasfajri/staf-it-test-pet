<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            // Menyimpan siapa yang melakukan aksi
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('action'); // Tambah, Edit, Hapus
            $table->string('module'); // Karyawan, Pekerjaan
            $table->text('description'); // Detail deskripsi
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
