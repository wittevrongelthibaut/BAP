<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name'
    ];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class);
    }
}
