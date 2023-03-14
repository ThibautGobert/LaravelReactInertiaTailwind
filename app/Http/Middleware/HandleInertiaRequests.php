<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $path = $request->path();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()?->append('short_permissions', 'is_online'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'sideBarItems' => [
                [
                    'label' => 'Utilisateurs',
                    'href' => route('admin.user.index'),
                    'active' => str_contains($path, 'user'),
                    'icon' => 'fa-solid fa-users'
                ],
                [
                    'label' => 'Roles',
                    'href' => route('admin.role.index'),
                    'active' => str_contains($path, 'role'),
                    'icon' => 'fa-solid fa-user-shield'
                ]
            ]
        ]);
    }

    public function rootView(Request $request): string
    {
        /*
        if ($request->is(['admin', 'admin/*'])) {
            return 'admin';
        }
        */

        return 'app';
    }

}
