/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import TableLoading from '../../components/TableLoading';
import { paginate, cafeteriaAPI } from '../../services/constants';
import {
	confirmAction,
	formatCurrency,
	itemRender,
	request,
	updateImmutable,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess, notifyError } from '../../services/notify';
import ModalAddFoodItem from '../../components/Modals/ModalAddFoodItem';
import ModalEditFoodItem from '../../components/Modals/ModalEditFoodItem';

const FoodItems = () => {
	const [loaded, setLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [foodItem, setFoodItem] = useState(null);

	const dispatch = useDispatch();

	const fetchItems = useCallback(async page => {
		try {
			const p = page || 1;
			const url = `${cafeteriaAPI}/food-items?page=${p}&limit=10`;
			const rs = await request(url, 'GET', true);
			const { result, ...pagination } = rs;
			setMeta(pagination);
			setItems(result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchItems();
			setLoaded(true);
		}
	}, [fetchItems, loaded]);

	const onDeleteItem = async data => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/food-items/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setItems([...items.filter(i => i.id !== rs.id)]);
			dispatch(stopBlock());
			notifySuccess('Food item deleted');
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting food item');
		}
	};

	// eslint-disable-next-line no-unused-vars
	const confirmDelete = data => {
		confirmAction(onDeleteItem, data);
	};

	const onNavigatePage = async pageNumber => {
		await fetchItems(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const addFoodItem = () => {
		document.body.classList.add('modal-open');
		setShowAddModal(true);
	};

	const editFoodItem = item => {
		document.body.classList.add('modal-open');
		setFoodItem(item);
		setShowEditModal(true);
	};

	const closeModal = () => {
		setShowEditModal(false);
		setShowAddModal(false);
		setFoodItem(null);
		document.body.classList.remove('modal-open');
	};

	const convert = item => {
		confirmAction(doConvert, item, 'Convert Food Item to A La Carte');
	};

	const doConvert = async item => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/food-items/${item.id}/a-la-carte`;
			const rs = await request(url, 'PATCH', true, {});
			dispatch(stopBlock());
			setItems(updateImmutable(items, rs));
			notifySuccess('food item saved');
			closeModal();
		} catch (e) {
			console.log(e.message);
			dispatch(stopBlock());
			notifyError('could not save food item');
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a aria-expanded="false" className="nav-link active">
												Cafeteria Food Items
											</a>
										</li>
										<li className="nav-item nav-actions d-sm-block">
											<a
												className="btn btn-primary btn-sm text-white"
												onClick={() => addFoodItem()}
											>
												<i className="os-icon os-icon-plus-circle"></i>
												<span>Add Food Item</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							{!loaded ? (
								<TableLoading />
							) : (
								<div className="row">
									<div className="col-lg-12">
										<div className="element-box p-3 m-0">
											{!loaded ? (
												<TableLoading />
											) : (
												<>
													<div className="table-responsive">
														<table className="table table-theme v-middle table-hover">
															<thead>
																<tr>
																	<th>ID</th>
																	<th>Name</th>
																	<th>Category</th>
																	<th>Price</th>
																	<th>Staff Price</th>
																	<th>Description</th>
																	<th>Unit</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																{items.map((item, i) => {
																	return (
																		<tr key={i}>
																			<td>{item.id}</td>
																			<td>{item.name}</td>
																			<td>{item.category}</td>
																			<td>{formatCurrency(item.price)}</td>
																			<td>
																				{formatCurrency(item.staff_price)}
																			</td>
																			<td>{item.description || '--'}</td>
																			<td>{item.unit || '--'}</td>
																			<td>
																				<Tooltip title="Edit Item">
																					<a
																						className="text-secondary"
																						onClick={() => editFoodItem(item)}
																					>
																						<i className="os-icon os-icon-edit-32" />
																					</a>
																				</Tooltip>
																				{item.category_slug === 'show-case' && (
																					<Tooltip title="Convert to A la Carte">
																						<a
																							className="ml-4"
																							onClick={() => convert(item)}
																						>
																							<i className="os-icon os-icon-refresh-cw" />
																						</a>
																					</Tooltip>
																				)}
																			</td>
																		</tr>
																	);
																})}
																{loaded && items.length === 0 && (
																	<tr>
																		<td colSpan="6" className="text-center">
																			No Items
																		</td>
																	</tr>
																)}
															</tbody>
														</table>
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
							)}
						</div>
					</div>
				</div>
			</div>
			{showAddModal && (
				<ModalAddFoodItem
					closeModal={() => closeModal()}
					addFoodItem={item => setItems([item, ...items])}
				/>
			)}
			{showEditModal && (
				<ModalEditFoodItem
					foodItem={foodItem}
					closeModal={() => closeModal()}
					updateFoodItem={item => setItems(updateImmutable(items, item))}
				/>
			)}
		</div>
	);
};

export default FoodItems;
