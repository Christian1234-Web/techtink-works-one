import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import waiting from '../../assets/images/waiting.gif';

import CreateTask from '../Modals/CreateTask';
import {
	itemRender,
	request,
	confirmAction,
	patientname,
	formatDate,
	staffname,
} from '../../services/utilities';
import {
	allVitalItems,
	admissionAPI,
	searchAPI,
} from '../../services/constants';
import TakeReading from '../Modals/TakeReading';
import { readingDone } from '../../actions/patient';
import warning from '../../assets/images/warning.png';
import GiveMedication from '../../components/Modals/GiveMedication';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';
import CreateChart from './Modals/CreateChart';
import DatePicker from 'antd/lib/date-picker';
import TableLoading from '../TableLoading';
import ProfilePopup from './ProfilePopup';
import { toggleProfile } from '../../actions/user';
import AssignAccommodation from '../../pages/Nicu/AssignAccommodation';
import { toggleSidepanel } from '../../actions/sidepanel';

const statuses = [
	{ label: 'All', value: '' },
	{ label: 'Open', value: '0' },
	{ label: 'Discharged', value: '1' },
];

const { RangePicker } = DatePicker;

const limit = 12;

const Nicu = ({ itemId, type, can_request = true }) => {
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 12,
		totalPages: 0,
	});
	const [tasks, setTasks] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [taskItem, setTaskItem] = useState(null);
	const [showMedication, setShowMedication] = useState(false);
	const [showChartModal, setShowChartModal] = useState(false);
	const [patient, setPatient] = useState('');
	const [status, setStatus] = useState('0');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [admittedPatients, setAdmittedPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const done = useSelector(state => state.patient.reading_done);

	const dispatch = useDispatch();

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchNicuPatients(1, patient, startDate, endDate);
	};

	const fetchNicuPatients = useCallback(
		async (page, patientId, sDate, eDate) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const patient_id = patientId || '';
				const start_date = sDate || '';
				const end_date = eDate || '';
				const url = `nicu?page=${p}&limit=${limit}&patient_id=${patient_id}&startDate=${start_date}&endDate=${end_date}&status=${status}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				const arr = [...result];
				setAdmittedPatients(arr);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, status]
	);

	const fetchTasks = useCallback(
		async (patient, page) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const item_id = itemId || '';
				const block = type || '';
				const admission_id = block === '' ? patient?.admission?.id || '' : '';
				const url = `${admissionAPI}/tasks?patient_id=${patient?.id}&page=${p}&limit=12&item_id=${item_id}&admission_id=${admission_id}&type=${block}`;
				const rs = await request(url, 'GET', true);
				const { result, ...paginate } = rs;
				setMeta(paginate);
				setTasks(result);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				setLoaded(true);
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch tasks');
			}
		},
		[dispatch, itemId, type]
	);

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};
	useEffect(() => {
		if (!loaded && patient) {
			fetchTasks(patient);
		}
	}, [fetchTasks, loaded, patient]);

	useEffect(() => {
		if (done) {
			fetchTasks(patient);
			dispatch(readingDone(null));
		}
	}, [dispatch, done, fetchTasks, patient]);

	const openNicu = (patient, nicu) => {
		const info = { patient, type: 'nicu', item: nicu };
		dispatch(toggleSidepanel(true, info));
	};

	const deleteTask = async data => {
		try {
			const url = `${admissionAPI}/tasks/${data.id}/delete-task`;
			await request(url, 'DELETE', true);
			const arr = tasks.filter(tsk => tsk.id !== data.id);
			setTasks(arr);
			notifySuccess('clinical task canceled!');
		} catch (err) {
			console.log(err);
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = (e, data) => {
		e.preventDefault();
		confirmAction(deleteTask, data);
	};

	const createTask = () => {
		document.body.classList.add('modal-open');
		setShowTaskModal(true);
	};

	const takeReading = item => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setTaskItem(item);
	};

	const recordFluid = item => {
		document.body.classList.add('modal-open');
		setShowChartModal(true);
		setTaskItem(item);
	};

	const assignAccommodation = item => {
		document.body.classList.add('modal-open');
		setSelected(item);
		setShowModal(true);
	};

	const showProfile = patient => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			dispatch(toggleProfile(true, info));
		}
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowTaskModal(false);
		setShowModal(false);
		setShowMedication(false);
		setShowChartModal(false);
		setTaskItem(null);
	};

	const onNavigatePage = async nextPage => {
		await fetchTasks(patient, nextPage);
	};

	const refreshTasks = async () => {
		await fetchTasks(patient);
	};

	const recordMedication = item => {
		if (
			item.request_status === null ||
			(item.request_status !== null && item.request_status === 1)
		) {
			document.body.classList.add('modal-open');
			setTaskItem(item);
			setShowMedication(true);
		} else {
			confirmAlert({
				customUI: ({ onClose }) => {
					const onclick = async () => {
						document.body.classList.add('modal-open');
						setTaskItem(item);
						setShowMedication(true);
						onClose();
					};

					return (
						<div className="custom-ui text-center">
							<h3 className="text-danger">Medication</h3>
							<p>
								This medication has not been filled by the pharmacy. Do you want
								to continue?
							</p>
							<div>
								<div>
									<button
										className="btn btn-danger"
										style={{ margin: '10px' }}
										onClick={onClose}
									>
										No
									</button>
									<button
										className="btn btn-primary"
										style={{ margin: '10px' }}
										onClick={onclick}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					);
				},
			});
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">NICU</h6>
				<div className="element-box p-3 m-0">
					<>
						<div className="element-box m-0 mb-4 p-3">
							<div className="col-md-12">
								<form className="row">
									<div className="form-group col-md-3">
										<label htmlFor="patient_id">Patient</label>
										<AsyncSelect
											isClearable
											getOptionValue={getOptionValues}
											getOptionLabel={getOptionLabels}
											defaultOptions
											name="patient_id"
											id="patient_id"
											loadOptions={getOptions}
											onChange={e => {
												console.log(e);
												setPatient(e?.id);
											}}
											placeholder="Search patients"
										/>
									</div>
									<div className="form-group col-md-3">
										<label>Admitted Between - To</label>
										<RangePicker onChange={e => dateChange(e)} />
									</div>
									<div className="form-group col-md-3">
										<label>Status</label>
										<select
											style={{ height: '32px' }}
											className="form-control"
											name="status"
											onChange={e => setStatus(e.target.value)}
											defaultValue={status}
										>
											{statuses.map((item, i) => {
												return (
													<option key={i} value={item.value}>
														{item.label}
													</option>
												);
											})}
										</select>
									</div>
									<div className="form-group col-md-3 mt-4">
										<div
											className="btn btn-sm btn-primary btn-upper text-white"
											onClick={e => doFilter(e)}
										>
											<i className="os-icon os-icon-ui-37" />
											<span>
												{filtering ? (
													<img src={waiting} alt="submitting" />
												) : (
													'Filter'
												)}
											</span>
										</div>
									</div>
								</form>
							</div>
						</div>

						<div className="element-box m-0 mb-4 p-3">
							<div className="table-responsive">
								{!loading ? (
									<TableLoading />
								) : (
									<>
										<table className="table table-striped">
											<thead>
												<tr>
													<th>Patient Name</th>
													<th>Reason</th>
													<th>Date of Admission</th>
													<th>Admitted By</th>
													<th>Accommodation</th>
													{status === 1 && <th>Date of Discharged</th>}
													{status === 1 && <th>Discharged By</th>}
													<th>Status</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{admittedPatients.map((item, i) => {
													return (
														<tr key={i}>
															<td>
																<p className="item-title text-color m-0">
																	<Tooltip
																		title={
																			<ProfilePopup patient={item.patient} />
																		}
																	>
																		<a
																			className="cursor"
																			onClick={() => showProfile(item.patient)}
																		>
																			{patientname(item.patient, true)}
																		</a>
																	</Tooltip>
																</p>
															</td>
															<td>{item.reason || '--'}</td>
															<td>
																{formatDate(
																	item.createdAt,
																	'DD-MMM-YYYY h:mm A'
																)}
															</td>
															<td>{staffname(item.admitted_by)}</td>
															<td>
																{item.accommodation?.name || '--'}
																{item.accommodation && (
																	<Tooltip title="Change Accommodation">
																		<a
																			onClick={() => AssignAccommodation(item)}
																			className="primary ml-2"
																		>
																			<i className="fa fa-bed" />
																		</a>
																	</Tooltip>
																)}
															</td>
															{status === 1 && (
																<td>
																	{formatDate(
																		item?.date_discharged,
																		'DD-MMM-YYYY h:mm A'
																	)}
																</td>
															)}
															{status === 1 && (
																<td>{staffname(item?.dischargedBy)}</td>
															)}
															<td>
																{item.status === 0 ? (
																	<span
																		className={`badge badge-${
																			item.start_discharge
																				? 'warning'
																				: 'secondary'
																		}`}
																	>
																		{item.start_discharge
																			? 'Discharging'
																			: 'Open'}
																	</span>
																) : (
																	<span className="badge badge-success">
																		Discharged
																	</span>
																)}
															</td>
															<td nowrap="nowrap" className="row-actions">
																{!item.start_discharge &&
																	!item.accommodation &&
																	item.status === 0 && (
																		<Tooltip title="Assign Accommodation">
																			<a
																				onClick={() =>
																					assignAccommodation(item)
																				}
																				className="primary"
																			>
																				<i className="fa fa-bed" />
																			</a>
																		</Tooltip>
																	)}
																<Tooltip title="Admission">
																	<a
																		onClick={() => openNicu(item.patient, item)}
																	>
																		<i className="os-icon os-icon-user-male-circle2" />
																	</a>
																</Tooltip>
															</td>
														</tr>
													);
												})}
												{admittedPatients.length === 0 && (
													<tr>
														<td colSpan="7" className="text-center">
															No patients found
														</td>
													</tr>
												)}
											</tbody>
										</table>

										{meta && (
											<div className="pagination pagination-center mt-4">
												<Pagination
													current={parseInt(meta.currentPage, 10)}
													pageSize={parseInt(meta.itemsPerPage, 10)}
													total={parseInt(meta.totalPages, 10)}
													showTotal={total => `Total ${total} patients`}
													itemRender={itemRender}
													onChange={current => onNavigatePage(current)}
													showSizeChanger={false}
												/>
											</div>
										)}
									</>
								)}
							</div>
						</div>
						{selected && showModal && (
							<AssignAccommodation
								item={selected}
								patients={admittedPatients}
								updatePatient={patients => setAdmittedPatients(patients)}
								closeModal={() => closeModal()}
							/>
						)}
					</>
				</div>
			</div>
		</div>
	);
};

export default Nicu;
