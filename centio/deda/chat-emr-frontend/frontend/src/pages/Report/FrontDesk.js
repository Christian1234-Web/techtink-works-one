import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import waiting from '../../assets/images/waiting.gif';
import TableLoading from '../../components/TableLoading';
import {
	itemRender,
	patientname,
	request,
	staffname,
} from '../../services/utilities';
import { useDispatch } from 'react-redux';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';
import ProfilePopup from '../../components/Patient/ProfilePopup';
import startCase from 'lodash.startcase';

const { RangePicker } = DatePicker;

const FrontDesk = () => {
	const dispatch = useDispatch();
	const [filtering, setFiltering] = useState(false);
	const [departments, setDepartments] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);
	const [status, setStatus] = useState('');
	const [type, setConsultationType] = useState('');
	const [department, setDepartment] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	async function getActiveDepartments() {
		try {
			const rs = await request('departments', 'GET', true);
			const res = rs.map(item => ({
				...item,
				label: item.name,
			}));
			setDepartments(res);
		} catch (e) {}
	}

	const fetchAppointments = useCallback(
		async page => {
			const p = page || 1;
			try {
				dispatch(startBlock());
				const url = `front-desk/appointments?page=${p}&limit=10&status=${status}&consultation_type=${type}&department_id=${department}&startDate=${startDate}&endDate=${endDate}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;

				setAppointments(result);

				setMeta(meta);

				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching appointments');
			}
		},
		[dispatch, status, type, department, startDate, endDate]
	);

	useEffect(() => {
		if (loading) {
			fetchAppointments();
			getActiveDepartments();
			setLoading(false);
		}
	}, [loading]);

	const doFilter = () => {
		setFiltering(true);
		fetchAppointments();
		setFiltering(false);
	};

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const onNavigatePage = page => {
		fetchAppointments(page);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="os-tabs-w mx-4">
					<div className="os-tabs-controls">
						<ul className="nav nav-tabs upper">
							<li className="nav-item">
								<a
									aria-expanded="false"
									className="nav-link active"
									data-toggle="tab"
									href="#"
								>
									FrontDesk Reports
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="element-box m-0 mb-4 p-3">
							<form className="row">
								<div className="form-group col-md-3">
									<label className="mr-2">Department</label>
									<select
										style={{ height: '32px' }}
										id="department"
										className="form-control"
										name="department"
										onChange={e => setDepartment(e.target.value)}
									>
										<option className="text-dark" value="">
											All
										</option>
										{departments.map(d => (
											<option className="text-dark" key={d.id} value={d.id}>
												{d.name}
											</option>
										))}
									</select>
								</div>

								<div className="form-group col-md-3">
									<label className="d-block">From - To</label>
									<RangePicker onChange={e => dateChange(e)} />
								</div>

								<div className="form-group col-md-2">
									<label className="mr-2">Status</label>
									<select
										style={{ height: '32px' }}
										id="status"
										className="form-control"
										name="status"
										onChange={e => setStatus(e.target.value)}
									>
										<option value="">All</option>
										<option value="Pending">Pending</option>
										<option value="Approved">Approved</option>
										<option value="Missed">Missed</option>
										<option value="Cancelled">Cancelled</option>
										<option value="Completed">Completed</option>
									</select>
								</div>
								<div className="form-group col-md-2">
									<label className="mr-2">Type</label>
									<select
										style={{ height: '32px' }}
										id="status"
										className="form-control"
										name="type"
										onChange={e => setConsultationType(e.target.value)}
									>
										<option value="">All</option>
										<option value="initial">initial</option>
										<option value="follow-up">follow-up</option>
									</select>
								</div>
								<div className="form-group col-md-2 mt-4">
									<div
										className="btn btn-sm btn-primary btn-upper text-white filter-btn"
										onClick={doFilter}
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
						<div className="element-box p-3 m-0 mt-3">
							<div className="table-responsive">
								{loading ? (
									<TableLoading />
								) : (
									<table className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th>Date</th>
												<th>Patient</th>
												<th>Whom to see</th>
												<th>Specialty</th>
												<th>Department</th>
												<th>Type</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{appointments.map((item, i) => {
												return (
													<tr key={i}>
														<td className="nowrap">
															<p className="item-title text-color m-0">
																{moment(item.appointment_date).format(
																	'DD-MMM-YYYY h:mm a'
																)}
															</p>
														</td>
														<td>
															<p className="item-title text-color m-0">
																<Tooltip
																	title={
																		<ProfilePopup patient={item.patient} />
																	}
																>
																	<a className="cursor">
																		{patientname(item.patient, true)}
																	</a>
																</Tooltip>
															</p>
														</td>
														<td>
															{item.consultingRoom && item.whomToSee && (
																<p className="item-title text-color m-0">
																	{`${item.consultingRoom.name} (${staffname(
																		item.whomToSee
																	).replace('-', '')})`}
																</p>
															)}
															{!item.consultingRoom && item.whomToSee && (
																<p className="item-title text-color m-0">
																	{staffname(item.whomToSee).replace('-', '')}
																</p>
															)}
															{item.consultingRoom && !item.whomToSee && (
																<p className="item-title text-color m-0">
																	{item.consultingRoom.name}
																</p>
															)}
															{!item.consultingRoom && !item.whomToSee && (
																<p className="item-title text-color m-0">--</p>
															)}
														</td>
														<td>{item.service?.item?.name || '--'}</td>
														<td>{item.department?.name || '--'}</td>
														<td>
															{item.consultation_type
																? startCase(item.consultation_type)
																: '--'}
														</td>
														<td>
															{!item.encounter &&
															(item.status === 'Cancelled' ||
																item.status === 'Missed') ? (
																<span className="badge badge-danger">
																	{item.status}
																</span>
															) : (
																<>
																	{item.status === 'Pending' && (
																		<span className="badge badge-secondary">
																			Pending
																		</span>
																	)}
																	{(item.status ===
																		'Pending Paypoint Approval' ||
																		item.status === 'Pending HMO Approval') && (
																		<span className="badge badge-secondary">
																			Pending Payment
																		</span>
																	)}
																	{item.status === 'Approved' && (
																		<span
																			className={`badge ${
																				item.doctorStatus === 0
																					? 'badge-primary'
																					: 'badge-info text-white'
																			}`}
																		>
																			{item.doctorStatus === 0
																				? 'In Queue'
																				: 'Seeing Doctor'}
																		</span>
																	)}
																	{item.status === 'Completed' && (
																		<span className="badge badge-success">
																			Completed
																		</span>
																	)}
																</>
															)}
														</td>
													</tr>
												);
											})}

											{appointments && appointments.length === 0 && (
												<tr className="text-center">
													<td colSpan="8">No Appointments</td>
												</tr>
											)}
										</tbody>
									</table>
								)}
							</div>

							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} appointments`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FrontDesk;
