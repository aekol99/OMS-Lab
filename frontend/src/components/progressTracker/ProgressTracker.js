import React, { useEffect } from 'react';
import './ProgressTracker.css';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import TasksWrapper from '../../components/tasksWrapper/TasksWrapper';
import NewTaskModal from '../../modals/newTaskModal/NewTaskModal';
import TaskModal from '../../modals/taskModal/TaskModal';
import DeleteTaskModal from '../../modals/deleteTaskModal/DeleteTaskModal';
import { getAllTasks } from '../../redux/thunks/task/getAllTasks';

function ProgressTracker() {
  const params =useParams();
  const dispatch = useDispatch();

  const tasksWrappers = useSelector(state => state.project.projectTasksWrappers);
  const openedTaskModal = useSelector(state => state.modals.openedTaskModal);
  const newTaskModal = useSelector(state => state.modals.newTaskModal);
  const deleteTaskModal = useSelector(state => state.modals.deleteTaskModal);
  
  const boardid = params.bid;
  useEffect(() => {
    const getAllTasksPromise = dispatch(getAllTasks({projectid: params.pid, boardid: params.bid}));

    return () => {
      getAllTasksPromise.abort();
      console.log("abborted");
    }
  }, [boardid]);
  
  return (
    <div className='progress-tracker'>
      <h2 className='tab-header'>Progress Tracker</h2>
      <div className='tasks-wrappers'> 
        <TasksWrapper title="todo" label="TO DO" tasks={tasksWrappers.todo} />
        <TasksWrapper title="inprogress" label="IN PROGRESS" tasks={tasksWrappers.inprogress} />
        <TasksWrapper title="blocked" label="BLOCKED" tasks={tasksWrappers.blocked} />
        <TasksWrapper title="finished" label="COMPLETED" tasks={tasksWrappers.finished} />
      </div>

      <NewTaskModal state={newTaskModal.state} />
      <TaskModal state={openedTaskModal.state}/>
      <DeleteTaskModal state={deleteTaskModal.state}/>
    </div>
  )
}

export default ProgressTracker