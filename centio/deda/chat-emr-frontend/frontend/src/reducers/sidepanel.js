import { SET_PATIENT_DATA, SIGN_OUT, TOGGLE_SIDEPANEL } from '../actions/types';
import { SIDE_PANEL } from '../services/constants';
import SSRStorage from '../services/storage';

const storage = new SSRStorage();

const INITIAL_STATE = {
	patient: null,
	item: null,
	type: null,
	isAdmissionOpen: false,
	isIVFOpen: false,
	isAntenatalOpen: false,
	isLabourOpen: false,
	isNicuOpen: false,
	isProcedureOpen: false,
};

const sidepanel = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_SIDEPANEL:
			if (action.payload) {
				const { patient, type, item } = action.info;

				storage.setItem(SIDE_PANEL, { ...action.info });

				return {
					...state,
					patient,
					item,
					type,
					isAdmissionOpen: type === 'admission',
					isIVFOpen: type === 'ivf',
					isAntenatalOpen: type === 'antenatal',
					isLabourOpen: type === 'labour',
					isNicuOpen: type === 'nicu',
					isProcedureOpen: type === 'procedure',
				};
			}

			return {
				...state,
				patient: null,
				item: null,
				type: null,
				isAdmissionOpen: false,
				isIVFOpen: false,
				isAntenatalOpen: false,
				isLabourOpen: false,
				isNicuOpen: false,
				isProcedureOpen: false,
			};
		case SET_PATIENT_DATA:
			const patient = { ...state.patient, ...action.payload };

			storage.setItem(SIDE_PANEL, {
				patient,
				type: state.type,
				item: state.item,
			});

			return { ...state, patient };
		case SIGN_OUT:
			return {
				...state,
				patient: null,
				item: null,
				type: null,
				isAdmissionOpen: false,
				isIVFOpen: false,
				isAntenatalOpen: false,
				isLabourOpen: false,
				isNicuOpen: false,
				isProcedureOpen: false,
			};
		default:
			return state;
	}
};

export default sidepanel;
