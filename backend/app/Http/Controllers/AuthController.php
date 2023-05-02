<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Session;

class AuthController extends Controller
{

    public function login(Request $request){
        $user = User::where('username', '=', $request->username)->first();
        if ($user) {
            if ($request->password == $user->password) {
                return response()->json($user);
            }else {
                return response()->json(['error' => 'Désolé, votre mot de passe est incorrect']);
            }
        }
        return response()->json(['error' => 'Désolé, votre Username est incorrect']);
    }

}
