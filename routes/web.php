<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Middleware\AdminMiddleware;


Route::get('/', [LandingController::class, 'index']);

Route::prefix('admin')
    ->middleware(['auth', 'verified', 'admin'])
    ->group(function () {
        Route::get('dashboard', [LandingController::class, 'adminDashboard']);

        Route::prefix('services')->group(function () {
            Route::get('index', [ServiceController::class, 'index'])->name('services.index');
            Route::get('create', [ServiceController::class, 'create'])->name('services.create');
            Route::post('store', [ServiceController::class, 'store'])->name('services.store');
            Route::get('edit/{service}', [ServiceController::class, 'edit'])->name('services.edit');
            Route::put('update/{service}', [ServiceController::class, 'update'])->name('services.update');
        });
    });


require __DIR__ . '/settings.php';
