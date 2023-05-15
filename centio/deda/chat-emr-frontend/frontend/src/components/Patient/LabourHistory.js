import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';

import { notifyError } from '../../services/notify';
import { request, itemRender, updateImmutable } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { labourAPI } from '../../services/constants';
import TableLoading from '../../components/TableLoading';
import { staffname } from '../../services/utilities';
import { messageService } from '../../services/message';
import { toggleSidepanel } from '../../actions/sidepanel';

const { RangePicker } = DatePicker;

const limit = 12;

const LabourHistory = ({ patient }) => {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filtering, setFiltering] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: limit,
		totalPages: 0,
	});

	const dispatch = useDispatch();

	const fetchLabours = useCallback(
		async (page, sDate, eDate) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const patient_id = patient.id || '';
				const url = `${labourAPI}?page=${p}&limit=${limit}&patient_id=${patient_id}&startDate=${
					sDate || ''
				}&endDate=${eDate || ''}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setPatients([...result]);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, patient.id]
	);

	useEffect(() => {
		if (loading) {
			fetchLabours();
			setLoading(false);
		}
	}, [loading, fetchLabours]);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'labour') {
				const enrollments = updateImmutable(patients, data);
				setPatients(enrollments);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchLabours(1, startDate, endDate);
	};

	const onNavigatePage = nextPage => {
		fetchLabours(nextPage, startDate, endDate);
	};

	const openLabour = labour => {
		const info = { patient, type: 'labour', item: labour };
		dispatch(toggleSidepanel(true, info));
	};

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3 col-xl-12">
				<div className="col-md-12">
					<form className="row">
						<div className="form-group col-md-3">
							<label>Admitted Between - To</label>
							<RangePicker onChange={e => dateChange(e)} />
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
			<div className="element-box m-0 mb-4 p-3 col-xl-12">
				<div className="table-responsive">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Date of Enrollment</th>
										<th>Enrolled By</th>
										<th>Date Closed</th>
										<th>Closed By</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{patients.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.serial_code}</td>
												<td>
													{moment(item.createdAt).format('DD-MMM-YYYY h:mm A')}
												</td>
												<td>{staffname(item.staff)}</td>
												<td>
													{moment(item.date_closed).format(
														'DD-MMM-YYYY h:mm A'
													)}
												</td>
												<td>{staffname(item.closedBy)}</td>
												<td>
													{item.status === 0 ? (
														<span className="badge badge-secondary">Open</span>
													) : (
														<span className="badge badge-success">Closed</span>
													)}
												</td>
												<td className="row-actions">
													<Tooltip title="Open Labour Mgt">
														<a onClick={() => openLabour(item)}>
															<i className="os-icon os-icon-user-male-circle2" />
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})}
									{patients.length === 0 && (
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
		</>
	);
};

export default LabourHistory;
