<?php

namespace App\Models;

class HwFp extends Model {
    protected $table = 'hw_fp';

    protected $fillable = [
        'userAgent',
        'math',
        'worker',
        'aes',
        'endian',
        'memory',
        'gpu',
        'gpgpu',
        'version',
        'hwInfoId',
    ];
}
