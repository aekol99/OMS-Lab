<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskComment;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Notification;
use App\Models\Task;

class TaskCommentController extends Controller
{
    public function getTaskComments($taskid){
        $comments = TaskComment::where('taskid', '=', $taskid)->get();
        foreach ($comments as $comment) {
            $owner = User::find($comment->userid);
            $comment['owner'] = $owner;
        }

        return response()->json(["taskComments" => $comments]);
    }

    public function newTaskComment(Request $request) {
        $taskComment = new TaskComment();
        $taskComment->taskid = $request->taskid;
        $taskComment->userid = $request->userid;
        $taskComment->content = $request->content;


        $task = Task::find($request->taskid);
        $project = Project::find($task->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $task->projectid)->get();

        if ($taskComment->save()) {
            foreach ($projectMembers as $member) {
                $newCommentNotification = new Notification();
                $newCommentNotification->actionMaker = $request->userid;
                $newCommentNotification->userid = $member->memberid;
                $newCommentNotification->content = $actionMaker->name . " Added new comment to the task '" . $task->name . "' in the project '" . $project->name . "'";
                if ($member->memberid == $request->userid) {
                    $newCommentNotification->content = "You Added new comment to the task '" . $task->name . "' in the project '" . $project->name . "'";
                }
                $newCommentNotification->save();
            }
            $taskComment['owner'] = $actionMaker;
            return response()->json(["taskCommentAdded" => true, "comment" => $taskComment]);
        }

        return response()->json(["taskCommentAdded" => false]);
    }

    public function deleteTaskComment($commentid, $userid) {
        $comment = TaskComment::find($commentid);

        $task = Task::find($comment->taskid);
        $project = Project::find($task->projectid);
        $actionMaker = User::find($userid);
        $projectMembers = ProjectMember::where('projectid', '=', $task->projectid)->get();

        if ($comment->delete()) {
            foreach ($projectMembers as $member) {
                $deleteCommentNotification = new Notification();
                $deleteCommentNotification->actionMaker = $userid;
                $deleteCommentNotification->userid = $member->memberid;
                $deleteCommentNotification->content = $actionMaker->name . " Deleted a comment from the task '" . $task->name . "' from the project '" . $project->name . "'";
                if ($member->memberid == $userid) {
                    $deleteCommentNotification->content = "You Deleted a comment from the task '" . $task->name . "' from the project '" . $project->name . "'";
                }
                $deleteCommentNotification->save();
            }
            return response()->json(["commentDeleted" => true, "commentId" => $comment->id]);
        }

        return response()->json(["commentDeleted" => false]);
    }
}
