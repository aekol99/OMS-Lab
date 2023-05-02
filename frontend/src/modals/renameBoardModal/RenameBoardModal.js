import React, { useRef, useState, useEffect } from 'react';
import './RenameBoardModal.css';
import { BsArchive } from 'react-icons/bs';
import { BiRename } from 'react-icons/bi';
import { AiOutlineLoading } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { setRenameBoardModal } from '../../redux/slices/modalsSlice';
import { renameBoard } from '../../redux/thunks/boards/renameBoard';
import { useParams } from 'react-router-dom';
import { getAllBoards } from '../../redux/thunks/boards/getAllBoards';

function RenameBoardModal(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const boardid = useSelector(state => state.modals.renameBoardModal.boardid);
	const boardName = useSelector(state => state.modals.renameBoardModal.boardName);
	const boardRenamed = useSelector(state => state.boards.boardRenamed);
	const [newname, setNewName] = useState("");

	const loading = useSelector(state => state.boards.loading);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(renameBoard({id: boardid, newname, projectid: params.pid}));
	}

	useEffect(() => {
		if (boardRenamed) {
			console.log("board successfully renamed");
			dispatch(getAllBoards({id: params.pid}));
			dispatch(setRenameBoardModal({state: false, boardid: null, boardName: ""}))
		}
	}, [boardRenamed]);

	useEffect(() => {
		if (boardName) {
			setNewName(boardName);
		}
	}, [boardName]);

	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setRenameBoardModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>Rename Board</span>
					</div>
					<div className='modal-body'>
						<form className='rename-board' onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Project name</label>
								<input type="text" value={newname} onChange={(e)=>{setNewName(e.target.value)}} />
							</div>
							<button type="submit">{loading ? <span className='loading'><AiOutlineLoading /></span> : <BiRename />} Rename</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setRenameBoardModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RenameBoardModal