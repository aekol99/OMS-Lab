import React from 'react';
import './TaskModal.css';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenedTaskModal } from '../../redux/slices/modalsSlice';
import ModalBodySwitcher from './ModalBodySwitcher';
import { BiTask } from 'react-icons/bi';
import { setActiveSection } from '../../redux/slices/taskSlice';

function TaskModal(props) {
	const dispatch = useDispatch();
	const activeSection = useSelector(state => state.task.activeSection);
	const closeModal = () => {
		dispatch(setOpenedTaskModal({state: false, id: null}));
		dispatch(setActiveSection("options"));
	}

	if(!props.state) return null;
	return (
		<div className="modal task" onClick={closeModal}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BiTask />
						<span>Task</span>
					</div>
					<div className='modal-body'>
						{activeSection == "task-assignee" ? <button className='back-btn' onClick={() => dispatch(setActiveSection("options"))}>Back</button> : null}
						<ModalBodySwitcher />
					</div>
					<div className='modal-footer'>
						<button onClick={closeModal}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TaskModal