<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\ProjectMember;
use App\Models\Notification;
use App\Models\Board;
use App\Models\ProjectUpdate;

class ProjectsController extends Controller
{
    public function newProject(Request $request){
        $project = new Project();
        $project->owner = $request->owner;
        $project->name = $request->name;
        $project->description = $request->description;
        // Add Project Members
        if ($project->save()) {
            $ownerAsMember = new ProjectMember();
            $ownerAsMember->memberid = $request->owner;
            $ownerAsMember->projectid = $project->id;
            $ownerAsMember->save();
            // Create Board
            $board = new Board();
            $board->name = "Board";
            $board->projectid = $project->id;
            $board->save();
            // Create Project Created Notification
            $ownerAsMemberNotification = new Notification();
            $ownerAsMemberNotification->actionMaker = $request->owner;
            $ownerAsMemberNotification->userid = $request->owner;
            $ownerAsMemberNotification->content = "You created the project " . $request->name;
            $ownerAsMemberNotification->save();
            // Create Member Added Notifications
            foreach ($request->members as $member) {
                $projectMember = new ProjectMember();
                $projectMember->memberid = $member;
                $projectMember->projectid = $project->id;
                
                // Create Project Members Notification
                if ($projectMember->save()) {
                    $notification = new Notification();
                    $notification->actionMaker = $request->owner;
                    $notification->userid = $member;
                    $notification->content = "Added you in the project " . $request->name;
                    $notification->save();
                }
            }
            return response()->json(['success' => 'Project created']);
        }
        return response()->json(['error' => 'Sorry, Project has not been created']);
    }

    public function getAllProjects($filter, $order, $id) {
        $projects = ProjectMember::join('projects', 'project_members.projectid', '=', 'projects.id')->where('project_members.memberid', '=', $id)->orderBy('projects.'.$filter, $order)->get();
        
        // $projects = Project::orderBy($filter, $order)->get();
        foreach($projects as $project) {
            $owner = User::find($project->owner);
            $project['owner'] = $owner;
            // Get The Last Project Updates
            $projectUpdates = ProjectUpdate::where('userid', '=', $id)->where('projectid', '=', $project->id)->first();
            if ($projectUpdates) {
                $boardExists = Board::find($projectUpdates->last_board);
            }
            if ($projectUpdates && $boardExists) {
                $project['lastTaskTab'] = $projectUpdates->last_task_tab;
                $project['board'] = $projectUpdates->last_board;
            }else{
                $board = Board::where('projectid', '=', $project->id)->orderBy('updated_at', 'asc')->first();
                $project['lastTaskTab'] = 'progress-tracker';
                $project['board'] = $board->id;
            }
        }
        return ['allProjects' => $projects];
    }

    public function searchProjects(Request $request) {
        $projects = ProjectMember::join('projects', 'project_members.projectid', '=', 'projects.id')->where('project_members.memberid', '=', $request->id)->where(function($a){
            global $request;
            $a->where('projects.name', 'LIKE', '%'.$request->pattern.'%')->orwhere('projects.description', 'LIKE', '%'.$request->pattern.'%');
        })->get();

        // $projects = Project::where('name', 'LIKE', '%'.$request->pattern.'%')->orwhere('description', 'LIKE', '%'.$request->pattern.'%')->get();

        foreach($projects as $project) {
            $owner = User::find($project->owner);
            $project['owner'] = $owner;
        }

        return ['searchResults' => $projects];
    }

    public function getAllTeamMembers(){
        $users = User::all();
        return ["teamMembers" => $users];
    }

    public function getProjectInfos($projectid){
        $project = Project::find($projectid);
        return response()->json(["projectInfos" => $project]);
    }

    public function deleteProject($projectid){
        $project = Project::find($projectid);
        $project->delete();

        return response()->json(["projectDeleted" => true]);
    }
}
