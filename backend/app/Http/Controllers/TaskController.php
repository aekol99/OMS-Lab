<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Notification;

class TaskController extends Controller
{
    public function newTask(Request $request){
        $tasks = Task::where('projectid', '=', $request->projectid)->where('boardid', '=', $request->boardid)->where('status', '=', $request->status)->get();

        if ($request->order == "first") {
            foreach ($tasks as $task) {
                $task->order = intval($task->order) + 1;
                $task->update();
            }
        }
        
        $newTask = new Task();
        $newTask->name = $request->name;
        $newTask->projectid = $request->projectid;
        $newTask->boardid = $request->boardid;
        $newTask->userid = $request->userid;
        $newTask->status = $request->status;
        $newTask->order = 0;
        if ($request->order == "last") {
            $newTask->order = count($tasks);
        }
        
        $project = Project::find($request->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $request->projectid)->get();

        if ($newTask->save()) {
            foreach ($projectMembers as $member) {
                $newTaskNotification = new Notification();
                $newTaskNotification->actionMaker = $request->userid;
                $newTaskNotification->userid = $member->memberid;
                $newTaskNotification->content = $actionMaker->name . " Added new Task called '" . $request->name . "' to the project '" . $project->name . "'";
                if ($member->memberid == $request->userid) {
                    $newTaskNotification->content = "You added new Task called '" . $request->name . "' to the project '" . $project->name . "'";
                }
                $newTaskNotification->save();
            }
            return response()->json(["taskCreated" => true]);
        }
        return response()->json(["taskCreated" => false]);
    }

    public function getAllTasks($projectid, $boardid){
        $todo = Task::where('projectid', '=', $projectid)->where('boardid', '=', $boardid)->where('status', '=', 'todo')->orderBy('order', 'asc')->get();

        $inProgress = Task::where('projectid', '=', $projectid)->where('boardid', '=', $boardid)->where('status', '=', 'inprogress')->orderBy('order', 'asc')->get();

        $blocked = Task::where('projectid', '=', $projectid)->where('boardid', '=', $boardid)->where('status', '=', 'blocked')->orderBy('order', 'asc')->get();

        $finished = Task::where('projectid', '=', $projectid)->where('boardid', '=', $boardid)->where('status', '=', 'finished')->orderBy('order', 'asc')->get();

        return response()->json(["tasks" => ["todo" => $todo, "inprogress" => $inProgress, "blocked" => $blocked, "finished" => $finished]]);
    }

    public function updateTaskData(Request $request, $taskid){
        $tasksAfter = Task::where('projectid', '=', $request->projectid)->where('boardid', '=', $request->boardid)->where('status', '=', $request->status)->where('order', '>=', $request->position)->get();

        foreach ($tasksAfter  as $taskAfter) {
            $taskAfter->order = intval($taskAfter->order) + 1;
            $taskAfter->update();
        }
        
        $task = Task::find($taskid);
        $task->status = $request->status;
        $task->order = $request->position;


        $project = Project::find($request->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $request->projectid)->get();

        if ($task->save()) {
            foreach ($projectMembers as $member) {
                $updateTaskNotification = new Notification();
                $updateTaskNotification->actionMaker = $request->userid;
                $updateTaskNotification->userid = $member->memberid;
                $updateTaskNotification->content = $actionMaker->name . " Changed the task '" . $task->name . "' status in the project '" . $project->name . "'";
                if ($member->memberid == $request->userid) {
                    $updateTaskNotification->content = "You Changed the task '" . $task->name . "' status in the project '" . $project->name . "'";
                }
                $updateTaskNotification->save();
            }
            return response()->json(["taskDataUpdated" => true]);
        }
        return response()->json(["taskDataUpdated" => false]);
    }

    public function deleteTask($taskid, $userid){
        $task = Task::find($taskid);

        $project = Project::find($task->projectid);
        $actionMaker = User::find($userid);
        $projectMembers = ProjectMember::where('projectid', '=', $task->projectid)->get();

        if ($task->delete()) {
            foreach ($projectMembers as $member) {
                $deleteTaskNotification = new Notification();
                $deleteTaskNotification->actionMaker = $userid;
                $deleteTaskNotification->userid = $member->memberid;
                $deleteTaskNotification->content = $actionMaker->name . " Deleted the task '" . $task->name . "' from the project '" . $project->name . "'";
                if ($member->memberid == $userid) {
                    $deleteTaskNotification->content = "You Deleted the task '" . $task->name . "' from the project '" . $project->name . "'";
                }
                $deleteTaskNotification->save();
            }
            return response()->json(["taskDeleted" => true]);
        }
        return response()->json(["taskDeleted" => false]);
    }

    public function getTaskInfos($taskid){
        $task = Task::find($taskid);
        $createdBy = User::find($task->userid);
        $assignee = User::find($task->assignee);

        $task->created_by = $createdBy;
        $task->assignee = $assignee;

        return response()->json(["taskInfos" => $task]);
    }

    public function changeTaskInfos(Request $request, $taskid){
        $task = Task::find($taskid);
        $target = $request->target;
        $task->$target = $request->value;

        $project = Project::find($task->projectid);
        $actionMaker = User::find($request->userid);
        $projectMembers = ProjectMember::where('projectid', '=', $task->projectid)->get();

        $updatedTarget = ["name" => "Name","status" => "Status","priority" => "Priority","assignee" => "Assignee","estimated_hours" => "Estimated Hours","due_date" => "Due Date","order" => "Order","description" => "Description",];

        if ($task->save()) {
            foreach ($projectMembers as $member) {
                $ChangeTaskInfosNotification = new Notification();
                $ChangeTaskInfosNotification->actionMaker = $request->userid;
                $ChangeTaskInfosNotification->userid = $member->memberid;
                $ChangeTaskInfosNotification->content = $actionMaker->name . " Updated the task '" . $task->name . "' " . $updatedTarget[$target] . " from the project '" . $project->name . "'";
                if ($member->memberid == $request->userid) {
                    $ChangeTaskInfosNotification->content = "You Updated the task '" . $task->name .  "' " . $updatedTarget[$target] . " from the project '" . $project->name . "'";
                }
                $ChangeTaskInfosNotification->save();
            }
            return response()->json(["taskChanged" => true]);
        }
        return response()->json(["taskChanged" => false]);
    }
}
