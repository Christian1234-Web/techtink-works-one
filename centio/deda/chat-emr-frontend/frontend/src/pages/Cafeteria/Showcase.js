/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';

import {
	request,
	itemRender,
	updateImmutable,
	confirmAction,
	formatDate,
} from '../../services/utilities';
import { cafeteriaAPI, paginate } from '../../services/constants';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';
import { hasCanDeleteShowcaseItemPermission } from '../../permission-utils/cafeteria';

const Showcase = () => {
	const initialState = {
		quantity: '',
		edit: false,
		create: true,
	};
	const [{ quantity }, setState] = useState(initialState);
	const [{ edit, create }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [foodItem, setFoodItem] = useState(null);

	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

	const fetchItems = useCallback(async page => {
		try {
			const p = page || 1;
			const url = `${cafeteriaAPI}/items?page=${p}&limit=20`;
			const rs = await request(url, 'GET', true);
			const { result, ...paginattion } = rs;
			setMeta(paginattion);
			setItems(result);
			window.scrollTo({ top: 0, behavior: 'smooth' });
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

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const onCreateItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { item_id: foodItem.id, quantity };
			const rs = await request(`${cafeteriaAPI}/items`, 'POST', true, info);
			setItems([rs, ...items]);
			dispatch(stopBlock());
			setFoodItem(null);
			setState({ ...initialState });
			notifySuccess('Showcase item created');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error creating showcase item');
		}
	};

	const onEditItem = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const info = { item_id: foodItem.id, quantity };
			const url = `${cafeteriaAPI}/items/${data.id}`;
			const rs = await request(url, 'PUT', true, info);
			setItems([...updateImmutable(items, rs)]);
			setState({ ...initialState });
			setSubmitButton({ create: true, edit: false });
			dispatch(stopBlock());
			setFoodItem(null);
			notifySuccess('Show case item updated');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error updating show case item');
		}
	};

	const onClickEdit = data => {
		setSubmitButton({ edit: true, create: false });
		setState(prevState => ({
			...prevState,
			quantity: data.quantity,
		}));
		setFoodItem(data.foodItem);
		getDataToEdit(data);
	};

	const cancelEditButton = () => {
		setSubmitButton({ ...initialState });
		setState({ ...initialState });
		setFoodItem(null);
	};

	const onDeleteItem = async data => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/items/${data.id}`;
			const rs = await request(url, 'DELETE', true);
			setItems([...items.filter(i => i.id !== rs.id)]);
			dispatch(stopBlock());
			notifySuccess('Show case item deleted');
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error deleting showcase item');
		}
	};

	const confirmDelete = data => {
		confirmAction(onDeleteItem, data);
	};

	const onNavigatePage = async pageNumber => {
		await fetchItems(pageNumber);
	};

	const onApprove = async item => {
		try {
			dispatch(startBlock());
			const info = { approved: 1 };
			const url = `${cafeteriaAPI}/approve/${item.id}`;
			const rs = await request(url, 'PUT', true, info);
			setItems([...updateImmutable(items, rs)]);
			dispatch(stopBlock());
			notifySuccess('Food item approved');
		} catch (error) {
			dispatch(stopBlock());
			notifyError('Error approving food item');
		}
	};

	const fetchFoodItems = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `cafeteria/food-items?q=${q}&category=show-case`;
		const res = await request(url, 'GET', true);
		return res?.result || [];
	};

	return (
		<div className="row">
			<div className="col-lg-9">
				<div className="element-box p-3 m-0">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<div className="table-responsive">
								<table className="table table-theme v-middle table-hover">
									<thead>
										<tr>
											<th>Name</th>
											<th>Quantity</th>
											<th width="120px">Date</th>
											<th>Approved</th>
											<th width="120px">Approved At</th>
											<th>Approved By</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{items.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.foodItem.name}</td>
													<td>
														{item.quantity < 0 ? 'À la carte' : item.quantity}
													</td>
													<td>
														{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
													</td>
													<td>
														{item.approved === 0 ? (
															<span className="badge badge-secondary">
																pending
															</span>
														) : (
															<span className="badge badge-success">
																approved
															</span>
														)}
													</td>
													<td>
														{formatDate(item.approved_at, 'DD-MMM-YYYY h:mm a')}
													</td>
													<td>{item.approved_by || '--'}</td>
													<td className="row-actions">
														{item.approved === 0 && (
															<>
																<Tooltip title="Approve Item">
																	<a
																		className="info"
																		onClick={() => onApprove(item)}
																	>
																		<i className="os-icon os-icon-check-square" />
																	</a>
																</Tooltip>
																<Tooltip title="Edit Item">
																	<a
																		className="secondary"
																		onClick={() => onClickEdit(item)}
																	>
																		<i className="os-icon os-icon-edit-32" />
																	</a>
																</Tooltip>
															</>
														)}
														{hasCanDeleteShowcaseItemPermission(
															user.permissions
														) && (
															<Tooltip title="Delete Item">
																<a
																	className="danger"
																	onClick={() => confirmDelete(item)}
																>
																	<i className="os-icon os-icon-ui-15" />
																</a>
															</Tooltip>
														)}
													</td>
												</tr>
											);
										})}
										{loaded && items.length === 0 && (
											<tr>
												<td colSpan="7" className="text-center">
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
			<div className="col-lg-3">
				<div className="pipeline white lined-warning">
					<form onSubmit={edit ? onEditItem : onCreateItem}>
						<h6 className="form-header">
							{edit ? 'Edit Food Item' : 'Add Food Item'}
						</h6>
						<div className="form-group mt-2">
							<label>Food Item</label>
							<AsyncSelect
								isClearable
								getOptionValue={option => option.id}
								getOptionLabel={option => option.name}
								defaultOptions
								loadOptions={fetchFoodItems}
								value={foodItem}
								onChange={e => {
									setFoodItem(e);
								}}
								placeholder="--Select--"
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Item quantity"
								type="text"
								name="quantity"
								onChange={handleInputChange}
								value={quantity}
							/>
						</div>

						<div className="form-buttons-w">
							{create && (
								<button className="btn btn-primary">
									<span>create</span>
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
										<span>edit</span>
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Showcase;
