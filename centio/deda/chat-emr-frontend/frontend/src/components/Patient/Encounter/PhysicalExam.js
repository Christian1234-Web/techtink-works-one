import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
	defaultEncounter,
	physicalExamination,
	CK_ENCOUNTER,
} from '../../../services/constants';
import { updateEncounterData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const PhysicalExam = ({ next, previous, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [system, setSystem] = useState(null);
	const [options, setOptions] = useState([]);
	const [examNote, setExamNote] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

	const saveOptions = useCallback(
		data => {
			setOptions(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						physicalExamination: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const saveNote = useCallback(
		data => {
			setExamNote(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						physicalExaminationNote: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);

		const examsData =
			data && data.patient_id === patient.id
				? data?.encounter?.physicalExamination
				: null;

		const noteData =
			data && data.patient_id === patient.id
				? data?.encounter?.physicalExaminationNote
				: null;

		saveOptions(examsData || defaultEncounter.physicalExamination);
		saveNote(noteData || defaultEncounter.physicalExaminationNote);
	}, [patient, saveNote, saveOptions]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const handleChange = e => setSystem(e);

	const onChecked = (e, label) => {
		const value = e.target.value;
		const selected = options.find(o => o.value === value);
		if (selected) {
			removeItem(value);
		} else {
			const items = [...options, { label, value }];
			saveOptions(items);
		}
	};

	const removeItem = value => {
		const filtered = options.filter(o => o.value !== value);
		saveOptions(filtered);
	};

	const onSubmit = () => {
		dispatch(
			updateEncounterData(
				{
					...encounter,
					physicalExamination: options,
					physicalExaminationNote: examNote,
				},
				patient.id
			)
		);
		next();
	};

	const divStyle = {
		minHeight: '180px',
	};

	return (
		<div className="form-block encounter">
			{options.length > 0 && (
				<div className="rentals-list-w">
					<div className="filter-side">
						<div className="filter-w">
							<div className="filter-body p-2">
								<span className="select2 select2-container select2-container--default">
									<span className="selection">
										<span className="select2-selection select2-selection--multiple">
											<ul className="select2-selection__rendered">
												{options.map((item, i) => {
													return (
														<li className="select2-selection__choice" key={i}>
															<span
																className="select2-selection__choice__remove pointer"
																role="presentation"
																onClick={() => removeItem(item.value)}
															>
																×
															</span>
															{`${item.label}: ${item.value}`}
														</li>
													);
												})}
											</ul>
										</span>
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
			<div style={divStyle}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<Select
								options={physicalExamination}
								defaultValue={system}
								onChange={e => handleChange(e)}
								value={system}
							/>
						</div>
					</div>
				</div>
				{system && (
					<div className="row">
						<div className="col-sm-12">
							<div className="form-group">
								<label>{system.label}</label>
								{system.children.map((option, i) => {
									const selected = options.find(o => o.value === option);
									return (
										<div key={i}>
											<label>
												<input
													type="checkbox"
													name="selectedPhysicalExam"
													className="form-control"
													value={option}
													checked={!!selected}
													onChange={e => onChecked(e, system.label)}
												/>
												{option}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Note</label>
							<textarea
								placeholder="Enter note"
								name="exam_note"
								className="form-control"
								cols="3"
								onChange={e => saveNote(e.target.value)}
								value={examNote}
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-sm-12 d-flex space-between">
					<button className="btn btn-primary" onClick={() => previous()}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={() => onSubmit()}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PhysicalExam;
