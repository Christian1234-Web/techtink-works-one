import React, { useCallback, useEffect, useState } from 'react';
import { paginate } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import {
	itemRender,
	request,
	staffname,
	confirmAction,
} from '../../services/utilities';
import Tooltip from 'antd/lib/tooltip';

import TableLoading from '../../components/TableLoading';
import waiting from '../../assets/images/waiting.gif';

import Pagination from 'antd/lib/pagination';
import AttendanceForm from './AttendanceForm';

const UsersAttendance = () => {
	const [filtering, setFiltering] = useState(false);
	const [loading, setLoading] = useState(true);
	const [meta, setMeta] = useState({ ...paginate });
	const [usersAttendance, setUsersAttendance] = useState([]);
	const [search, setSearch] = useState('');
	const [openForm, setOpenForm] = useState(false);

	const fetchUsers = useCallback(
		async page => {
			try {
				let p = page || 1;
				const url = `hr/staffs/?page=${p}&limit=10&q=${search}&orderColumn=updated_at`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;

				setUsersAttendance(result);
				setMeta(meta);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
				notifyError('error fetching users');
			}
		},
		[search]
	);

	useEffect(() => {
		fetchUsers();
	}, []);

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		fetchUsers();
		setFiltering(false);
	};

	const onNavigatePage = pageNumber => {
		fetchUsers(pageNumber);
	};

	const disenrollStaff = async staff => {
		const url = `hr/attendance/user/reset/${staff.id}`;
		const rs = await request(url, 'GET', true);
		const { success, message } = rs;
		if (success) {
			notifySuccess('staff disenrolled');
			onNavigatePage(meta.currentPage);
		} else {
			notifyError(message);
		}
	};

	const confirmDisenroll = staff => {
		confirmAction(
			disenrollStaff,
			staff,
			`Do you want to disenroll ${staff.first_name} ${staff.last_name}?`,
			'Are you sure?'
		);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-box m-0 mb-4 p-3">
								<div className="row">
									<div className="form-group col-md-5">
										<label className="mr-2 " htmlFor="search">
											Search
										</label>
										<input
											style={{ height: '32px' }}
											id="search"
											className="form-control"
											name="search"
											value={search}
											placeholder="search for staff"
											onChange={e => setSearch(e.target.value)}
										/>
									</div>

									<div className="form-group col-md-3 mt-4">
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
										{/* Button To create */}
										<div
											className="btn btn-sm btn-primary btn-upper text-white filter-btn"
											onClick={() => {
												setOpenForm(true);
											}}
										>
											<i className="os-icon os-icon-ui-22" />
											<span>Create</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
						<div className="element-box">
							{loading ? (
								<TableLoading />
							) : (
								<>
									<table className="table table-striped table-bordered">
										<thead>
											<tr>
												<th>Employee ID</th>
												<th>Staff Name</th>
												<th className="text-center">Department</th>
												<th className="text-center">Phone Number</th>
												<th className="text-center">On Device</th>
												<th className="text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											{usersAttendance?.map((item, index) => (
												<tr key={index}>
													<td>{item?.employee_number || '--'}</td>
													<td>{staffname(item)}</td>
													<td className="text-center">
														{item?.department?.name || '--'}
													</td>

													<td className="text-center">
														{item?.phone_number || '--'}
													</td>
													<td className="text-center">
														{item?.isOnDevice ? (
															<span className="text-success">
																<i className="os-icon os-icon-check-circle"></i>
															</span>
														) : (
															<span className="text-danger">
																<i className="os-icon os-icon-cancel-circle" />
															</span>
														)}
													</td>
													<td className="row-actions">
														{item?.isOnDevice && item?.employee_number && (
															<Tooltip title="Disenroll Staff">
																<a
																	className="text-danger"
																	onClick={() => confirmDisenroll(item)}
																>
																	<i className="os-icon os-icon-delete"></i>
																</a>
															</Tooltip>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="controls-below-table">
										<div className="table-records-pages"></div>
									</div>
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} items`}
											itemRender={itemRender}
											onChange={onNavigatePage}
											showSizeChanger={false}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{openForm && (
				<AttendanceForm
					closeModal={() => {
						setOpenForm(false);
						fetchUsers();
					}}
				/>
			)}
		</div>
	);
};

export default UsersAttendance;
