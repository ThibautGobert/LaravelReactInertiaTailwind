<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Wildside\Userstamps\Userstamps;

class Image extends Model
{
    use HasFactory, SoftDeletes, Userstamps;

    protected $fillable = ['model_class', 'model_id', 'path', 'filename', 'size', 'created_by', 'updated_by'];
}
