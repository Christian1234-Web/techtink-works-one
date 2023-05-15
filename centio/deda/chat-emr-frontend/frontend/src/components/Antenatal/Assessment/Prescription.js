import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import startCase from 'lodash.startcase';

import {
	formatCurrency,
	request,
	hasExpired,
	parseFrequency,
} from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import { notifyError } from '../../../services/notify';
import { ReactComponent as PlusIcon } from '../../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import { updateAssessmentData } from '../../../actions/patient';

const Prescription = ({ previous, next, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [generic, setGeneric] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);

	const [frequencyType, setFrequencyType] = useState('');
	const [frequency, setFrequency] = useState('');
	const [duration, setDuration] = useState('');
	const [quantity, setQuantity] = useState('');
	const [note, setNote] = useState('');
	const [refills, setRefills] = useState('');
	const [refillable, setRefillable] = useState(false);
	const [editing, setEditing] = useState(false);

	const [drugsSelected, setDrugsSelected] = useState([]);
	const [regimenNote, setRegimenNote] = useState('');

	const dispatch = useDispatch();

	const assessment = useSelector(state => state.patient.assessmentData);

	const loadGenericDrugs = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request('inventory/generics?limit=1000', 'GET', true);
			setGenericDrugs(rs.result);
			dispatch(stopBlock());
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Error while fetching generic names');
		}
	}, [dispatch]);

	const retrieveData = useCallback(() => {
		const regimenData = assessment?.pharmacyRequest;

		setDrugsSelected(regimenData?.items || []);
		setRegimenNote(regimenData?.request_note || '');
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			loadGenericDrugs();
			retrieveData();
			setLoaded(true);
		}
	}, [loadGenericDrugs, loaded, retrieveData]);

	const onDrugExpired = (drug, bypass) => {
		const expired =
			drug.batches.length > 0
				? hasExpired(drug.batches[0].expirationDate)
				: true;
		if (!expired || bypass) {
			setSelectedDrug({
				...drug,
				qty: drug.batches.reduce((total, item) => total + item.quantity, 0),
				basePrice: drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
			});
			setGeneric(drug.generic);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						setSelectedDrug({
							...drug,
							qty: drug.batches.reduce(
								(total, item) => total + item.quantity,
								0
							),
							basePrice:
								drug.batches.length > 0 ? drug.batches[0].unitPrice : 0,
						});
						setGeneric(drug.generic);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Expiration</h3>
							<p>{`${drug.name} has expired`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}
								>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}
								>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		}
	};

	const onDrugSelection = drug => {
		if (
			drug.batches.length === 0 ||
			(drug.batches.length > 0 &&
				drug.batches.reduce((total, item) => total + item.quantity, 0) === 0)
		) {
			confirmAlert({
				customUI: ({ onClose }) => {
					const continueBtn = async () => {
						onDrugExpired(drug, true);
						onClose();
					};

					const changeBtn = async () => {
						setSelectedDrug(null);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Stock</h3>
							<p>{`${drug.name} is out of stock`}</p>
							<div>
								<button
									className="btn btn-primary"
									style={{ margin: '10px' }}
									onClick={changeBtn}
								>
									Change
								</button>
								<button
									className="btn btn-secondary"
									style={{ margin: '10px' }}
									onClick={continueBtn}
								>
									Continue
								</button>
							</div>
						</div>
					);
				},
			});
		} else {
			onDrugExpired(drug, false);
		}
	};

	const saveOutput = regimens => {
		const pharmacyRequest = {
			requestType: 'drugs',
			patient_id: patient.id,
			items: regimens,
			request_note: regimenNote,
		};

		dispatch(
			updateAssessmentData({ ...assessment, pharmacyRequest }, patient.id)
		);
	};

	const saveRegimen = () => {
		if (!generic) {
			notifyError('Select generic');
			return;
		}

		const regimen = {
			generic,
			drug: selectedDrug,
			hmo_id: patient.hmo.id,
			dose_quantity: quantity,
			refills: refills && refills !== '' ? refills : 0,
			frequency,
			frequencyType: frequencyType?.value || '',
			duration,
			regimenInstruction: note,
		};

		const prescriptions = [...drugsSelected, regimen];
		setDrugsSelected(prescriptions);

		saveOutput(prescriptions);

		setGeneric(null);
		setSelectedDrug(null);
		setQuantity('');
		setRefills('');
		setFrequency('');
		setFrequencyType('');
		setDuration('');
		setNote('');
	};

	const onTrash = index => {
		const regimens = drugsSelected.filter((pharm, i) => index !== i);
		setDrugsSelected([...regimens]);
		saveOutput(regimens);
	};

	const startEdit = (item, index) => {
		onTrash(index);

		setGeneric(item.generic);
		setSelectedDrug(item.drug);
		setQuantity(item.dose_quantity);
		setRefills(item.refills);
		setFrequency(item.frequency);
		setFrequencyType({
			value: item.frequencyType,
			label: startCase(item.frequencyType),
		});
		setDuration(item.duration);
		setNote(item.regimenInstruction);

		setEditing(true);
	};

	const onSubmit = e => {
		e.preventDefault();
		saveOutput(drugsSelected);
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Drug Generic Name</label>
						<Select
							placeholder="Select generic name"
							defaultValue
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								setGeneric(e);
							}}
							value={generic}
							isSearchable={true}
							options={genericDrugs}
							name="generic_name"
						/>
					</div>
					<div className="form-group col-sm-6 relative">
						<label>Drug Name</label>
						{selectedDrug && (
							<div className="posit-top">
								<div className="row">
									<div className="col-sm-12">
										<span
											className={`badge badge-${
												selectedDrug.qty > 0 ? 'info' : 'danger'
											} text-white`}
										>{`Stock Level: ${
											selectedDrug.qty
										}; Base Price: ${formatCurrency(
											selectedDrug.basePrice
										)}`}</span>
									</div>
								</div>
							</div>
						)}
						<Select
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							name="drugId"
							options={generic?.drugs || []}
							value={selectedDrug}
							onChange={e => {
								if (e) {
									onDrugSelection(e);
								} else {
									setSelectedDrug(null);
								}
							}}
							placeholder="select a drug"
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-3">
						<label>Dose Quantity</label>
						<input
							type="text"
							className="form-control"
							placeholder="Dose Quantity"
							name="quantity"
							value={quantity}
							onChange={e => setQuantity(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency</label>
						<input
							type="number"
							className="form-control"
							placeholder="Frequency eg 3"
							name="frequency"
							value={frequency}
							onChange={e => setFrequency(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency Type</label>
						<Select
							placeholder="Frequency type"
							name="frequencyType"
							value={frequencyType}
							options={[
								{ value: '', label: 'Select frequency' },
								{ value: 'as-needed', label: 'As Needed' },
								{ value: 'at-night', label: 'At Night' },
								{ value: 'immediately', label: 'Immediately' },
								{
									value: 'hourly',
									label: 'Hourly',
								},
								{ value: 'daily', label: 'Daily' },
								{
									value: 'weekly',
									label: 'Weekly',
								},
								{
									value: 'monthly',
									label: 'Monthly',
								},
								{ value: 'quarterly', label: 'Quarterly' },
								{ value: 'stat', label: 'Stat' },
							]}
							onChange={e => {
								setFrequencyType(e);
							}}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Duration</label>
						<input
							type="number"
							className="form-control"
							placeholder={`(value in ${
								frequencyType?.value || 'daily'
							}) eg: 3`}
							name="duration"
							value={duration}
							onChange={e => setDuration(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<label>Note</label>
						<input
							type="text"
							className="form-control"
							placeholder="Regimen line instruction"
							name="regimen_instruction"
							value={note}
							onChange={e => setNote(e.target.value)}
						/>
					</div>
					<div className="form-group col-sm-4">
						{refillable && (
							<>
								<label>Number of refills</label>
								<input
									type="number"
									className="form-control"
									placeholder="Number of refills"
									name="refills"
									value={refills}
									onChange={e => setRefills(e.target.value)}
								/>
							</>
						)}
					</div>
					<div className="form-group col-sm-2" style={{ textAlign: 'right' }}>
						<label className="form-check-label">
							<input
								className="form-check-input mt-0"
								name="urgent"
								type="checkbox"
								checked={refillable}
								onChange={() => setRefillable(!refillable)}
							/>{' '}
							Refillable
						</label>
					</div>
				</div>
				<div className="row">
					{!editing ? (
						<div className="form-group col-sm-3">
							<a
								onClick={saveRegimen}
								style={{
									backgroundColor: 'transparent',
									border: 'none',
									cursor: 'pointer',
								}}
							>
								<PlusIcon
									style={{
										width: '1.5rem',
										height: '1.5rem',
										cursor: 'pointer',
									}}
								/>
							</a>
						</div>
					) : (
						<div className="col-sm-12 mt-4">
							<a onClick={saveRegimen} className="btn btn-primary">
								Done
							</a>
						</div>
					)}
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="element-box p-3 m-0 mt-3 w-100">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Generic Name</th>
										<th>Drug Name</th>
										<th>Summary</th>
										<th nowrap="nowrap" className="text-left">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{drugsSelected.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.generic?.name || '--'}</td>
												<td>{item.drug?.name || '--'}</td>
												<td>
													<div className="badge badge-dark">{`${
														item.dose_quantity
													} - ${item.frequency}x ${
														item.frequencyType === 'as-needed' ||
														item.frequencyType === 'immediately'
															? ''
															: item.frequencyType
													} ${parseFrequency(
														item.frequencyType,
														item.duration
													)}`}</div>
												</td>
												<td>
													<div className="display-flex">
														<div>
															<EditIcon
																onClick={() => {
																	if (editing) {
																		return;
																	} else {
																		startEdit(item, i);
																	}
																}}
																style={{
																	width: '1rem',
																	height: '1rem',
																	cursor: 'pointer',
																}}
															/>
														</div>
														<div className="ml-2">
															<TrashIcon
																onClick={() => onTrash(i)}
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
				</div>
				<div className="row">
					<div className="form-group col-sm-12">
						<textarea
							className="form-control"
							name="regimen_note"
							rows="3"
							placeholder="Regimen note"
							onChange={e => {
								setRegimenNote(e.target.value);
								const pharmacyRequest = {
									requestType: 'drugs',
									patient_id: patient.id,
									items: drugsSelected,
									request_note: e.target.value,
								};

								dispatch(
									updateAssessmentData(
										{ ...assessment, pharmacyRequest },
										patient.id
									)
								);
							}}
							value={regimenNote}
						></textarea>
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

export default Prescription;
