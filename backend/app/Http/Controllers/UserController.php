<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function newUser(Request $request){
        $user = new User();
        $user->username = $request->username;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->isAdmin = "user";
        $user->password = $request->password;

        if ($user->save()) {
            return response()->json(['success' => 'User created']);
        }
        return response()->json(['error' => 'Sorry, User has not been created']);
    }

    public function getAllUsers(){
        $users = User::all();
        return ["allUsers" => $users];
    }

    public function deleteUser($id){
        $user = User::find($id);
        $user->delete();

        return response()->json(['success' => 'User removed successfully']);
    }

    public function changePassword(Request $request, $id){
        $user = User::find($id);
        if ($user->password == $request->oldpassword) {
            $user->password = $request->newpassword;
            $user->save();
            return response()->json(['success' => 'Password successfully chnaged']);
        }
        return response()->json(['error' => 'Sorry, your password is wrong']);
    }

    public function searchUsers(Request $request) {
        $users = User::where('firstname', 'LIKE', $request->pattern.'%')->orwhere('lastname', 'LIKE', $request->pattern.'%');
        return ['searchResults' => $users->get()];
    }
}
