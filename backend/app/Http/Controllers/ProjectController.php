<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectMember;
use App\Models\User;

class ProjectController extends Controller
{
    public function checkProjectMember($id){
        return response()->json(["isProjectMember" => true]);
    }

    public function getProjectMembers($projectid){
        $projectMembers = ProjectMember::where('projectid', '=', $projectid)->get();
        $users = [];
        foreach ($projectMembers as $member) {
            $user = User::find($member->memberid);
            array_push($users, $user);
        }
        return response()->json(["projectMembers" => $users]);
    }
}
