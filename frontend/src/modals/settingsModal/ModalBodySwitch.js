import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSettingsModalSection } from '../../redux/slices/modalsSlice';

import NewUserSection from './NewUserSection';
import UsersList from './UsersList';
import AreYouSure from './AreYouSure';
import ChangePassword from './ChangePassword';

function ModalBodySwitch(props) {
	const dispatch = useDispatch();
	const isAdmin = useSelector(state => state.auth.isAdmin);

	const modalSection = useSelector(state => state.modals.settingsModal.section);

	if (modalSection === 'manage-users') {
		return <UsersList />
	}
	if (modalSection === 'change-password') {
		return <ChangePassword />
	}
	if (modalSection === 'add-user') {
		return <NewUserSection />
	}
	if (modalSection === 'are-you-sure') {
		return <AreYouSure />
	}
	return (
		<ul className='modal-options'>

				{ isAdmin ? <li onClick={() => dispatch(setSettingsModalSection({section: "manage-users"}))}>Manage users</li> : null}
				<li onClick={() => dispatch(setSettingsModalSection({section: "change-password"}))}>Change password</li>
		</ul>
	)
}

export default ModalBodySwitch