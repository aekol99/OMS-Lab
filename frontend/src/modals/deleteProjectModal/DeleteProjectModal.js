import React, { useEffect } from 'react';
import './DeleteProjectModal.css';
import { BsArchive } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { setDeleteProjectModal } from '../../redux/slices/modalsSlice';
import { resetProjectDeleted } from '../../redux/slices/projectsSlice';
import { getAllProjects } from '../../redux/thunks/projects/getAllProjects';
import { deleteProject } from '../../redux/thunks/projects/deleteProject';


function DeleteProjectModal(props) {
	const dispatch = useDispatch();

	const projectid = useSelector(state => state.modals.deleteProjectModal.projectid);
	const projectName = useSelector(state => state.modals.deleteProjectModal.projectName);
	const projectDeleted = useSelector(state => state.projects.projectDeleted);
	const error = useSelector(state => state.projects.error);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteProject({projectid}));
	}
	useEffect(() => {
		console.log("Project successfully deleted");
		if (projectDeleted) {
			console.log("Project successfully deleted");

			dispatch(getAllProjects({filter: 'created_at', order: 'desc'}));
			dispatch(resetProjectDeleted());
			dispatch(setDeleteProjectModal({state: false, projectid: null}));
		}
	}, [projectDeleted]);

	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setDeleteProjectModal({state: false, projectid: null}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>Delete Project</span>
					</div>
					<div className='modal-body'>
						<form className='delete-project' onSubmit={handleSubmit}>
							Are you sure you want to delete the Project <b>{projectName ? projectName : ""}</b>?
							<button type='submit'>Yes, I'm sure.</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setDeleteProjectModal({state: false, projectid: null}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteProjectModal