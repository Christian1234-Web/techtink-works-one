/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import Pagination from 'antd/lib/pagination';

import { leaveMgtAPI } from '../../services/constants';
import {
	confirmAction,
	formatDate,
	itemRender,
	request,
	updateImmutable,
} from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import { startBlock, stopBlock } from '../../actions/redux-block';
import ModalLeaveRequest from '../../components/Modals/ModalLeaveRequest';
import ModalApplyLeave from '../../components/Modals/ModalApplyLeave';
import ModalEditLeave from '../../components/Modals/ModalEditLeave';

const LeaveRequests = ({ location }) => {
	const [loading, setLoading] = useState(true);
	const [staffLeaves, setStaffLeaves] = useState([]);
	const [meta, setMeta] = useState(null);
	const [leave, setLeave] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showRequest, setShowRequest] = useState(false);

	const dispatch = useDispatch();

	const staff = useSelector(state => state.user.profile.details);

	const getLeaveRequests = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const staff_id = staff?.id || '';
				const url = `${leaveMgtAPI}?page=${p}&staff_id=${staff_id}&type=leave`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setStaffLeaves(result);
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
		[dispatch, staff]
	);

	useEffect(() => {
		if (loading) {
			getLeaveRequests();
		}
	}, [getLeaveRequests, loading]);

	const deleteLeaveRequests = async data => {
		try {
			dispatch(startBlock());
			const rs = await request(`${leaveMgtAPI}/${data.id}`, 'DELETE', true);
			setStaffLeaves(staffLeaves.filter(s => s.id !== rs.id));
			notifySuccess('Successful removed leave applications');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Could not remove leave applications');
		}
	};

	const confirmDelete = data => {
		confirmAction(
			deleteLeaveRequests,
			data,
			'in deleting this leave application?',
			'Do you want to continue'
		);
	};

	const onNavigatePage = async nextPage => {
		await getLeaveRequests(nextPage);
	};

	const apply = () => {
		document.body.classList.add('modal-open');
		setShowRequest(true);
	};

	const viewLeave = item => {
		setLeave(item);
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const editLeave = item => {
		setLeave(item);
		document.body.classList.add('modal-open');
		setShowEdit(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowRequest(false);
		setShowEdit(false);
		setLeave(null);
	};

	return (
		<div className="row my-4">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<div className="element-actions">
						<a
							className="btn btn-primary btn-sm text-white"
							onClick={() => apply()}
						>
							<i className="os-icon os-icon-ui-22" />
							<span>Apply for leave</span>
						</a>
					</div>
					<h6 className="element-header">Leave Requests</h6>
					<div className="element-box m-0 p-3">
						{loading ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>id</th>
											<th>Type</th>
											<th>Date start</th>
											<th>Date return</th>
											<th>status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{staffLeaves.map((item, index) => {
											return (
												<tr key={index}>
													<td>{item.id}</td>
													<td>{item.category?.name || '--'}</td>
													<td>{formatDate(item.start_date, 'DD-MMM-YYYY')}</td>
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
																<Tooltip title="Edit Leave">
																	<a
																		className="info"
																		onClick={() => editLeave(item)}
																	>
																		<i className="os-icon os-icon-edit" />
																	</a>
																</Tooltip>
																<Tooltip title="Cancel">
																	<a
																		className="danger"
																		onClick={() => confirmDelete(item)}
																	>
																		<i className="os-icon os-icon-trash" />
																	</a>
																</Tooltip>
															</>
														)}
													</td>
												</tr>
											);
										})}
										{staffLeaves.length === 0 && (
											<tr>
												<td colSpan="6" className="text-center">
													There are no available leave applications
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
											showTotal={total => `Total ${total} applications`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{leave && showModal && (
				<ModalLeaveRequest leave={leave} closeModal={closeModal} />
			)}
			{showRequest && (
				<ModalApplyLeave
					addLeave={item => setStaffLeaves([item, ...staffLeaves])}
					closeModal={closeModal}
				/>
			)}
			{leave && showEdit && (
				<ModalEditLeave
					leave={leave}
					updateLeave={item => {
						const items = updateImmutable(staffLeaves, item);
						setStaffLeaves(items);
					}}
					closeModal={closeModal}
				/>
			)}
		</div>
	);
};

export default LeaveRequests;
