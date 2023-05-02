import React, { useEffect } from 'react';
import './DeleteTaskModal.css';
import { BsArchive } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineLoading } from 'react-icons/ai';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTask } from '../../redux/thunks/task/deleteTask';

import { getAllTasks } from '../../redux/thunks/task/getAllTasks';
import { resetTaskDeleted } from '../../redux/slices/taskSlice';
import { setDeleteTaskModal } from '../../redux/slices/modalsSlice';


function DeleteTaskModal(props) {
	const params = useParams();
	const dispatch = useDispatch();

	const taskid = useSelector(state => state.modals.deleteTaskModal.taskid);
	const taskName = useSelector(state => state.modals.deleteTaskModal.taskName);

	const taskDeleted = useSelector(state => state.task.taskDeleted);

	const loading = useSelector(state => state.task.loading);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteTask({taskid}));
	}
	useEffect(() => {
		if (taskDeleted) {
			console.log("Task successfully deleted");

			dispatch(getAllTasks({projectid: params.pid, boardid: params.bid}));
			dispatch(resetTaskDeleted());
			dispatch(setDeleteTaskModal({state: false, taskid: null}));
		}
	}, [taskDeleted]);

	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setDeleteTaskModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>Delete Task</span>
					</div>
					<div className='modal-body'>
						<form className='delete-task' onSubmit={handleSubmit}>
							Are you sure you want to delete the task <b>{taskName ? taskName : null}</b>?
							<button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <RiDeleteBin6Line />} Yes, I'm sure.</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setDeleteTaskModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteTaskModal