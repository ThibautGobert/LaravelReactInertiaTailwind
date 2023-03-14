<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Permissions\PermissionType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Facades\Image as Intervention;
use JamesMills\LaravelTimezone\Facades\Timezone;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //dd(geoip('94.23.64.2'));
        //dd(Timezone::);
        $users = User::all();
        $users->each->append('is_online');

        return Inertia::render('AdminUser/Index',[
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AdminUser/Create',[
            'permissions' => Permission::orderBy('name')->get(),
            'roles' => Role::orderBy('name')->get(),
            'permissionType' => PermissionType::asFullArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'pseudo' => $request->input('pseudo'),
            'name' => $request->input('name'),
            'firstname' => $request->input('firstname'),
            'email' => $request->input('email'),
            'birthday' => $request->input('birthday'),
            'password' => Hash::make($request->input('password'))
        ]);

        $user->permissions()->sync($request->input('permissions'));
        $user->roles()->sync($request->input('roles'));

        return redirect()->route('admin.user.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('AdminUser/Edit',[
            'user' => $user->load('permissions', 'roles.permissions'),
            'permissions' => Permission::orderBy('name')->get(),
            'roles' => Role::orderBy('name')->get(),
            'permissionType' => PermissionType::asFullArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = [
            'pseudo' => $request->input('pseudo'),
            'name' => $request->input('name'),
            'firstname' => $request->input('firstname'),
            'email' => $request->input('email'),
            'birthday' => $request->input('birthday'),
        ];
        if($request->filled('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }
        $user->update($data);
        $user->permissions()->sync($request->input('permissions'));
        $user->roles()->sync($request->input('roles'));
        return redirect()->route('admin.user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.user.index');
    }

    public function uploadTempImage(Request $request, User $user)
    {
        //$user = User::find($request->input('user_id'));
        $path = Storage::disk('public')->put('temp/'.$user->id, $request->file('image'));

        return response()->json(['path' => $path]);
    }

    public function cropImage(Request $request, User $user)
    {
        $croppedAreaPixel = $request->input('cropped_area_pixel');
        $croppedArea = $request->input('cropped_area');
        //dd($croppedArea);
        $image = Intervention::make(Storage::disk('public')->get($request->input('image')));

        //$image->resize($image->width() * $croppedArea['width'].'%', $image->height()*$croppedArea['height'].'%')
        $image->resize($image->width() * $croppedArea['width'].'%', $image->height()*$croppedArea['height'].'%')
            ->crop($croppedAreaPixel['width'], $croppedAreaPixel['height'], $croppedAreaPixel['x'], $croppedAreaPixel['y'])
            ->resize(300, 300)
            ->encode('jpg', 100);
        $path = 'image/'. $user->id . '/avatar/'. Str::random(40).'.jpg';
        Storage::disk('public')->put($path, $image);
        Storage::disk('public')->delete($request->input('image'));
        if($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->update(['avatar' => $path]);

        return redirect()->route('admin.user.edit', $user);
    }
}
