import React from 'react';
import './Modal.css';

function Modal({modal}) {
	if(!modal.state) return null;
	return (
		<div className="modal" onClick={() => modal.action(false)}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<h1>Create New Board</h1>
					<h3>Modal body</h3>
					<button onClick={() => modal.action(false)}>Close</button>
				</div>
			</div>
		</div>
	)
}

export default Modal