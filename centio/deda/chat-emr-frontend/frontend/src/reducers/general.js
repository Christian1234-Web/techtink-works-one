import {
	TOGGLE_PRELOADING,
	SIGN_OUT,
	TOGGLE_CONNECTED,
	TOGGLE_IS_MODAL,
	TOGGLE_MODAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	CREAE_NEW_DRUG,
	CREATE_NEW_GENERIC,
	TOGGLE_CHAT_INBOX,
} from '../actions/types';

const INITIAL_STATE = {
	preloading: true,
	is_modal_open: false,
	is_modal: false,
	socket_connected: false,
	view_payroll_history: false,
	current_payroll: false,
	edit_payroll: false,
	payroll_id: null,
	payroll_staff: null,
	staff: null,
	create_new_drug: false,
	create_new_generic: false,
	inbox_visible: false,
};

const general = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_PRELOADING:
			return { ...state, preloading: action.payload };
		case TOGGLE_CONNECTED:
			return { ...state, socket_connected: action.payload };
		case SIGN_OUT:
			return { ...state, ...INITIAL_STATE, preloading: false };
		case TOGGLE_IS_MODAL:
			return { ...state, is_modal: action.payload };
		case TOGGLE_MODAL:
			return { ...state, is_modal_open: action.payload };
		case TOGGLE_VIEW_PAYROLL_HISTORY:
			return {
				...state,
				view_payroll_history: action.payload,
				payroll_staff: action.staff,
			};
		case TOGGLE_VIEW_CURRENT_PAYROLL:
			return {
				...state,
				current_payroll: action.payload,
				payroll_id: action.id,
			};
		case TOGGLE_EDIT_PAYROLL:
			return { ...state, edit_payroll: action.payload, payroll_id: action.id };

		case CREAE_NEW_DRUG:
			return { ...state, create_new_drug: action.payload };
		case CREATE_NEW_GENERIC:
			return { ...state, create_new_generic: action.payload };
		case TOGGLE_CHAT_INBOX:
			return { ...state, inbox_visible: action.payload };
		default:
			return state;
	}
};

export default general;
