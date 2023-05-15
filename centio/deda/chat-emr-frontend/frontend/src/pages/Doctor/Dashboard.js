/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import waiting from '../../assets/images/waiting.gif';
import { CK_ENCOUNTER } from '../../services/constants';
import { request, itemRender, updateImmutable } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import AppointmentTable from '../../components/Doctor/AppointmentTable';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { updateEncounterData } from '../../actions/patient';
import SSRStorage from '../../services/storage';
import { messageService } from '../../services/message';

const storage = new SSRStorage();

const limit = 15;

const Dashboard = () => {
	const [state, setState] = useState({ filtering: false });
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: limit,
		totalPages: 0,
	});
	const [departmentId, setDepartmentId] = useState('');

	const dispatch = useDispatch();

	const departments = useSelector(state => state.department);

	const getAppointments = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const today = moment().format('YYYY-MM-DD');
				const p = page || 1;
				const url = `front-desk/appointments?page=${p}&limit=${limit}&today=${today}&canSeeDoctor=1&is_queue=1&status=Approved&department_id=${departmentId}`;
				const res = await request(url, 'GET', true);
				const { result, ...meta } = res;
				setAppointments([...result]);
				setMeta(meta);
				setLoading(false);
				setState({ ...state, filtering: false });
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				setState({ ...state, filtering: false });
				notifyError(e.message || 'could not fetch appointments');
			}
		},
		[departmentId, dispatch, state]
	);

	const loadEncounter = useCallback(async () => {
		const data = await storage.getItem(CK_ENCOUNTER);
		if (data && data.patient_id !== '') {
			dispatch(updateEncounterData(data.encounter, data.patient_id));
		}
	}, [dispatch]);

	useEffect(() => {
		if (loading) {
			getAppointments();
			loadEncounter();
		}
	}, [getAppointments, loadEncounter, loading]);

	const updateAppointment = useCallback(
		e => {
			const updatedAppointments = updateImmutable(appointments, e);
			setAppointments([...updatedAppointments]);
		},
		[appointments]
	);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'update-appointment') {
				updateAppointment(data.appointment);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'consultation-queue') {
				setAppointments([...appointments, data.queue.appointment]);
				setMeta({ ...meta, totalPages: meta.totalPages + 1 });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [appointments, meta]);

	const onNavigatePage = nextPage => {
		getAppointments(nextPage);
	};

	const doFilter = e => {
		e.preventDefault();
		setState({ ...state, filtering: true });
		getAppointments();
	};

	const { filtering } = state;

	return (
		<div className="element-wrapper">
			<div className="element-actions">
				<form style={{ display: 'flex' }}>
					<div className="form-group m-0 mr-2">
						<select
							style={{ height: '32px' }}
							className="form-control"
							name="departments"
							onChange={e => setDepartmentId(e.target.value)}
						>
							<option value="">Select Department</option>
							{departments
								.filter(d => d.has_appointment === 1)
								.map((status, i) => {
									return (
										<option key={i} value={status.id}>
											{status.name}
										</option>
									);
								})}
						</select>
					</div>
					<div>
						<button
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							onClick={doFilter}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</button>
					</div>
				</form>
			</div>
			<h6 className="element-header">Today's Appointments</h6>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					<AppointmentTable
						appointments={appointments}
						loading={loading}
						updateAppointment={updateAppointment}
					/>
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
	);
};

export default withRouter(Dashboard);
