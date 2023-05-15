/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { updateSoapData } from '../../actions/patient';
import {
	patientAPI,
	diagnosisAPI,
	diagnosisType,
	CK_DIAGNOSIS,
} from '../../services/constants';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { ReactComponent as TrashIcon } from '../../assets/svg-icons/trash.svg';
import SSRStorage from '../../services/storage';

const storage = new SSRStorage();

const Diagnosis = ({ previous, next, patient }) => {
	const { register, reset } = useForm();
	const [loaded, setLoaded] = useState(false);
	const [diagnoses, setDiagnoses] = useState([]);
	const [existingDiagnoses, setExistingDiagnoses] = useState([]);
	const [diagnosis, setDiagnosis] = useState('');
	const [type, setType] = useState('');
	const [comment, setComment] = useState('');

	const encounter = useSelector(state => state.patient.soapData);

	const dispatch = useDispatch();

	const fetchDiagnoses = useCallback(async () => {
		try {
			const url = `${patientAPI}/${patient.id}/diagnoses?status=Active&group_by=code`;
			const rs = await request(url, 'GET', true);
			setExistingDiagnoses(rs);
		} catch (error) {
			console.log(error);
			notifyError('Could not fetch diagnoses for the patient');
		}
	}, [patient]);

	const saveDiagnoses = useCallback(
		data => {
			setDiagnoses(data);
			storage.setLocalStorage(CK_DIAGNOSIS, data);

			dispatch(updateSoapData({ ...encounter, diagnosis: data }));
		},
		[dispatch, encounter]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_DIAGNOSIS);
		saveDiagnoses(data || encounter.diagnosis);
	}, [encounter, saveDiagnoses]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
			fetchDiagnoses();
		}
	}, [fetchDiagnoses, loaded, retrieveData]);

	const remove = index => {
		const newItems = diagnoses.filter((item, i) => index !== i);
		saveDiagnoses(newItems);
	};

	const onSubmit = () => {
		if (diagnosis !== '' && type !== '') {
			const items = [...diagnoses, { id: null, comment, diagnosis, type }];
			saveDiagnoses(items);

			setDiagnosis('');
			setComment('');
			setType('');
			reset();
		} else {
			notifyError('Error, please complete the diagnoses form');
		}
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (${option.type}: ${option.code})`;

	const getOptions = async q => {
		if (!q || (q && q.length <= 1)) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);

		return res;
	};

	const onSelect = (e, diagnosis) => {
		const selected = diagnoses.find(o => o.id && o.id === diagnosis.id);
		if (selected) {
			const filtered = diagnoses.filter(o => o.id && o.id !== diagnosis.id);
			saveDiagnoses(filtered);
		} else {
			const items = [
				...diagnoses,
				{ ...diagnosis, type: { value: diagnosis.diagnosis_type } },
			];
			saveDiagnoses(items);
		}
	};

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			onSubmit();
		}
	};

	const onNext = () => {
		dispatch(updateSoapData({ ...encounter, diagnosis: [...diagnoses] }));
		dispatch(next);
	};

	return (
		<div className="form-block encounter">
			<div className="row">
				<div className="col-md-7">
					<form>
						<div className="row">
							<div className="col-sm-10">
								<div className="form-group">
									<label>Diagnosis</label>
									<AsyncSelect
										required
										getOptionValue={getOptionValues}
										getOptionLabel={getOptionLabels}
										defaultOptions
										name="diagnosis"
										loadOptions={getOptions}
										value={diagnosis}
										onChange={e => {
											setDiagnosis(e);
										}}
										placeholder="Enter the diagnosis name or ICD-10/ICPC-2 code"
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Type</label>
									<Select
										placeholder="Select Type"
										ref={register}
										options={diagnosisType}
										value={type}
										onChange={e => {
											setType(e);
										}}
									/>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="form-group">
									<label>Comment</label>
									<input
										className="form-control"
										placeholder="Comment"
										type="text"
										value={comment}
										onChange={e => setComment(e.target.value)}
										ref={register}
										onKeyDown={handleKeyDown}
										name="comment"
									/>
								</div>
							</div>
							<div className="col-sm-2" style={{ position: 'relative' }}>
								<a
									className="btn btn-info btn-sm text-white pointer"
									style={{ margin: '40px 0 0', display: 'block' }}
									onClick={() => onSubmit()}
								>
									<i className="os-icon os-icon-plus-circle" /> Add
								</a>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-5">
					<div className="allergen-block">
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label>Existing Diagnosis</label>
								</div>
							</div>
						</div>
						<div className="row">
							{existingDiagnoses.map((item, i) => {
								const value = diagnoses.find(o => o.id && o.id === item.id);
								return (
									<div className="col-md-12" key={i}>
										<div className="form-group history-item">
											<label>
												{`${item.diagnosis?.type} (${item.diagnosis?.code}): ${item.diagnosis?.description}`}
											</label>
											<div>
												<input
													type="checkbox"
													className="form-control"
													checked={value && value.id === item.id}
													onChange={e => onSelect(e, item)}
													value={item}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="element-box p-3 m-0 mt-3 w-100">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Diagnosis</th>
								<th>Type</th>
								<th>Comment</th>
								<th nowrap="nowrap" className="text-center"></th>
							</tr>
						</thead>
						<tbody>
							{diagnoses.map((item, i) => {
								return (
									<tr key={i}>
										<td>{`${item.diagnosis.type} (${item.diagnosis.code}): ${item.diagnosis.description}`}</td>
										<td>{item.type.value}</td>
										<td>{item.comment}</td>
										<td>
											<div className="display-flex">
												<div className="ml-2">
													<TrashIcon
														onClick={() => remove(i)}
														style={{
															width: '1rem',
															height: '1rem',
															cursor: 'pointer',
														}}
													/>
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<div className="row mt-5">
				<div className="col-sm-12 d-flex space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={onNext}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Diagnosis;
