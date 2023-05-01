<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectUpdate;

class ProjectUpdateController extends Controller
{
    public function setProjectLastUpdates(Request $request){
        $update = ProjectUpdate::where('userid', '=', $request->userid)->where('projectid', '=', $request->projectid)->first();

        if ($update) {
            $update->last_task_tab = $request->taskTab;
            $update->last_board = $request->board;
            $update->update();
        }else{
            $firstUpdate = new ProjectUpdate();
            $firstUpdate->userid = $request->userid;
            $firstUpdate->projectid = $request->projectid;
            $firstUpdate->last_task_tab = $request->taskTab;
            $firstUpdate->last_board = $request->board;
            $firstUpdate->save();
        }
    }
}
