<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $casts = [
        'ingredients' => 'array',
        'instructions' => 'array',
    ];

    public function menus()
    {
        return $this->belongsToMany(Menu::class);
    }
}
