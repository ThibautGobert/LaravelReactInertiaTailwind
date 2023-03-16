<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::post('message/get-last-messages', [\App\Http\Controllers\Shared\MessageController::class, 'getLastMessages']);
    Route::post('message/send', [\App\Http\Controllers\Shared\MessageController::class, 'send']);
});


