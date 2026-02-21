<?php

use App\Http\Controllers\CapsterController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Capster;

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
            Route::patch('/toggle-status/{service}', [ServiceController::class, 'toggleStatus'])
                ->name('admin.service.toggle-status');
        });

        Route::prefix('capsters')->group(function () {
            Route::get('index', [CapsterController::class, 'index'])->name('capsters.index');
            Route::get('create', [CapsterController::class, 'create'])->name('capsters.create');
            Route::post('store', [CapsterController::class, 'store'])->name('capsters.store');
            Route::get('edit/{capster}', [CapsterController::class, 'edit'])->name('capsters.edit');
            Route::put('update/{capster}', [CapsterController::class, 'update'])->name('capsters.update');
            Route::patch('/toggle-status/{capster}', [CapsterController::class, 'toggleStatus'])
                ->name('admin.capsters.toggle-status');
        });

        Route::prefix('pricings')->group(function () {
            Route::get('index', [PricingController::class, 'index'])->name('pricings.index');
            Route::get('create', [PricingController::class, 'create'])->name('pricings.create');
            Route::post('store', [PricingController::class, 'store'])->name('pricings.store');
            Route::get('edit/{pricing}', [PricingController::class, 'edit'])->name('pricings.edit');
            Route::put('update/{pricing}', [PricingController::class, 'update'])->name('pricings.update');
        });
    });


require __DIR__ . '/settings.php';
