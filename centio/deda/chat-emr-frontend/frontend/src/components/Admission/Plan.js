import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';

import { updateSoapData, resetEncounterData } from '../../actions/patient';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import {
	admissionAPI,
	defaultEncounter,
	CK_COMPLAINTS,
	CK_REVIEW_OF_SYSTEMS,
	CK_PAST_HISTORY,
	CK_TREATMENT_PLAN,
	CK_DIAGNOSIS,
} from '../../services/constants';
import SSRStorage from '../../services/storage';
import { Field } from 'react-final-form';

const storage = new SSRStorage();

const Plan = ({ previous, patient, closeModal, item_id, module }) => {
	const [loaded, setLoaded] = useState(false);
	const [treatmentPlan, setTreatmentPlan] = useState('');

	const encounter = useSelector(state => state.patient.soapData);

	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState([{ name: '' }]);

	let handleChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};

	let addFormFields = () => {
		setFormValues([...formValues, { name: '' }]);
	};

	let removeFormFields = i => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	};

	let handleSubmit = event => {
		event.preventDefault();
		alert(JSON.stringify(formValues));
	};

	const saveTreatmentPlan = useCallback(
		data => {
			setTreatmentPlan(data);
			storage.setLocalStorage(CK_TREATMENT_PLAN, data);

			dispatch(
				updateSoapData({
					...encounter,
					treatmentPlan: data,
				})
			);
		},
		[dispatch, encounter]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_TREATMENT_PLAN);
		saveTreatmentPlan(data || encounter.treatmentPlan);
	}, [encounter, saveTreatmentPlan]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const onSubmit = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());

			const encounterData = { ...encounter, treatmentPlan };
			dispatch(updateSoapData(encounterData));

			const detail = {
				...encounterData,
				patient_id: patient.id,
				item_id,
				type: module,
			};
			const url = `${admissionAPI}/soap`;
			const rs = await request(url, 'POST', true, detail);
			if (rs && rs.success) {
				dispatch(stopBlock());
				notifySuccess('S.O.A.P saved!');
				dispatch(resetEncounterData(defaultEncounter));

				storage.removeItem(CK_COMPLAINTS);
				storage.removeItem(CK_REVIEW_OF_SYSTEMS);
				storage.removeItem(CK_PAST_HISTORY);
				storage.removeItem(CK_TREATMENT_PLAN);
				storage.removeItem(CK_DIAGNOSIS);

				closeModal(true);
			} else {
				dispatch(stopBlock());
				notifyError('Error, could not save consultation data');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error, could not save consultation data');
		}
	};

	console.log('Mallam', formValues);

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit}>
				<label for="exampleInputEmail1">To-Do</label>
				{formValues.map((element, index) => (
					<div className="" key={index}>
						<div className="row">
							<div className="col-sm-11">
								<div className="form-group">
									{/* <label></label> */}
									<input
										class="form-control"
										id="exampleInputEmail1"
										type="text"
										name="name"
										value={element.name || ''}
										onChange={e => handleChange(index, e)}
									/>
								</div>
							</div>
							{index ? (
								<button
									type="button"
									className="button remove m-2 btn btn-info btn-sm text-white pointer"
									onClick={() => removeFormFields(index)}
								>
									<i className="os-icon os-icon-close" />
								</button>
							) : null}
						</div>
					</div>
				))}
				<div className="button-section m-2">
					<button
						className="button add"
						type="button"
						onClick={() => addFormFields()}
					>
						Add
					</button>
				</div>
			</form>
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Plan</label>
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={treatmentPlan}
								name="treatmentPlan"
								autoFocus={true}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
											'codeView',
										],
									],
								}}
								onChange={e => {
									saveTreatmentPlan(String(e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Finish
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Plan;
