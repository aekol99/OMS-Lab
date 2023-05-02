import React, { useRef, useEffect } from 'react';
import './NewProjectModal.css';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsArchive } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { setNewProjectModal } from '../../redux/slices/modalsSlice';
import { newProject } from '../../redux/thunks/projects/newProject';
import { setProjectsUpdated } from '../../redux/slices/projectsSlice';

import TeamMember from './TeamMember';
import { getAllTeamMembers } from '../../redux/thunks/projects/getAllTeamMembers';
import { resetProjectCreated } from '../../redux/slices/projectsSlice';
import { resetError } from '../../redux/slices/projectsSlice';

import { clearAddedTeamMembers } from '../../redux/slices/projectsSlice';

import { searchUsers } from '../../redux/thunks/projects/searchUsers';

function NewProjectModal(props) {
	const dispatch = useDispatch();
	const teamMembers = useSelector(state => state.projects.teamMembers);
	const addedTeamMembers = useSelector(state => state.projects.addedTeamMembers);

	const name = useRef("");
	const description = useRef("");
	const projectCreatedMsg = useRef("");
	const projectNotCreatedMsg = useRef("");
	
	const projectCreated = useSelector(state => state.projects.projectCreated);
	const projectCreatedError = useSelector(state => state.projects.error);
	const loading = useSelector(state => state.projects.loading);

	const modalOpened = useSelector(state => state.modals.newProjectModal.state);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(newProject({owner: localStorage.getItem('loggedin'), name: name.current.value, description: description.current.value, members: addedTeamMembers.map(member => member.id)}));
	}
	const getAllTeamMembersPromise = useRef(null);
	useEffect(() => {
		if (projectCreated) {
			name.current.value = "";
            description.current.value = "";
            projectNotCreatedMsg.current.classList.remove('done');
            projectCreatedMsg.current.classList.add('done');
            dispatch(resetProjectCreated());
			dispatch(setProjectsUpdated());
			dispatch(clearAddedTeamMembers());
		}
		if (projectCreatedError && modalOpened) {
            projectCreatedMsg.current.classList.remove('done');
            projectNotCreatedMsg.current.classList.add('done');
            dispatch(resetError());
        }
		
		if (modalOpened) {
			getAllTeamMembersPromise.current = dispatch(getAllTeamMembers());
			console.log("new project modal executed");
		}
		
		// return () => {
		// 	if (getAllTeamMembersPromise.current) {
		// 		getAllTeamMembersPromise.current.abort();
		// 	}
		// }
	}, [projectCreated, projectCreatedError, modalOpened]);

	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setNewProjectModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>New Project</span>
					</div>
					<div className='modal-body'>
						<form className='new-project' onSubmit={handleSubmit}>
							<span className='project-created-msg' ref={projectCreatedMsg}>Project Created Successfully</span>
							<span className='project-not-created-msg' ref={projectNotCreatedMsg}>Sorry, Something Went Wrong</span>
							<div className='form-group'>
								<label>Project name</label>
								<input type="text" ref={name} />
							</div>
							<div className='form-group'>
								<label>Project description</label>
								<input type="text" ref={description} />
							</div>
							<div className='add-team-members'>
								<p>Add Team Members</p>
								<div className='search-bar'>
									<input type="text" onChange={(e) => dispatch(searchUsers({pattern: e.target.value}))} />
									<BsSearch />
								</div>
								<ul>
									{(teamMembers && teamMembers.length > 0) ? teamMembers.map((member, i) => <TeamMember data={member} key={i} type="searched" />) : "Nothing found!" }
								</ul>
								<p className='added-members-label'>Added Members</p>
								<ul className='added-members'>
									{addedTeamMembers.length > 0 ? addedTeamMembers.map((member, i) => <TeamMember data={member} key={i} type="added" />) : "Please add some members!" }
								</ul>
							</div>
							<button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <BsArchive /> }Create</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setNewProjectModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewProjectModal