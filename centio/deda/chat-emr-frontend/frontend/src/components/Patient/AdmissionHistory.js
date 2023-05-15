import React, { useCallback, useEffect, useState } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { request, itemRender, formatDate } from '../../services/utilities';
import TableLoading from '../TableLoading';
import { staffname } from '../../services/utilities';
import { toggleSidepanel } from '../../actions/sidepanel';

const { RangePicker } = DatePicker;

const AdmissionHistory = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [filtering, setFiltering] = useState(false);
	const [enrollments, setEnrollments] = useState([]);
	const [meta, setMeta] = useState(null);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const dispatch = useDispatch();

	const fetchPatients = useCallback(
		async (page, sDate, eDate) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const sd = sDate || '';
				const ed = eDate || '';
				const pid = patient.id;
				const url = `patient/admissions?page=${p}&patient_id=${pid}&startDate=${sd}&endDate=${ed}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setEnrollments([...result]);
				setFiltering(false);
				setLoading(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				notifyError('error fetching patients');
				setLoading(false);
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchPatients();
		}
	}, [fetchPatients, loading]);

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchPatients(1, startDate, endDate);
	};

	const onNavigatePage = nextPage => {
		fetchPatients(nextPage, startDate, endDate);
	};

	const openAdmission = (patient, admission) => {
		const info = {
			patient: { ...patient, admission },
			type: 'admission',
			item: admission,
		};
		dispatch(toggleSidepanel(true, info));
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Admission History</h6>
				<div className="element-box p-3 m-0">
					<form className="row">
						<div className="form-group col-md-10 mb-0">
							<RangePicker onChange={e => dateChange(e)} />
						</div>
						<div className="form-group mb-0 col-md-2 text-right">
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
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Date Admitted</th>
											<th>Admitted By</th>
											<th>Date Discharged</th>
											<th>Discharged By</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{enrollments.map((item, i) => {
											return (
												<tr key={i}>
													<td>
														{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm A')}
													</td>
													<td>{staffname(item.admitted_by)}</td>
													<td>
														{formatDate(
															item.date_discharged,
															'DD-MMM-YYYY h:mm A'
														)}
													</td>
													<td>{staffname(item.dischargedBy)}</td>
													<td>
														{item.status === 0 ? (
															<span className="badge badge-secondary">
																Open
															</span>
														) : (
															<span className="badge badge-success">
																Closed
															</span>
														)}
													</td>
													<td className="row-actions">
														<Tooltip title="Open Admission">
															<a
																onClick={() =>
																	openAdmission(item.patient, item)
																}
															>
																<i className="os-icon os-icon-user-male-circle2" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{enrollments.length === 0 && (
											<tr>
												<td colSpan="6" className="text-center">
													No enrolments found!
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
											showTotal={total => `Total ${total} admissions`}
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
			</div>
		</div>
	);
};

export default AdmissionHistory;
