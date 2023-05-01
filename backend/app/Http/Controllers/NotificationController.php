<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\User;

class NotificationController extends Controller
{
    public function getAllNotifications($id){
        $notifications = Notification::where('userid', '=', $id)->orderBy('created_at', 'desc')->get();
        foreach ($notifications as $notification) {
            $maker = User::find($notification->actionMaker);
            $notification->maker = $maker;
        }
        
        return ['allNotifications' => $notifications];
    }
}
