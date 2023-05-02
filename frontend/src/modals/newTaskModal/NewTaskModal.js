import React, { useEffect, useRef } from 'react';
import './NewTaskModal.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import { setNewTaskModal } from '../../redux/slices/modalsSlice';
import { BiTask } from 'react-icons/bi';
import { newTask } from '../../redux/thunks/task/newTask';
import { resetNewTaskAdded } from '../../redux/slices/taskSlice';
import { getAllTasks } from '../../redux/thunks/task/getAllTasks';

function NewTaskModal(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const name = useRef(null);
	const area = useSelector(state => state.modals.newTaskModal.area);
	const order = useSelector(state => state.modals.newTaskModal.order);
	const newTaskAdded = useSelector(state => state.task.newTaskAdded);
	const loading = useSelector(state => state.task.loading);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(newTask({projectid: params.pid, boardid: params.bid, userid: localStorage.getItem('loggedin'), status: area, order: order, name: name.current.value}));
	}

	useEffect(() => {
		if (newTaskAdded) {
			name.current.value = "";
			dispatch(resetNewTaskAdded());
			dispatch(getAllTasks({projectid: params.pid, boardid: params.bid}));
			dispatch(setNewTaskModal({state: false, area: null, order: null}));
		}
	});
	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setNewTaskModal({state: false, area: null, order: null}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
						<BiTask />
						<span>New Task</span>
					</div>
					<div className='modal-body'>
						<form className='new-task' onSubmit={handleSubmit}>
							<div className='form-group'>
								<label>Task name</label>
								<input type="text" ref={name} />
							</div>
							<button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <BiTask />} Create</button>
						</form>
					</div>
					<div className='modal-footer'>
					<button onClick={() => dispatch(setNewTaskModal({state: false, area: null, order: null}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewTaskModal