import React from 'react';
import './Project.css';
import { useParams } from 'react-router-dom';

import PrimaryBar from '../../components/primaryBar/PrimaryBar';
import OptionsBar from '../../components/optionsBar/OptionsBar';

import ProgressTracker from '../../components/progressTracker/ProgressTracker';
import ProjectPriorities from '../../components/projectPriorities/ProjectPriorities';
import TaskCalendar from '../../components/taskCalendar/TaskCalendar';
import TaskOverview from '../../components/taskOverview/TaskOverview';
import TaskDuration from '../../components/taskDuration/TaskDuration';

function Project() {
  const params = useParams();
  if (params.tab === 'project-priorities') {
    return (
      <>
          <PrimaryBar />
          <OptionsBar />
          <ProjectPriorities />
      </>
    )
  }
  if(params.tab === 'task-calendar') {
    return (
      <>
          <PrimaryBar />
          <OptionsBar />
          <TaskCalendar />
      </>
    )
  }
  if(params.tab === 'task-overview'){
    return (
      <>
          <PrimaryBar />
          <OptionsBar />
          <TaskOverview />
      </>
    )
  }
  if(params.tab === 'task-duration'){
    return (
      <>
          <PrimaryBar />
          <OptionsBar />
          <TaskDuration />
      </>
    )
  }
  return (
    <>
        <PrimaryBar />
        <OptionsBar />
        <ProgressTracker />
    </>
  )
}

export default Project