import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { formatCurrency, request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifyError } from '../../../services/notify';
import { updateAssessmentData } from '../../../actions/patient';

const LabInvestigation = ({ previous, next, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [groups, setGroups] = useState([]);
	const [selectedTests, setSelectedTests] = useState([]);
	const [urgentLab, setUrgentLab] = useState(false);
	const [labNote, setLabNote] = useState('');

	const dispatch = useDispatch();

	const assessment = useSelector(state => state.patient.assessmentData);

	const fetchLabCombo = useCallback(async () => {
		try {
			dispatch(startBlock());

			try {
				const url = 'lab-tests/groups';
				const rs = await request(url, 'GET', true);
				setGroups(rs);
			} catch (e) {
				notifyError('Error fetching lab groups');
			}

			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error fetching groups');
			dispatch(stopBlock());
		}
	}, [dispatch]);

	const retrieveData = useCallback(async () => {
		const labRequest = assessment.labRequest;

		setUrgentLab(labRequest?.urgent || false);
		setLabNote(labRequest?.request_note || '');

		const labs = labRequest ? [...labRequest.tests] : [];

		setSelectedTests(labs);
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			fetchLabCombo();
			retrieveData();
			setLoaded(true);
		}
	}, [fetchLabCombo, loaded, retrieveData]);

	const getLabTests = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `lab-tests?q=${q}`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	const onDispatchLab = (items, obj) => {
		const labRequest = {
			requestType: 'labs',
			patient_id: patient.id,
			tests: [...items],
			request_note: obj?.note || '',
			urgent: obj?.urgent || false,
			pay_later: 0,
		};

		dispatch(updateAssessmentData({ ...assessment, labRequest }, patient.id));
	};

	const onSubmit = e => {
		e.preventDefault();
		const labRequest = {
			requestType: 'labs',
			patient_id: patient.id,
			tests: [...selectedTests],
			request_note: labNote,
			urgent: urgentLab,
			pay_later: 0,
		};
		dispatch(updateAssessmentData({ ...assessment, labRequest }, patient.id));
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Lab Group</label>
						<Select
							name="lab_group"
							placeholder="Select Lab Group"
							options={groups}
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								const items = [
									...selectedTests,
									...e.tests.map(t => ({ ...t.labTest })),
								];
								setSelectedTests(items);
								onDispatchLab(items, { note: labNote, urgent: urgentLab });
							}}
						/>
					</div>
					<div className="form-group col-sm-6">
						<label>Lab Test</label>
						<AsyncSelect
							isMulti
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option =>
								`${option.name} (${option.category.name})`
							}
							defaultOptions
							value={selectedTests}
							name="lab_test"
							loadOptions={getLabTests}
							onChange={e => {
								if (e) {
									setSelectedTests(e);
								} else {
									setSelectedTests([]);
								}
								onDispatchLab(e || [], { note: labNote, urgent: urgentLab });
							}}
							placeholder="Search Lab Test"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedTests.map((lab, i) => (
							<span
								className={`badge badge-${
									lab ? 'info' : 'danger'
								} text-white ml-2`}
								key={i}
							>{`${lab.name}: ${formatCurrency(
								lab?.service?.tariff || 0
							)}`}</span>
						))}
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<div className="form-group">
							<label>Lab Request Note</label>
							<textarea
								className="form-control"
								name="lab_request_note"
								rows="3"
								placeholder="Enter request note"
								onChange={e => {
									setLabNote(e.target.value);
									onDispatchLab(selectedTests, {
										note: e.target.value,
										urgent: urgentLab,
									});
								}}
								value={labNote}
							></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-4">
						<div className="form-check col-sm-12">
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="lab_urgent"
									type="checkbox"
									checked={urgentLab}
									onChange={e => {
										setUrgentLab(!urgentLab);
										onDispatchLab(selectedTests, {
											note: labNote,
											urgent: !urgentLab,
										});
									}}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LabInvestigation;
