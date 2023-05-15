/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import waiting from '../../assets/images/waiting.gif';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	request,
	confirmAction,
	updateImmutable,
} from '../../services/utilities';
import TableLoading from '../../components/TableLoading';
import { startBlock, stopBlock } from '../../actions/redux-block';

const LeaveCategory = () => {
	const initialState = {
		name: '',
		duration: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name, duration }, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [payload, getDataToEdit] = useState(null);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [categories, setCategories] = useState([]);

	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onAddLeaveCategory = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, duration };
			const rs = await request('leave-category', 'POST', true, data);
			setCategories([rs, ...categories]);
			setLoading(false);
			setState({ ...initialState });
			notifySuccess('Leave Category created');
		} catch (error) {
			setLoading(false);
			notifyError('Error creating Leave Category');
		}
	};

	const onEditLeaveCategory = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const data = { name, duration };
			const url = `leave-category/${payload.id}/update`;
			const rs = await request(url, 'PATCH', true, data);
			const items = updateImmutable(categories, rs);
			setCategories(items);
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifySuccess('Leave Category updated');
		} catch (error) {
			setState({ ...initialState });
			setSubmitButton({ save: true, edit: false });
			setLoading(false);
			notifyError('Error updating Leave Category');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			duration: data.duration,
			id: data.id,
		}));
		getDataToEdit(data);
	};

	const onDeleteLeaveCategory = async data => {
		try {
			const rs = await request(`leave-category/${data.id}`, 'DELETE', true);
			setLoading(false);
			setCategories(categories.filter(item => item.id !== rs.id));
			notifySuccess('Leave Category deleted');
		} catch (error) {
			setLoading(false);
			notifyError('Error !!! deleting Leave Category');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteLeaveCategory, data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	useEffect(() => {
		const fetchLeaveCategory = async () => {
			try {
				dispatch(startBlock());
				const rs = await request('leave-category', 'GET', true);
				setCategories(rs);
				setDataLoaded(true);
				dispatch(stopBlock());
			} catch (error) {
				setDataLoaded(true);
				dispatch(stopBlock());
				notifyError(error.message || 'could not fetch leave categories!');
			}
		};

		if (!dataLoaded) {
			fetchLeaveCategory();
		}
	}, [dataLoaded, dispatch]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls os-tabs-complex">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a className="nav-link active">Leave categories</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{!dataLoaded ? (
									<TableLoading />
								) : (
									<>
										{categories.map((item, i) => {
											return (
												<div className="col-lg-4" key={i}>
													<div className="pt-3">
														<div className="pipeline-item">
															<div className="pi-controls">
																<div className="pi-settings os-dropdown-trigger">
																	<i
																		className="os-icon os-icon-ui-49"
																		onClick={() => onClickEdit(item)}
																	></i>
																</div>
																<div className="pi-settings os-dropdown-trigger text-danger">
																	<i
																		className="os-icon os-icon-ui-15"
																		onClick={() => confirmDelete(item)}
																	></i>
																</div>
															</div>
															<div className="pi-body">
																<div className="pi-info">
																	<div className="h6 pi-name">{item.name}</div>
																	{item.duration && (
																		<div className="pi-sub">
																			{item.duration} days
																		</div>
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										})}
										{categories.length === 0 && (
											<div
												className="alert alert-info text-center"
												style={{ width: '100%' }}
											>
												No leave categories
											</div>
										)}
									</>
								)}
							</div>
						</div>
						<div className="col-lg-4">
							<div className="element-wrapper">
								<div className="element-box">
									<form
										onSubmit={edit ? onEditLeaveCategory : onAddLeaveCategory}
									>
										<h5 className="element-box-header">
											{edit ? 'Edit Leave' : 'Add New'}
										</h5>
										<div className="form-group">
											<label className="lighter">Type of leave</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter leave type"
													type="text"
													name="name"
													value={name}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="form-group">
											<label className="lighter">
												Leave duration (no of days)
											</label>
											<div className="input-group mb-2 mr-sm-2 mb-sm-0">
												<input
													className="form-control"
													placeholder="Enter leave duration"
													type="text"
													name="duration"
													value={duration}
													onChange={handleInputChange}
												/>
											</div>
										</div>

										<div className="form-buttons-w text-right compact">
											{save && (
												<button className="btn btn-primary">
													{loading ? (
														<img src={waiting} alt="submitting" />
													) : (
														<span> create</span>
													)}
												</button>
											)}
											{edit && (
												<>
													<button
														className="btn btn-secondary ml-3"
														onClick={cancelEditButton}
													>
														<span>cancel</span>
													</button>
													<button className="btn btn-primary">
														{loading ? (
															<img src={waiting} alt="submitting" />
														) : (
															<span>edit</span>
														)}
													</button>
												</>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeaveCategory;
