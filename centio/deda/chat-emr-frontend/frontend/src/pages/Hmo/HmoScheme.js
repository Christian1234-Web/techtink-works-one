/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Tooltip from 'antd/lib/tooltip';
import capitalize from 'lodash.capitalize';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';
import { request, itemRender } from '../../services/utilities';
import { hmoAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import HmoSchemeForm from '../../components/Modals/HmoSchemeForm';
import ModalHmoTariff from '../../components/Modals/ModalHmoTariff';
import {
	hasDeleteHmoSchemePermission,
	hasEditHmoSchemePermission,
} from '../../permission-utils/hmo';

const HmoScheme = () => {
	const [schemes, setSchemes] = useState([]);
	const [{ edit, add }, setSubmitButton] = useState({ edit: false, add: true });
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState(null);
	const [scheme, setScheme] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showTariffModal, setShowTariffModal] = useState(false);
	const [hmo, setHmo] = useState(null);
	const [categories, setCategories] = useState([]);

	const dispatch = useDispatch();

	const staff = useSelector(state => state.user.profile);

	const fetchCategories = useCallback(async () => {
		try {
			const rs = await request('service-categories', 'GET', true);
			setCategories([...rs]);
		} catch (error) {
			notifyError(error.message || 'could not fetch categories!');
		}
	}, []);

	const fetchHmos = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const rs = await request(`${hmoAPI}/schemes?page=${p}`, 'GET', true);
				const { result, ...meta } = rs;
				setSchemes([...result]);
				setMeta(meta);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				console.log(e);
				notifyError('could not fetch hmo schemes');
				setLoaded(true);
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			fetchCategories();
			fetchHmos();
		}
	}, [loaded, fetchHmos, fetchCategories]);

	const onNavigatePage = nextPage => {
		fetchHmos(nextPage);
	};

	const showTariffs = item => {
		setHmo(item);
		document.body.classList.add('modal-open');
		setShowTariffModal(true);
	};

	const newScheme = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setScheme(null);
	};

	const editScheme = data => {
		document.body.classList.add('modal-open');
		setShowModal(true);
		setSubmitButton({ edit: true, add: false });
		setScheme(data);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowTariffModal(false);
		setSubmitButton({ add: true, edit: false });
		setScheme(null);
		setHmo(null);
	};

	const onDeleteHmo = async data => {
		try {
			dispatch(startBlock());
			const url = `${hmoAPI}/schemes/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setSchemes([...schemes.filter(s => s.id !== rs.id)]);
			dispatch(stopBlock());
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError(e.message || 'could not delete hmo scheme');
		}
	};

	const confirmDelete = data => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<h1>Are you sure?</h1>
						<p>You want to delete this remove this scheme?</p>
						<div style={{}}>
							<button
								className="btn btn-primary"
								style={{ margin: 10 }}
								onClick={onClose}
							>
								No
							</button>
							<button
								className="btn btn-danger"
								style={{ margin: 10 }}
								onClick={() => {
									onDeleteHmo(data);
									onClose();
								}}
							>
								Yes, Delete it!
							</button>
						</div>
					</div>
				);
			},
		});
	};

	const updateScheme = items => {
		setSchemes(items);
	};

	return (
		<>
			<div className="element-actions">
				<a
					onClick={() => newScheme()}
					className="btn btn-primary btn-sm btn-outline-primary"
				>
					Create Scheme
				</a>
			</div>
			<h6 className="element-header">HMO Scheme</h6>
			<div className="pipelines-w">
				<div className="row">
					<div className="col-lg-12">
						<div className="element-wrapper">
							<div className="element-box p-3 m-0">
								<div className="table-responsive">
									{!loaded ? (
										<TableLoading />
									) : (
										<>
											<table className="table table-striped">
												<thead>
													<tr>
														<th>S/N</th>
														<th>HMO Company</th>
														<th>Scheme</th>
														<th>Type</th>
														<th>Phone</th>
														<th>Email</th>
														<th>CAC Number</th>
														<th>Coverage</th>
														<th>Patients</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{schemes.map((hmo, i) => {
														return (
															<tr key={i}>
																<td>{hmo.id}</td>
																<td>
																	<span>
																		{capitalize(hmo.owner?.name || '--')}
																	</span>
																</td>
																<td>{hmo.name || '--'}</td>
																<td>
																	<span>{hmo.hmoType?.name || '--'}</span>
																</td>
																<td>
																	<span>{hmo.phoneNumber || '--'}</span>
																</td>

																<td>
																	<span>{hmo.email || '--'}</span>
																</td>
																<td className="nowrap">
																	<span>{hmo.cacNumber || '--'}</span>
																</td>
																<td className="nowrap">
																	<span>{`${capitalize(hmo.coverageType)} ${
																		hmo.coverageType === 'partial'
																			? `(${hmo.coverage}%)`
																			: ''
																	}`}</span>
																</td>
																<td>{`${hmo.patients || 0} patients`}</td>
																<td className="row-actions">
																	{hasEditHmoSchemePermission(
																		staff.permissions
																	) && (
																		<Tooltip title="Edit">
																			<a onClick={() => editScheme(hmo)}>
																				<i className="os-icon os-icon-edit-1" />
																			</a>
																		</Tooltip>
																	)}
																	<Tooltip title="HMO Tariffs">
																		<a onClick={() => showTariffs(hmo)}>
																			<i className="os-icon os-icon-documents-03" />
																		</a>
																	</Tooltip>
																	{hmo.name !== 'Private' &&
																		hasDeleteHmoSchemePermission(
																			staff.permissions
																		) && (
																			<Tooltip title="Delete">
																				<a
																					className="danger"
																					onClick={() => confirmDelete(hmo)}
																				>
																					<i className="os-icon os-icon-ui-15" />
																				</a>
																			</Tooltip>
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
														showTotal={total => `Total ${total} HMOs`}
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
				</div>
			</div>
			{showModal && (
				<HmoSchemeForm
					scheme={scheme}
					schemes={schemes}
					closeModal={closeModal}
					updateScheme={updateScheme}
					buttonState={{ edit, add }}
				/>
			)}
			{showTariffModal && (
				<ModalHmoTariff
					hmo={hmo}
					categories={categories}
					closeModal={() => closeModal()}
				/>
			)}
		</>
	);
};

export default HmoScheme;
