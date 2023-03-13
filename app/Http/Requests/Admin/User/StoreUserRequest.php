<?php

namespace App\Http\Requests\Admin\User;

use App\Enums\Permissions\UserPermissionType;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can(UserPermissionType::CREATE_USER);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'pseudo' => 'required|unique:users,pseudo',
            'name' => 'required',
            'password' => 'required',
            'password_confirm' => 'required|same:password',
        ];
    }
}
