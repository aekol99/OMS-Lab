import React, { useEffect } from 'react';
import './DeleteBoardModal.css';
import { BsArchive } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineLoading } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { setDeleteBoardModal } from '../../redux/slices/modalsSlice';
import { deleteBoard } from '../../redux/thunks/boards/deleteBoard';
import { getAllBoards } from '../../redux/thunks/boards/getAllBoards';
import { resetBoardDeleted } from '../../redux/slices/boardsSlice';

function DeleteBoardModal(props) {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const boardid = useSelector(state => state.modals.deleteBoardModal.boardid);
	const boardName = useSelector(state => state.modals.deleteBoardModal.boardName);
	const boardDeleted = useSelector(state => state.boards.boardDeleted);
	const afterDeleteTarget = useSelector(state => state.modals.deleteBoardModal.afterDeleteTarget);

	const loading = useSelector(state => state.boards.loading);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteBoard({id: boardid, projectid: params.pid}));
	}
	useEffect(() => {
		if (boardDeleted) {
			console.log("board successfully deleted");
			if (Number(boardid) === Number(params.bid)) {
				navigate(`/project/${params.pid}/${afterDeleteTarget}/${params.tab}`);
			}
			dispatch(getAllBoards({id: params.pid}));
			dispatch(resetBoardDeleted());
			dispatch(setDeleteBoardModal({state: false}));
		}
	}, [boardDeleted]);

	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setDeleteBoardModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>Delete Board</span>
					</div>
					<div className='modal-body'>
						<form className='delete-board' onSubmit={handleSubmit}>
							Are you sure you want to delete the board <b>{boardName}</b>?
							<button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <RiDeleteBin6Line />} Yes, I'm sure.</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setDeleteBoardModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteBoardModal