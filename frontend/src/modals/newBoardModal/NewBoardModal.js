import React, { useRef, useEffect } from 'react';
import './NewBoardModal.css';
import { BsArchive } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNewBoardModal } from '../../redux/slices/modalsSlice';
import { newBoard } from '../../redux/thunks/boards/newBoard';
import { getAllBoards } from '../../redux/thunks/boards/getAllBoards';
import { resetBoardCreated } from '../../redux/slices/boardsSlice';
import { AiOutlineLoading } from 'react-icons/ai';

function NewBoardModal(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const boardCreated = useSelector(state => state.boards.boardCreated);
	const loading = useSelector(state => state.boards.loading);
	const name = useRef("");

	const handleNewBoard = (e) => {
		e.preventDefault();
		dispatch(newBoard({name: name.current.value, projectid: params.pid}));
	}

	useEffect(() => {
		if (boardCreated) {
			name.current.value = "";
			dispatch(getAllBoards({id: params.pid}));
			dispatch(resetBoardCreated());
		}
	}, [boardCreated]);

	if(!props.state) return null;

	return (
		<div className="modal" onClick={() => dispatch(setNewBoardModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<BsArchive />
						<span>New Board</span>
					</div>
					<div className='modal-body'>
						<form className='new-board' onSubmit={handleNewBoard}>
							<div className='form-group'>
								<label>Board name</label>
								<input type="text"  ref={name} />
							</div>
							<button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <BsArchive />} Create</button>
						</form>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setNewBoardModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewBoardModal