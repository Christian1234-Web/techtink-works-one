/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';

import TableLoading from './TableLoading';
import ModalViewRooms from './Modals/ModalViewRooms';
import ModalEditRoom from './Modals/ModalEditRoom';
import {
	request,
	confirmAction,
	formatCurrency,
	itemRender,
} from '../services/utilities';
import { notifyError, notifySuccess } from '../services/notify';
import { startBlock, stopBlock } from '../actions/redux-block';
import { deleteService, loadServices } from '../actions/settings';
import useSearchInputState from '../services/search-hook';

const RoomHmo = ({ hmo, toggle, doToggle }) => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [keyword, setKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [service, setService] = useState(null);

	const dispatch = useDispatch();

	const services = useSelector(state =>
		state.settings.services.find(s => s.hmo.id === hmo.id)
	);

	const fetchServices = useCallback(
		async (page, q) => {
			try {
				const p = page || 1;
				const url = `rooms/categories?page=${p}&limit=10&q=${q || ''}&hmo_id=${
					hmo.id
				}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				dispatch(loadServices({ hmo, result: [...result] }));
				setMeta(meta);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch services');
			}
		},
		[dispatch, hmo, setLoaded]
	);

	useEffect(() => {
		if (toggle && toggle.id === hmo.id) {
			fetchServices();
		}
	}, [fetchServices, hmo, toggle]);

	const onDeleteService = async data => {
		try {
			dispatch(startBlock());
			await request(`rooms/categories/${data.id}`, 'DELETE', true);
			dispatch(deleteService(data));
			notifySuccess('Service deleted');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting service');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteService, data);
	};

	const onNavigatePage = nextPage => {
		fetchServices(nextPage, keyword);
	};

	const viewRoom = data => {
		setService(data);
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const editRoom = data => {
		setService(data);
		document.body.classList.add('modal-open');
		setShowEditModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setShowEditModal(false);
		document.body.classList.remove('modal-open');
		setService(null);
	};

	const onSearchChange = item => {
		setSearchValue(item);
	};

	const [searchValue, setSearchValue] = useSearchInputState(() => {
		doSearch(searchValue ?? '');
	});

	const doSearch = async q => {
		dispatch(startBlock());
		await fetchServices(1, q);
		dispatch(stopBlock());
	};

	return (
		<div className="filter-side mb-2" style={{ flex: '0 0 100%' }}>
			<div className={`filter-w ${toggle ? '' : 'collapsed'}`}>
				<div
					className="filter-toggle"
					onClick={() => {
						setMeta({
							currentPage: 1,
							itemsPerPage: 24,
							totalPages: 0,
						});
						doToggle(hmo.id);
						setLoaded(false);
					}}
				>
					<i className={`os-icon os-icon-${toggle ? 'minus' : 'common-03'}`} />
				</div>
				<h6 className="filter-header text-dark">{hmo.name}</h6>
				{!loaded && toggle && toggle.id === hmo.id ? (
					<TableLoading />
				) : (
					<div
						className="filter-body"
						style={{ display: toggle ? 'block' : 'none' }}
					>
						<div className="row">
							<div className="col-lg-12">
								<div className="element-search">
									<input
										placeholder="Search services..."
										value={keyword}
										onChange={e => {
											setKeyword(e.target.value);
											onSearchChange(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="pipelines-w mt-4">
							<div className="row">
								{services &&
									services.result.map((item, i) => {
										return (
											<div className="col-lg-4 mb-2" key={i}>
												<div className="pipeline white p-1 mb-2">
													<div className="pipeline-body">
														<div className="pipeline-item">
															<div className="pi-controls">
																{hmo.name === 'Private' && (
																	<div className="pi-settings os-dropdown-trigger">
																		<Tooltip title="View Room">
																			<i
																				className="os-icon os-icon-eye mr-1"
																				onClick={() => viewRoom(item)}
																			/>
																		</Tooltip>
																		<Tooltip title="Edit Room">
																			<i
																				className="os-icon os-icon-ui-49 mr-1"
																				onClick={() => editRoom(item)}
																			/>
																		</Tooltip>
																		<Tooltip title="Delete Room">
																			<i
																				className="os-icon os-icon-ui-15 text-danger"
																				onClick={() => confirmDelete(item)}
																			/>
																		</Tooltip>
																	</div>
																)}
															</div>
															<div className="pi-body mt-3">
																<div className="pi-info">
																	<div className="h6 pi-name h7">
																		{item.name}
																	</div>
																	<div className="pi-sub">
																		{formatCurrency(item.service?.tariff || 0)}
																	</div>
																</div>
															</div>
															<div className="pi-foot">
																<div className="tags" />
																<a className="extra-info">
																	<span>{`${
																		item.rooms.length || 0
																	} rooms`}</span>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								{services && services.result.length === 0 && (
									<div
										className="alert alert-info text-center"
										style={{ width: '100%' }}
									>
										No rooms
									</div>
								)}
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} rooms`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			{showModal && service && (
				<ModalViewRooms closeModal={() => closeModal()} service={service} />
			)}
			{showEditModal && service && (
				<ModalEditRoom
					closeModal={() => closeModal()}
					service={service}
					hmo={hmo}
				/>
			)}
		</div>
	);
};

export default RoomHmo;
