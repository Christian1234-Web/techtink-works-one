import {
	TOGGLE_PRELOADING,
	TOGGLE_CONNECTED,
	TOGGLE_MODAL,
	TOGGLE_IS_MODAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	CREAE_NEW_DRUG,
	CREATE_NEW_GENERIC,
	TOGGLE_CHAT_INBOX,
} from './types';

export const toggleChat = status => {
	return {
		type: TOGGLE_CHAT_INBOX,
		payload: status,
	};
};

export const createNewGeneric = status => {
	return {
		type: CREATE_NEW_GENERIC,
		payload: status,
	};
};

export const setConnection = status => {
	return {
		type: TOGGLE_CONNECTED,
		payload: status,
	};
};

export const createNewDrug = status => {
	return {
		type: CREAE_NEW_DRUG,
		payload: status,
	};
};

export const togglePreloading = status => {
	return {
		type: TOGGLE_PRELOADING,
		payload: status,
	};
};

export const toggleIsModal = status => {
	return {
		type: TOGGLE_IS_MODAL,
		payload: status,
	};
};

export const toggleModal = status => {
	return {
		type: TOGGLE_MODAL,
		payload: status,
	};
};

// payroll
export const toggleViewPayrollHistory = (status, staff) => {
	return {
		type: TOGGLE_VIEW_PAYROLL_HISTORY,
		payload: status,
		staff,
	};
};

export const toggleCurrentPayroll = (status, id) => {
	return {
		type: TOGGLE_VIEW_CURRENT_PAYROLL,
		payload: status,
		id,
	};
};

export const toggleEditPayroll = (status, id) => {
	return {
		type: TOGGLE_EDIT_PAYROLL,
		payload: status,
		id,
	};
};

// close modals
export const closeModals = () => {
	return dispatch => {
		dispatch(toggleModal(false));
		dispatch(toggleViewPayrollHistory(false));
		dispatch(toggleCurrentPayroll(false));
		dispatch(toggleEditPayroll(false));
	};
};

export const closeCurrentPayRoll = is_modal => {
	return dispatch => {
		if (!is_modal) {
			dispatch(toggleModal(false));
		}
		dispatch(toggleCurrentPayroll(false, null));
	};
};

export const closeEditPayRoll = is_modal => {
	return dispatch => {
		if (!is_modal) {
			dispatch(toggleModal(false));
		}
		dispatch(toggleEditPayroll(false, null));
	};
};

export const viewPayrollHistory = (action, staff) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleViewPayrollHistory(action, staff));
	};
};

export const viewCurrentPayroll = (action, isModal, id) => {
	return dispatch => {
		if (!isModal) {
			dispatch(closeModals());
			dispatch(toggleModal(true));
		}
		dispatch(toggleIsModal(isModal ? true : false));
		dispatch(toggleCurrentPayroll(action, id));
	};
};

export const viewEditPayroll = (action, isModal, id) => {
	return dispatch => {
		dispatch(toggleIsModal(isModal ? true : false));
		dispatch(toggleEditPayroll(action, id));
	};
};
