import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SettingsModal.css';
import { SlSettings } from 'react-icons/sl';
import { BsArrowLeft } from 'react-icons/bs';

import { setSettingsModal } from '../../redux/slices/modalsSlice';
import { setSettingsModalSection } from '../../redux/slices/modalsSlice';

import ModalBodySwitch from './ModalBodySwitch';
import prevs from '../../data/modals/settingsModalPrevs';


function SettingsModal(props) {
	const dispatch = useDispatch();
	const modalSection = useSelector(state => state.modals.settingsModal.section);

	const closeModal = () => {
		dispatch(setSettingsModalSection({section: "options"}));
		dispatch(setSettingsModal({state: false}));
	}
	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => closeModal()}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<SlSettings />
						<span>Settings</span>
						{modalSection !== 'options' ? <button className='back-btn' onClick={() => dispatch(setSettingsModalSection({section: prevs[modalSection]}))}><BsArrowLeft />Back</button> : null}
					</div>
					<div className='modal-body settings-modal'>
						<ModalBodySwitch />
					</div>
					<div className='modal-footer'>
						<button className='close-btn' onClick={() => closeModal()}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SettingsModal