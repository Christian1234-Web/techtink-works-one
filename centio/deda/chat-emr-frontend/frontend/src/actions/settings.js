import {
	ADD_LAB_TEST,
	SET_LAB_TESTS,
	UPDATE_LAB_TEST,
	DELETE_LAB_TEST,
	ADD_LAB_TEST_CATEGORY,
	GET_ALL_LAB_TEST_CATEGORIES,
	UPDATE_LAB_TEST_CATEGORY,
	DELETE_LAB_TEST_CATEGORY,
	ADD_SPECIALIZATION,
	GET_ALL_SPECIALIZATIONS,
	UPDATE_SPECIALIZATION,
	DELETE_SPECIALIZATION,
	LOAD_SERVICES,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DELETE_SERVICE,
	LOAD_SERVICES_CATEGORIES,
	RESET_SERVICES,
} from './types';

//Services
export const loadServiceCategories = payload => {
	return {
		type: LOAD_SERVICES_CATEGORIES,
		payload,
	};
};

export const loadServices = payload => {
	return {
		type: LOAD_SERVICES,
		payload,
	};
};

export const addService = payload => {
	return {
		type: ADD_SERVICE,
		payload,
	};
};

export const updateService = payload => {
	return {
		type: UPDATE_SERVICE,
		payload,
	};
};

export const deleteService = payload => {
	return {
		type: DELETE_SERVICE,
		payload,
	};
};

export const resetService = () => {
	return {
		type: RESET_SERVICES,
	};
};

//Lab
export const setLabTests = payload => {
	return {
		type: SET_LAB_TESTS,
		payload,
	};
};

export const addLabTest = payload => {
	return {
		type: ADD_LAB_TEST,
		payload,
	};
};

export const updateLabTest = payload => {
	return {
		type: UPDATE_LAB_TEST,
		payload,
	};
};

export const deleteLabTest = payload => {
	return {
		type: DELETE_LAB_TEST,
		payload,
	};
};

export const addLabCategory = payload => {
	return {
		type: ADD_LAB_TEST_CATEGORY,
		payload,
	};
};

export const getLabCategories = payload => {
	return {
		type: GET_ALL_LAB_TEST_CATEGORIES,
		payload,
	};
};

export const updateLabCategory = payload => {
	return {
		type: UPDATE_LAB_TEST_CATEGORY,
		payload,
	};
};

export const deleteLabCategory = payload => {
	return {
		type: DELETE_LAB_TEST_CATEGORY,
		payload,
	};
};

//Specialization
export const addSpecialization = payload => {
	return {
		type: ADD_SPECIALIZATION,
		payload,
	};
};

export const loadSpecializations = payload => {
	return {
		type: GET_ALL_SPECIALIZATIONS,
		payload,
	};
};

export const updateSpecialization = payload => {
	return {
		type: UPDATE_SPECIALIZATION,
		payload,
	};
};

export const deleteSpecialization = payload => {
	return {
		type: DELETE_SPECIALIZATION,
		payload,
	};
};
