import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSection } from '../../redux/slices/taskSlice';
import { getTaskInfos } from '../../redux/thunks/task/getTaskInfos';
import { profileImgColors } from '../../data/profileImgColors';

import { setTaskInfos } from '../../redux/slices/taskSlice';
import { changeTaskInfos } from '../../redux/thunks/task/changeTaskInfos';
import { resetTaskChanged } from '../../redux/slices/taskSlice';
import { changeTaskName } from '../../redux/slices/projectSlice';
import { getTaskComments } from '../../redux/thunks/task/getTaskComments';
import { newTaskComment } from '../../redux/thunks/task/newTaskComment';

import { resetTaskCommentAdded } from '../../redux/slices/taskSlice';

import TaskComment from './TaskComment';

function TaskOptions() {
  const dispatch = useDispatch();
  const taskid = useSelector(state => state.modals.openedTaskModal.id);
  const modalOpened = useSelector(state => state.modals.openedTaskModal.state);
  const taskInfos = useSelector(state => state.task.taskInfos);
  const taskChanged = useSelector(state => state.task.taskChanged);
  const profileInfos = useSelector(state => state.profile.profileInfos);

  const taskComments = useSelector(state => state.task.taskComments);
  console.log(taskComments);
  const getTaskInfosPromise = useRef(null);
  const getTaskCommentsPromise = useRef(null);

  const taskCommentAdded = useSelector(state => state.task.taskCommentAdded);

  const commentContent = useRef(null);
  console.log("taskoptions");
  useEffect(() => {
    if (modalOpened) {
      console.log("getting");
      getTaskInfosPromise.current = dispatch(getTaskInfos({taskid}));
      getTaskCommentsPromise.current = dispatch(getTaskComments({taskid}));
    }

    return () => {
      if (getTaskInfosPromise.current) {
        getTaskInfosPromise.current.abort();
      }
      if (getTaskCommentsPromise.current) {
        getTaskCommentsPromise.current.abort();
      }
    }
  }, []);

  useEffect(() => {
    if (taskChanged) {
      dispatch(resetTaskChanged());
    }
  });

  useEffect(() => {
    if (taskCommentAdded) {
      commentContent.current.value = "";
      dispatch(resetTaskCommentAdded());
    }
  }, [taskCommentAdded]);

  const textDispatchPromise = useRef(null);
  const handleSetTaskInfos = (e, target) => {
    const value = e.target.value;
    dispatch(setTaskInfos({target: target, value}));
    if (target == "description" || target == "name") {
      if (textDispatchPromise.current) {
        textDispatchPromise.current.abort();
      }
      if (target == "name") {
        dispatch(changeTaskName({status: taskInfos.status, id: taskid, value}));
      }
      textDispatchPromise.current = dispatch(changeTaskInfos({taskid, target, value}));
    }else{
      dispatch(changeTaskInfos({taskid, target, value}));
    }
  }

  const handleNewTaskComment = (e) => {
    e.preventDefault();
    dispatch(newTaskComment({taskid, content: commentContent.current.value}));
  }
  return (
    <>
    <form className='task-options'>
        <input className='task-name' type="text" value={taskInfos ? taskInfos.name : ""} onChange={(e) => handleSetTaskInfos(e, 'name')} />
        <div className='task-property status'>
          <p className='property-label'>Status</p>
          <div className='property-value'>
            <p className={taskInfos ? taskInfos.status : null}>{taskInfos ? taskInfos.status : null}</p>
          </div>
        </div>
        <div className='task-property priority'>
          <p className='property-label'>Priority</p>
          <div className='property-value'>
            <select value={taskInfos ? (taskInfos.priority ? taskInfos.priority : "none") : "none"} onChange={(e) => handleSetTaskInfos(e, 'priority')}>
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className='task-property assignee'>
          <p className='property-label'>Assignee</p>
          <div className='property-value' onClick={() => dispatch(setActiveSection("task-assignee"))}>
            <span className='img' style={taskInfos && taskInfos.assignee ? {backgroundColor: profileImgColors[taskInfos.assignee.firstname[0]]} : {backgroundColor: '#555'}}>{taskInfos && taskInfos.assignee ? taskInfos.assignee.firstname[0] : "n"}</span>
            <p>{taskInfos && taskInfos.assignee ? `${taskInfos.assignee.lastname} ${taskInfos.assignee.firstname}` : "None"}</p>
          </div>
        </div>
        <div className='task-property'>
          <p className='property-label'>Estimated Hours</p>
          <div className='property-value'>
            <input type="number" placeholder='Empty' value={taskInfos && taskInfos.estimated_hours ? taskInfos.estimated_hours : ""} onChange={(e) => handleSetTaskInfos(e, 'estimated_hours')} />
          </div>
        </div>
        <div className='task-property'>
          <p className='property-label'>Due Date</p>
          <div className='property-value'>
            <input type="date" value={taskInfos && taskInfos.due_date ? taskInfos.due_date : ""} onChange={(e) => handleSetTaskInfos(e, 'due_date')} />
          </div>
        </div>
        <div className='task-property created-by'>
          <p className='property-label'>Created By</p>
          <div className='property-value'>
              <span className='img' style={taskInfos ? {backgroundColor: profileImgColors[taskInfos.created_by.firstname[0]]} : {}}>{taskInfos ? taskInfos.created_by.firstname[0] : ""}</span>
              <p>{taskInfos ? `${taskInfos.created_by.lastname} ${taskInfos.created_by.firstname}` : ""}</p>
          </div>
        </div>
        <div className='task-property'>
          <p className='property-label'>Date Created</p>
          <div className='property-value'>
            <input type="date" value={taskInfos && taskInfos.created_at ? taskInfos.created_at.split('T')[0] : ""} onChange={() => {}} />
          </div>
        </div>
        <div className='task-property description'>
          <p className='property-label'>Description</p>
          <div className='property-value'>
            <textarea placeholder='Empty' value={taskInfos && taskInfos.description ? taskInfos.description : ""} onChange={(e) => handleSetTaskInfos(e, 'description')}></textarea>
          </div>
        </div>
    </form>
    <form className='task-comments' onSubmit={handleNewTaskComment}>
      <div className='field'>
        <span className='img' style={{backgroundColor: profileImgColors[profileInfos ? profileInfos.firstname[0] : "#a62640"]}}>{profileInfos ? profileInfos.firstname[0] : ""}</span>
        <input type="text" placeholder='add a comment...' ref={commentContent} />
      </div>
      <div className='comments'>
        {taskComments && taskComments.length != 0 && <h4>Comments :</h4>}
        {taskComments ? taskComments.map((comment,i) => <TaskComment key={i} data={comment} />) : null}
      </div>
    </form>
    </>
  )
}

export default TaskOptions