import React, { useEffect, useRef } from 'react';
import './ProjectSearchModal.css';
import { BsSearch } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { setProjectSearchModal } from '../../redux/slices/modalsSlice';
import SearchProject from './SearchProject';
import { searchProjects } from '../../redux/thunks/projects/searchProjects';

function ProjectSearchModal(props) {
	const dispatch = useDispatch();
	const searchResults = useSelector(state => state.projects.searchResults);
	const searchProjectsPromise = useRef(null);
	const modalOpened = useSelector(state => state.modals.projectSearchModal.state);
	useEffect(() => {
		if (modalOpened) {
			console.log("project search executed");
			searchProjectsPromise.current = dispatch(searchProjects({pattern: ''}));
		}
		return () => {
			if (searchProjectsPromise.current) {
				searchProjectsPromise.current.abort();
			}
		}
	}, [modalOpened]);

	if(!props.state) {document.body.style.overflow = 'auto'; return null}
	document.body.style.overflow = 'hidden';

	return (
		<div className="modal" onClick={() => dispatch(setProjectSearchModal({state: false}))} >
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()} >
					<div className='modal-header'>
						<BsSearch />
						<span>Search project</span>
					</div>
					<div className='modal-body'>
						<form className='search-project'>
							<p>Search</p>
							<div className='search-bar'>
								<input type="text" onChange={(e) => dispatch(searchProjects({pattern: e.target.value}))} />
								<BsSearch />
							</div>
							<ul>
								{searchResults ? searchResults.map((project, i) => <SearchProject key={i} data={project} />) : null}
							</ul>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setProjectSearchModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectSearchModal