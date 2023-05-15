import { SET_PATIENT_DATA, TOGGLE_SIDEPANEL } from './types';

export const toggleSidepanel = (status, info) => {
	return {
		type: TOGGLE_SIDEPANEL,
		payload: status,
		info,
	};
};

export const setPatientData = data => {
	return {
		type: SET_PATIENT_DATA,
		payload: data,
	};
};
