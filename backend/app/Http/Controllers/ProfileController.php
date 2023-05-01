<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    public function getUserInfos($userid){
        $user = User::find($userid);
        return response()->json(["profileInfos" => $user]);
    }
}
