/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import Swal from 'sweetalert2';

import ModalLeaveRequest from '../../components/Modals/ModalLeaveRequest';
import {
	request,
	confirmAction,
	itemRender,
	staffname,
	updateImmutable,
	formatDate,
} from '../../services/utilities';
import { leaveMgtAPI } from '../../services/constants';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const LeaveMgt = () => {
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [leaveList, setLeaveList] = useState([]);
	const [meta, setMeta] = useState(null);
	const [category, setCategory] = useState('');
	const [status, setStatus] = useState('');
	const [leave, setLeave] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const fetchLeaveCategory = useCallback(async () => {
		try {
			dispatch(startBlock());
			const rs = await request(`leave-category`, 'GET', true);
			setCategories(rs);
			dispatch(stopBlock());
			setLoaded(true);
		} catch (error) {
			dispatch(stopBlock());
			notifyError('could not fetch leave categories!');
		}
	}, [dispatch]);

	useEffect(() => {
		if (!loaded) {
			fetchLeaveCategory();
		}
	}, [fetchLeaveCategory, loaded]);

	const getLeaveRequests = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const category_id = category || '';
				const _status = status || '';
				const url = `${leaveMgtAPI}?page=${p}&category_id=${category_id}&status=${_status}&type=leave`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setLeaveList(result);
				setMeta(meta);
				setLoading(false);
				dispatch(stopBlock());
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} catch (error) {
				setLoading(false);
				dispatch(stopBlock());
				notifyError('Could not fetch leave applications');
			}
		},
		[category, dispatch, status]
	);

	useEffect(() => {
		if (loading) {
			getLeaveRequests();
		}
	}, [getLeaveRequests, loading]);

	const onNavigatePage = async nextPage => {
		await getLeaveRequests(nextPage);
	};

	const viewLeave = item => {
		setLeave(item);
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setLeave(null);
	};

	const approveRequest = async item => {
		try {
			dispatch(startBlock());
			const url = `hr/leave-management/${item.id}/approve`;
			const rs = await request(url, 'POST', true);
			const items = updateImmutable(leaveList, rs);
			setLeaveList(items);
			notifySuccess('Successful approving leave applications');
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Could not approve leave applications');
		}
	};

	const confirmApprove = data => {
		confirmAction(
			approveRequest,
			data,
			'continue in approving this leave application?',
			'Are you sure?'
		);
	};

	const rejectRequest = async item => {
		try {
			dispatch(startBlock());
			const data = { reason: item.decline_reason };
			const url = `hr/leave-management/${item.id}/reject`;
			const rs = await request(url, 'POST', true, data);
			notifySuccess('Successful rejecting leave applications');
			const items = updateImmutable(leaveList, rs);
			setLeaveList(items);
			dispatch(stopBlock());
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Could not rejecting leave applications');
		}
	};

	const confirmDelete = async item => {
		const { value: text } = await Swal.fire({
			title: 'Enter your your reason for declining request',
			input: 'textarea',
			inputPlaceholder: 'Type your message here...',
			inputAttributes: {
				'aria-label': 'Type your message here',
			},
			showCancelButton: true,
			inputValidator: value => {
				if (!value) {
					return 'You need to write something!';
				}
			},
		});

		if (text) {
			confirmAction(
				rejectRequest,
				{ ...item, decline_reason: text },
				'in rejecting leave?',
				'Proceed?'
			);
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<form className="form-inline justify-content-sm-end">
									<label>Category:</label>
									<select
										className="form-control form-control-sm rounded mr-4"
										onChange={e => setCategory(e.target.value)}
									>
										<option value="">Select Category</option>
										{categories.map((cats, index) => {
											return (
												<option key={index} value={cats.id}>
													{cats.name}
												</option>
											);
										})}
									</select>
									<label>Status:</label>
									<select
										className="form-control form-control-sm rounded"
										onChange={e => setStatus(e.target.value)}
									>
										<option value="">Select Status</option>
										<option value="0">Pending</option>
										<option value="1">Approved</option>
										<option value="-1">Rejected</option>
									</select>
								</form>
							</div>
							<h6 className="element-header">Leave Management</h6>
							<div className="element-box">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th></th>
												<th>Name</th>
												<th>Type</th>
												<th>Date To leave</th>
												<th>Date To Return</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{leaveList.map((item, i) => {
												return (
													<tr key={i}>
														<td>{item.id}</td>
														<td>{staffname(item.staff)}</td>
														<td>{item.category?.name || '--'}</td>
														<td>
															{formatDate(item.start_date, 'DD-MMM-YYYY')}
														</td>
														<td>{formatDate(item.end_date, 'DD-MMM-YYYY')}</td>
														<td>
															{item.status >= 1 && (
																<span className="badge badge-success">
																	Approved
																</span>
															)}
															{item.status === 0 && (
																<span className="badge badge-warning">
																	Pending
																</span>
															)}
															{item.status === -1 && (
																<span className="badge badge-danger">
																	Declined
																</span>
															)}
														</td>
														<td className="row-actions">
															<Tooltip title="View Request">
																<a
																	className="secondary"
																	onClick={() => viewLeave(item)}
																>
																	<i className="os-icon os-icon-folder" />
																</a>
															</Tooltip>
															{item.status === 0 && (
																<>
																	<Tooltip title="Approve Leave">
																		<a
																			className="primary"
																			onClick={() => confirmApprove(item)}
																		>
																			<i className="os-icon os-icon-thumbs-up" />
																		</a>
																	</Tooltip>
																	<Tooltip title="Reject Leave">
																		<a
																			className="danger"
																			onClick={() => confirmDelete(item)}
																		>
																			<i className="os-icon os-icon-thumbs-down" />
																		</a>
																	</Tooltip>
																</>
															)}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									{meta && (
										<div className="pagination pagination-center mt-4">
											<Pagination
												current={parseInt(meta.currentPage, 10)}
												pageSize={parseInt(meta.itemsPerPage, 10)}
												total={parseInt(meta.totalPages, 10)}
												showTotal={total => `Total ${total} applications`}
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
			</div>
			{leave && showModal && (
				<ModalLeaveRequest leave={leave} closeModal={closeModal} />
			)}
		</div>
	);
};

export default LeaveMgt;
