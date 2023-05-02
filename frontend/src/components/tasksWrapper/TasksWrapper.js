import React, { useRef } from 'react';
import './TasksWrapper.css';
import { AiOutlinePlus } from 'react-icons/ai';

import Task from '../task/Task';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setDraggedOverWrapper } from '../../redux/slices/appSlice';
import { changeTaskState } from '../../redux/slices/projectSlice';

import { setMoveAfterTaskID } from '../../redux/slices/projectSlice';
import { setMoveInEmptyWrapper } from '../../redux/slices/projectSlice';
import { setNewTaskModal } from '../../redux/slices/modalsSlice';
import { updateTaskData } from '../../redux/thunks/task/updateTaskData';

function TasksWrapper(props) {
	const params = useParams();
	const dispatch = useDispatch();

	const moveInEmptyWrapper = useSelector(state => state.project.moveInEmptyWrapper);
	const dragAfterTaskTargetResult = useRef(null);
	const draggedTaskId = useSelector(state => state.app.draggedTaskId);
	const draggedFrom = useSelector(state => state.app.draggedFrom);

	// Start Drag Over
  	const dragOver = (e) => {
		e.preventDefault();
		let posY = e.clientY;
		let targetTaskId = null;
		// Getting insert position index
		dragAfterTaskTargetResult.current = 0;
		props.tasks.forEach((task, i) => {
			let taskElement = document.getElementById(task.id);
			let taskRect = taskElement.getBoundingClientRect();
			let taskVPos = taskRect.y + taskRect.height / 2;
			if (posY >= taskVPos && task.id !== draggedTaskId){
				dragAfterTaskTargetResult.current += 1;
				targetTaskId = task.id;
			}
		});
		// Sending insert position data
		if (props.tasks.length !== 0 && dragAfterTaskTargetResult.current === 0){
			let target = props.tasks[0].id;
			dispatch(setMoveInEmptyWrapper({target: null}));
			dispatch(setMoveAfterTaskID({target: target, where: 'begin'}));
		}
		if (props.tasks.length !== 0 && dragAfterTaskTargetResult.current !== 0){
			dispatch(setMoveInEmptyWrapper({target: null}));
			dispatch(setMoveAfterTaskID({target: targetTaskId, where: 'after'}));
		}
		if(dragAfterTaskTargetResult.current === 0 && props.tasks.length === 0){
			dispatch(setMoveInEmptyWrapper({target: props.title}));
			dispatch(setMoveAfterTaskID({target: null, where: 'after'}));
		}
		dispatch(setDraggedOverWrapper(props.title));
	}
	
	// Start Drag Drop
	const dragDrop = (e) => {
		dispatch(setMoveAfterTaskID({target: null, where: 'after'}));
		dispatch(changeTaskState({id: draggedTaskId, from: draggedFrom, to: props.title, index: dragAfterTaskTargetResult.current}));
		dispatch(updateTaskData({taskid: draggedTaskId, status: props.title, position: dragAfterTaskTargetResult.current, projectid: params.pid, boardid: params.bid}))
		dispatch(setMoveInEmptyWrapper({target: null}));
	}
	
	return (
		<div className={`tasks-wrapper ${props.title}`} onDragOver={dragOver} onDrop={dragDrop}>
			<div className='wrapper-header'>
				<h3 className='wrapper-label'>{props.label}</h3>
				<span className='new-task-btn' onClick={() => dispatch(setNewTaskModal({state: true, area: props.title, order: 'first'}))}><AiOutlinePlus /></span>
			</div>
			
			{((props.tasks.length === 0) && (moveInEmptyWrapper.target === props.title)) ? <div style={{backgroundColor: "#ffffff50"}} className='task' ></div> : null}
			{props.tasks.map((task, i) => <Task key={i} taskId={task.id} taskName={task.name} taskFrom={props.title} color={task.color} />)}

			<p className='new-last-task-btn' onClick={() => dispatch(setNewTaskModal({state: true, area: props.title, order: 'last'}))}><AiOutlinePlus /> New</p>
		</div>
	);
}

export default TasksWrapper