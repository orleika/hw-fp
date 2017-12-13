<?php

namespace App\Models;

class HwInfo extends Model {
    protected $table = 'hw_info';

    protected $fillable = [
        'name',
        'smbios',
        //'lspci',    // Require elevated command prompt
        'version',
    ];
}
