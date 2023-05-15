import React, { useState, useEffect, useCallback } from 'react';
import SunEditor from 'suneditor-react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { updateEncounterData } from '../../../actions/patient';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import {
	request,
	hasExpired,
	formatCurrency,
	parseFrequency,
} from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { ReactComponent as PlusIcon } from '../../../assets/svg-icons/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg-icons/edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/svg-icons/trash.svg';
import {
	diagnosisAPI,
	defaultEncounter,
	CK_ENCOUNTER,
} from '../../../services/constants';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const defaultValues = {
	drugId: '',
	quantity: '',
	refills: '',
	frequency: '',
	frequencyType: '',
	duration: '',
	regimen_instruction: '',
	diagnosis: [],
};

const PlanForm = ({ previous, next, patient }) => {
	const { register, handleSubmit, setValue, reset } = useForm({
		defaultValues,
	});

	const [loaded, setLoaded] = useState(false);
	const [procedureData, setProcedureData] = useState(null);
	const [regimenData, setRegimenData] = useState(null);
	const [treatmentPlan, setTreatmentPlan] = useState('');
	const [editing, setEditing] = useState(false);
	const [regimenNote, setRegimenNote] = useState('');

	// selected items
	const [frequencyType, setFrequencyType] = useState(null);
	const [refillable, setRefillable] = useState(false);
	const [generic, setGeneric] = useState(null);
	const [genericDrugs, setGenericDrugs] = useState([]);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [drugsSelected, setDrugsSelected] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);

	// procedure
	const [service, setService] = useState(null);
	const [procDiagnoses, setProcDiagnoses] = useState([]);
	const [bill, setBill] = useState('later');
	const [procedureNote, setProcedureNote] = useState('');

	const encounter = useSelector(state => state.patient.encounterData);

	const dispatch = useDispatch();

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

	const saveTreatmentPlan = useCallback(
		data => {
			setTreatmentPlan(data);
			dispatch(
				updateEncounterData(
					{
						...encounter,
						treatmentPlan: data,
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const saveRegimenData = useCallback(
		data => {
			setRegimenData(data);
			setDrugsSelected(data?.drugs || []);
			setRegimenNote(data?.regimenNote || '');

			dispatch(
				updateEncounterData(
					{
						...encounter,
						investigations: {
							...encounter.investigations,
							pharmacyRequest: data,
						},
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const saveProcedureData = useCallback(
		data => {
			setProcedureData(data);
			setBill(data?.bill || 'later');
			setProcedureNote(data?.procedureNote || '');
			setService(data?.service);
			setProcDiagnoses(data?.procDiagnoses || []);

			dispatch(
				updateEncounterData(
					{
						...encounter,
						investigations: {
							...encounter.investigations,
							procedureRequest: data,
						},
					},
					patient.id
				)
			);
		},
		[dispatch, encounter, patient]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);

		const treatmentPlanData =
			data && data.patient_id === patient.id
				? data?.encounter?.treatmentPlan
				: null;

		saveTreatmentPlan(treatmentPlanData || defaultEncounter.treatmentPlan);

		const regimenData =
			data && data.patient_id === patient.id
				? data.encounter?.investigations?.pharmacyRequest
				: null;

		saveRegimenData(regimenData);

		const procedureData =
			data && data.patient_id === patient.id
				? data.encounter?.investigations?.procedureRequest
				: null;

		saveProcedureData(procedureData);
	}, [patient, saveProcedureData, saveRegimenData, saveTreatmentPlan]);

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
			setValue('drugId', drug.id);
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
						setValue('drugId', drug.id);
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

	const onHandleInputChange = e => {
		const { name, value } = e.target;
		setValue(name, value);
	};

	const onRefillableClick = () => {
		setRefillable(!refillable);
	};

	const onFormSubmit = (data, e) => {
		const newDrug = [
			...drugsSelected,
			{ drug: selectedDrug, generic, ftype: frequencyType, ...data },
		];
		const datum = { ...regimenData, regimenNote, drugs: newDrug };
		saveRegimenData(datum);
		setEditing(false);
		setSelectedDrug(null);
		reset(defaultValues);

		setDiagnoses([]);
		setGeneric(null);
		setFrequencyType(null);
	};

	const onTrash = index => {
		const newPharm = drugsSelected.filter((pharm, i) => index !== i);
		const datum = { ...regimenData, regimenNote, drugs: newPharm };
		saveRegimenData(datum);
	};

	const startEdit = (item, index) => {
		onTrash(index);
		const items = Object.entries(item);
		for (const req of items) {
			const [key, value] = req;
			setValue(key, value);
		}
		setFrequencyType(item.ftype);
		setSelectedDrug(item.drug);
		setGeneric(item.generic);
		setEditing(true);
	};

	const getOptionValues = option => option.id;
	const getOptionLabels = option =>
		`${option.description} (${option.type}: ${option.code})`;

	const getOptions = async q => {
		if (!q || q.length < 2) {
			return [];
		}

		const url = `${diagnosisAPI}/search?q=${q}&diagnosisType=`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = () => {
		dispatch(
			updateEncounterData(
				{
					...encounter,
					investigations: {
						...encounter.investigations,
						pharmacyRequest: regimenData,
						procedureRequest: procedureData,
					},
					treatmentPlan,
				},
				patient.id
			)
		);
		next();
	};

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/procedure?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label>Treatment Plan</label>
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
				<div className="mt-4"></div>
				<h5>Add Medication</h5>
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
							ref={register({ name: 'drugId', required: true })}
							name="drugId"
							options={generic?.drugs || []}
							value={selectedDrug}
							onChange={e => {
								if (e) {
									onDrugSelection(e);
								} else {
									setValue('drugId', '');
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
							ref={register({ required: true })}
							name="quantity"
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency</label>
						<input
							type="number"
							className="form-control"
							placeholder="eg 3"
							ref={register({ required: true })}
							name="frequency"
							onChange={onHandleInputChange}
						/>
					</div>
					<div className="form-group col-sm-3">
						<label>Frequency Type</label>
						<Select
							placeholder="Frequency type"
							ref={register({ name: 'frequencyType', required: true })}
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
								setValue('frequencyType', e.value);
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
							ref={register({ required: true })}
							name="duration"
							onChange={onHandleInputChange}
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
							ref={register}
							name="regimen_instruction"
							onChange={onHandleInputChange}
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
									ref={register({ name: 'refills' })}
									name="refills"
									onChange={onHandleInputChange}
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
								onClick={onRefillableClick}
							/>{' '}
							Refillable
						</label>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-12">
						<h6>Diagnosis Data</h6>
						<AsyncSelect
							required
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							isMulti
							value={diagnoses}
							name="diagnosis"
							ref={register({ name: 'diagnosis', required: true })}
							loadOptions={getOptions}
							onChange={e => {
								setValue('diagnosis', e);
								setDiagnoses(e);
							}}
							placeholder="Search for diagnosis"
						/>
					</div>
				</div>
				<div className="row">
					{!editing ? (
						<div className="form-group col-sm-3">
							<button
								onClick={handleSubmit}
								style={{
									backgroundColor: 'transparent',
									border: 'none',
								}}
							>
								<PlusIcon
									style={{
										width: '1.5rem',
										height: '1.5rem',
										cursor: 'pointer',
									}}
								/>
							</button>
						</div>
					) : (
						<button onClick={handleSubmit} className="btn btn-primary">
							Done
						</button>
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
										<th>Diagnosis</th>
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
														item.quantity
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
													{item.diagnosis && item.diagnosis.length > 0
														? item.diagnosis
																.map(
																	d => `${d.type}: ${d.description} (${d.code})`
																)
																.join(', ')
														: '-'}
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
						<label>Regimen Note</label>
						<textarea
							className="form-control"
							name="regimen_note"
							rows="3"
							placeholder="Regimen note"
							onChange={e => {
								setRegimenNote(e.target.value);
								const data = { ...regimenData, regimenNote: e.target.value };
								saveRegimenData(data);
							}}
							value={regimenNote}
						></textarea>
					</div>
				</div>
			</form>
			<div className="mt-4"></div>
			<h5>Procedure</h5>
			<div className="row">
				<div className="form-group col-sm-12 relative">
					<label>Procedure</label>
					{service && (
						<div className="posit-top">
							<div className="row">
								<div className="col-sm-12">
									<span
										className={`badge badge-${
											service ? 'info' : 'danger'
										} text-white`}
									>{`Base Price: ${formatCurrency(
										service?.serviceCost?.tariff || 0
									)}`}</span>
								</div>
							</div>
						</div>
					)}
					<AsyncSelect
						getOptionValue={option => option.id}
						getOptionLabel={option => option.name}
						defaultOptions
						name="service_request"
						loadOptions={getServices}
						value={service}
						onChange={e => {
							const data = { ...procedureData, service: e };
							saveProcedureData(data);
						}}
						placeholder="Select Procedure"
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-12">
					<h6>Diagnosis Data</h6>
					<AsyncSelect
						required
						getOptionValue={getOptionValues}
						getOptionLabel={getOptionLabels}
						defaultOptions
						isMulti
						value={procDiagnoses}
						name="diagnosis"
						loadOptions={getOptions}
						onChange={e => {
							const data = { ...procedureData, procDiagnoses: e };
							saveProcedureData(data);
						}}
						placeholder="Search for diagnosis"
					/>
				</div>
			</div>
			<div className="row">
				<div className="form-group col-sm-12">
					<label>Request Note</label>
					<textarea
						className="form-control"
						name="request_note"
						rows="3"
						placeholder="Enter request note"
						onChange={e => {
							const data = { ...procedureData, procedureNote: e.target.value };
							saveProcedureData(data);
						}}
						value={procedureNote}
					></textarea>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="row">
						<div className="form-group col-sm-3">
							<div className="d-flex">
								<input
									className="form-control"
									type="radio"
									name="bill"
									value="now"
									checked={bill === 'now'}
									onChange={() => {
										const data = { ...procedureData, bill: 'now' };
										saveProcedureData(data);
									}}
								/>
								<label className="mx-1">Bill now</label>
							</div>
						</div>
						<div className="form-group col-sm-3">
							<div className="d-flex">
								<input
									className="form-control"
									type="radio"
									name="bill"
									value="later"
									checked={bill === 'later'}
									onChange={() => {
										const data = { ...procedureData, bill: 'later' };
										saveProcedureData(data);
									}}
								/>
								<label className="mx-1">Bill later </label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-sm-12 d-flex space-between">
					<button className="btn btn-primary" onClick={previous}>
						Previous
					</button>
					<button className="btn btn-primary" onClick={onSubmit}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PlanForm;
