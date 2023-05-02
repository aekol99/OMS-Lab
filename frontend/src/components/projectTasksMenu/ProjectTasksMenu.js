import React from 'react';
import './ProjectTasksMenu.css';
import { GrOverview } from 'react-icons/gr';
import { BsKanban } from 'react-icons/bs';
import { BsCalendarRange } from 'react-icons/bs';
import { MdLowPriority } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

function ProjectTasksMenu() {
    const params = useParams()

    const isActiveTab = (tabname) => {
        return (params.tab === tabname) ? 'active' :'';
    }

    return (
    <ul>
        <li className={isActiveTab('progress-tracker')}><Link to={`/project/${params.pid}/${params.bid}/progress-tracker`}><span><BsKanban /></span>Progress Tracker</Link></li>
        <li className={isActiveTab('project-priorities')}><Link to={`/project/${params.pid}/${params.bid}/project-priorities`}><span><MdLowPriority /></span>Project Priorities</Link></li>
        <li className={isActiveTab('task-calendar')}><Link to={`/project/${params.pid}/${params.bid}/task-calendar`}><span><BsCalendarRange /></span>Task Calendar</Link></li>
        <li className={isActiveTab('task-overview')}><Link to={`/project/${params.pid}/${params.bid}/task-overview`}><span><GrOverview /></span>Task Overview</Link></li>
        <li className={isActiveTab('task-duration')}><Link to={`/project/${params.pid}/${params.bid}/task-duration`}><span><GrOverview /></span>Task Duration</Link></li>
    </ul>
    )
}

export default ProjectTasksMenu