<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'pic_id', 'deadline', 'status', 'priority'];

    // Relasi Inverse: 1 Pekerjaan dimiliki oleh 1 Karyawan (PIC)
    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
