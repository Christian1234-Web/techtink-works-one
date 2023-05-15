import {
	LOAD_VITALS,
	UPDATE_VITALS,
	PATIENT_IVF,
	READING_DONE,
	UPDATE_ENCOUNTER_DATA,
	RESET_ENCOUNTER_DATA,
	UPDATE_SOAP_DATA,
	UPDATE_ASSESSMENT_DATA,
} from './types';

export const readingDone = data => {
	return {
		type: READING_DONE,
		payload: data,
	};
};

// vitals
export const loadVitals = data => {
	return {
		type: LOAD_VITALS,
		payload: data,
	};
};

export const updateVitals = data => {
	return {
		type: UPDATE_VITALS,
		payload: data,
	};
};

export const loadPatientIVFForm = data => {
	return {
		type: PATIENT_IVF,
		payload: data,
	};
};

export const updateEncounterData = (data, pid) => {
	return {
		type: UPDATE_ENCOUNTER_DATA,
		payload: data,
		patient_id: pid,
	};
};

export const updateSoapData = data => {
	return {
		type: UPDATE_SOAP_DATA,
		payload: data,
	};
};

export const resetEncounterData = data => {
	return {
		type: RESET_ENCOUNTER_DATA,
		payload: data,
	};
};

export const updateAssessmentData = (data, pid) => {
	return {
		type: UPDATE_ASSESSMENT_DATA,
		payload: data,
		patient_id: pid,
	};
};
