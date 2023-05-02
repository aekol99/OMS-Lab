<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Notification;

class BoardController extends Controller
{
    public function getAllBoards($id){
        $boards = Board::where('projectid', '=', $id)->orderBy('created_at', 'asc')->get();
        return response()->json(["boards" => $boards]);
    }

    public function newBoard(Request $request){
        $board = new Board();
        $board->name = $request->name;
        $board->projectid = $request->projectid;

        $project = Project::find($request->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $request->projectid)->get();
        if ($board->save()) {
            foreach ($projectMembers as $member) {
                $renamedNotification = new Notification();
                $renamedNotification->actionMaker = $request->userid;
                $renamedNotification->userid = $member->memberid;
                $renamedNotification->content = $actionMaker->name . " Added new board called '" . $request->name . "' to the project '" . $project->name . "'";
                if ($member->memberid == $request->userid) {
                    $renamedNotification->content = "You added new board called '" . $request->name . "' to the project '" . $project->name . "'";
                }
                $renamedNotification->save();
            }
            return response()->json(["boardCreated" => true]);
        }
        return response()->json(["boardCreated" => false]);
    }
    
    public function renameBoard(Request $request, $id){
        $board = Board::find($id);
        $oldname = $board->name;
        $board->name = $request->newname;
        $board->update();

        $project = Project::find($request->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $request->projectid)->get();
        foreach ($projectMembers as $member) {
            $renamedNotification = new Notification();
            $renamedNotification->actionMaker = $request->userid;
            $renamedNotification->userid = $member->memberid;
            $renamedNotification->content = $actionMaker->name . " renamed the board '" . $oldname . "' to '" . $request->newname . "' from the project '" . $project->name . "'";
            if ($member->memberid == $request->userid) {
                $renamedNotification->content = "You renamed the board '" . $oldname . "' to '" . $request->newname . "' from the project '" . $project->name . "'";
            }
            $renamedNotification->save();
        }

        return response()->json(["boardRenamed" => true]);
    }

    public function deleteBoard($id, $projectid, $userid){
        $boards = Board::where('projectid', '=', $projectid)->get();
        if (count($boards) > 1) {
            $board = Board::find($id);
            $boardid= $board->id;
            $boardName = $board->name;
            $board->delete();

            $boardTasks = Task::where('boardid', '=', $boardid)->get();
            foreach ($boardTasks as $task) {
                $task->delete();
            }

            $project = Project::find($projectid);
            $actionMaker = User::find($userid);
            $projectMembers = ProjectMember::where('projectid', '=', $projectid)->get();

            foreach ($projectMembers as $member) {
                $renamedNotification = new Notification();
                $renamedNotification->actionMaker = $userid;
                $renamedNotification->userid = $member->memberid;
                $renamedNotification->content = $actionMaker->name . " deleted the board '" . $boardName . "' from the project '" . $project->name . "'";
                if ($member->memberid == $userid) {
                    $renamedNotification->content = "You deleted the board '" . $boardName . "' from the project '" . $project->name . "'";
                }
                $renamedNotification->save();
            }


            return response()->json(['boardDeleted' => true]);
        }else{
            return response()->json(['boardDeleted' => false]);
        }
    }    
}
