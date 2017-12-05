<?php

namespace App\Models;

class HwFp extends Model {
    protected $table = 'hw_fp';

    protected $fillable = [
        'userAgent',
        'worker',
        'memory',
        'crypto',
        'math',
        'version',
        'hwInfoId',
    ];
}
