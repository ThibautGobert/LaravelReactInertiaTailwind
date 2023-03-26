<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\NotificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('inertia')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware(['auth'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('user', [UserController::class, 'index'])->name('user.index');
            Route::post('user', [UserController::class, 'store'])->name('user.store');
            Route::get('user/create', [UserController::class, 'create'])->name('user.create');
            Route::get('user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
            Route::post('user/{user}/update', [UserController::class, 'update'])->name('user.update');
            Route::post('user/{user}/delete', [UserController::class, 'destroy'])->name('user.delete');
            Route::post('user/{user}/upload-temp-image', [UserController::class, 'uploadTempImage'])->name('user.uploadTempImage');
            Route::post('user/{user}/crop-image', [UserController::class, 'cropImage'])->name('user.crop-image');

            Route::get('role', [RoleController::class, 'index'])->name('role.index');
            Route::get('role/{role}/edit', [RoleController::class, 'edit'])->name('role.edit');
            Route::post('role/{role}/update', [RoleController::class, 'update'])->name('role.update');


        });
        Route::post('notification/{user}/get-unread', [NotificationController::class, 'getUnread']);
    });

    require __DIR__.'/auth.php';
});


