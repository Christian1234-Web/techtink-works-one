/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Pagination from 'antd/lib/pagination';
import pluralize from 'pluralize';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { cafeteriaAPI, paginate, searchAPI } from '../../services/constants';
import {
	Condition,
	ErrorBlock,
	formatCurrency,
	getPageList,
	itemRender,
	patientname,
	request,
	staffname,
	updateImmutable,
	ConditionNot,
	confirmAction,
} from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const pageLimit = 12;

const TakeOrder = () => {
	const [loaded, setLoaded] = useState(false);
	const [meta, setMeta] = useState({ ...paginate });
	const [foodItems, setFoodItems] = useState([]);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [staff, setStaff] = useState(null);
	const [patient, setPatient] = useState(null);
	const [searchItem, setSearchItem] = useState('');

	const formRef = useRef();

	const dispatch = useDispatch();

	const fetchInventories = useCallback(
		async search => {
			try {
				dispatch(startBlock());
				const item = search || '';
				const url = `${cafeteriaAPI}/showcase-items?q=${item}`;
				const rs = await request(url, 'GET', true);
				setFoodItems(rs);
				const items = getPageList(rs, pageLimit, 1);
				setMeta({
					...meta,
					itemsPerPage: pageLimit,
					totalPages: rs.length,
					currentPage: 1,
				});
				setItems(items);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				setLoaded(true);
				notifyError(error.message || 'could not fetch items');
			}
		},
		[dispatch, meta]
	);

	useEffect(() => {
		if (!loaded) {
			fetchInventories();
		}
	}, [fetchInventories, loaded]);

	const calculatePrice = items => {
		formRef.current.getFieldState();

		const total = items.reduce((total, item) => total + item.price, 0);
		formRef.current.change('total', total);

		const staffTotal = items.reduce(
			(total, item) => total + item.staff_price,
			0
		);
		formRef.current.change('staff_total', staffTotal);
	};

	const selectItem = item => {
		if (item.quantity <= 0 && item.foodItem.category_slug === 'show-case') {
			notifyError(`${item.foodItem.name} has finished`);
			return;
		}

		const cartItem = cartItems.find(e => e.id === item.id);
		if (!cartItem) {
			const list = [
				...cartItems,
				{
					id: item.id,
					name: item.foodItem.name,
					qty: 1,
					price: parseFloat(item.foodItem.price),
					staff_price: parseFloat(item.foodItem.staff_price),
				},
			];
			setCartItems(list);
			calculatePrice(list);
		} else {
			const quantity = cartItem.qty + 1;
			const list = updateImmutable(cartItems, {
				...cartItem,
				qty: quantity,
				price: parseFloat(item.foodItem.price) * quantity,
				staff_price: parseFloat(item.foodItem.staff_price) * quantity,
			});
			setCartItems(list);
			calculatePrice(list);
		}

		const newQty = parseInt(item.quantity, 10) - 1;
		const itemsList = updateImmutable(items, { ...item, quantity: newQty });
		setItems(itemsList);
	};

	const removeItem = cart => {
		const item = items.find(e => e.id === cart.id);
		const itemsList = updateImmutable(items, {
			...item,
			quantity: parseInt(item.quantity, 10) + parseInt(cart.qty, 10),
		});
		setItems(itemsList);
		const carts = cartItems.filter(e => e.id !== cart.id);
		setCartItems(carts);

		calculatePrice(carts);

		if (carts.length === 0) {
			formRef.current.getFieldState();
			formRef.current.reset();
		}
	};

	const minus = cart => {
		const item = items.find(i => i.id === cart.id);

		const quantity = cart.qty - 1;

		if (quantity === 0) {
			removeItem(cart);
		} else {
			const list = updateImmutable(cartItems, {
				...cart,
				qty: quantity,
				price: parseFloat(item.foodItem.price) * quantity,
				staff_price: parseFloat(item.foodItem.staff_price) * quantity,
			});
			setCartItems(list);
			calculatePrice(list);

			const newQty = parseInt(item.quantity, 10) + 1;
			const itemsList = updateImmutable(items, { ...item, quantity: newQty });
			setItems(itemsList);
		}
	};

	const onNavigatePage = pageNumber => {
		const items = getPageList(foodItems, pageLimit, pageNumber);
		setItems(items);
		setMeta({ ...meta, currentPage: pageNumber });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const fetchPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const fetchStaff = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const makeSale = values => {
		// console.log(PRINT_URI)
		confirmAction(
			doMakeSale,
			values,
			'Do you want to place order?',
			'Are you sure?'
		);
	};

	const doMakeSale = async values => {
		try {
			if (cartItems.length === 0) {
				notifyError('select food items for sale');
				return;
			}

			const data = {
				...values,
				cartItems,
				patient_id: values.patient?.id,
				staff_id: values.staff?.id,
			};
			dispatch(startBlock());
			const rs = await request('cafeteria/take-order', 'POST', true, data);

			dispatch(stopBlock());
			if (rs.success) {
				formRef.current.reset();
				setCartItems([]);
				notifySuccess('order created!');
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not take order',
				};
			}
		} catch (e) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not take order' };
		}
	};

	const search = async () => {
		await fetchInventories(searchItem);
	};

	const clear = async () => {
		setSearchItem('');
		await fetchInventories('');
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="padded-lg px-2">
					<div className="projects-list">
						<div className="pipelines-w">
							<div className="row mb-3">
								<div className="col-md-12">
									<div className="input-group">
										<input
											type="text"
											className="form-control"
											placeholder="search"
											value={searchItem}
											onChange={e => setSearchItem(e.target.value)}
										/>
										<div className="input-group-append">
											<button
												className="btn btn-primary"
												type="button"
												onClick={() => search()}
											>
												Search
											</button>
											{searchItem !== '' && (
												<button
													className="btn btn-secondary ml-0"
													type="button"
													onClick={() => clear()}
												>
													Clear
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								{items.map((item, i) => {
									return (
										<div key={i} className="col-lg-4 col-xxl-4 mb-3">
											<div
												className="pipeline-body pointer"
												onClick={() => selectItem(item)}
											>
												<div className="pipeline-item">
													<div className="pi-body">
														<div className="pi-info">
															<div className="h6 pi-name">
																{item.foodItem.name}
															</div>
															<div className="pi-sub mt-2">
																{formatCurrency(item.foodItem.price)}
															</div>
														</div>
													</div>
													<div className="pi-foot">
														{item.foodItem.description && (
															<div className="tags">
																<a className="tag">
																	{item.foodItem.description}
																</a>
															</div>
														)}
														<a className="extra-info">
															<span>
																{item.foodItem.category_slug !== 'show-case'
																	? 'À la carte'
																	: pluralize(
																			item.foodItem?.unit || '',
																			item.quantity,
																			true
																	  )}
															</span>
														</a>
													</div>
												</div>
											</div>
										</div>
									);
								})}
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
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-4 b-l-lg">
				<div className="padded-lg px-3">
					<div className="element-wrapper">
						<h6 className="element-header">Create Order</h6>
						<Form
							onSubmit={makeSale}
							initialValues={{ total: 0, staff_total: 0 }}
							validate={values => {
								const errors = {};
								if (!values.customer) {
									errors.customer = 'Select customer';
								}
								if (
									!values.staff &&
									values.customer &&
									values.customer === 'staff'
								) {
									errors.staff = 'Select staff';
								}
								if (
									!values.patient &&
									values.customer &&
									values.customer === 'patient'
								) {
									errors.patient = 'Select patient';
								}
								return errors;
							}}
							render={({
								handleSubmit,
								submitting,
								submitError,
								form,
								values,
							}) => {
								formRef.current = form;
								return (
									<form onSubmit={handleSubmit}>
										{submitError && (
											<div
												className="alert alert-danger"
												dangerouslySetInnerHTML={{
													__html: `<strong>Error!</strong> ${submitError}`,
												}}
											/>
										)}
										<div className="element-box-tp px-3 py-4">
											<div className="col-sm-12">
												<div className="form-group">
													<Field
														name="customer"
														component="select"
														className="form-control"
														onChange={e => {
															form.change('customer', e.target.value);
														}}
													>
														<option value="">Choose Customer</option>
														<option value="staff">Staff</option>
														<option value="patient">Patient</option>
														<option value="walk-in">Walk-in</option>
													</Field>
													<ErrorBlock name="customer" />
												</div>
											</div>
											<Condition when="customer" is="staff">
												<div className="col-sm-12">
													<div className="form-group">
														<label>Staff</label>
														<Field name="staff">
															{({ input, meta }) => (
																<AsyncSelect
																	isClearable
																	getOptionValue={option => option.id}
																	getOptionLabel={option => staffname(option)}
																	defaultOptions
																	value={staff}
																	loadOptions={fetchStaff}
																	onChange={e => {
																		input.onChange(e);
																		setStaff(e);
																	}}
																	placeholder="Search staff"
																/>
															)}
														</Field>
														<ErrorBlock name="staff" />
													</div>
												</div>
											</Condition>
											<Condition when="customer" is="patient">
												<div className="col-sm-12">
													<div className="form-group">
														<label>Patient</label>
														{patient?.admission && (
															<div className="posit-top">
																<div className="row">
																	<div className="col-sm-12">
																		{patient?.admission?.room ? (
																			<span className="badge badge-primary">{`${patient?.admission?.room?.category?.name}, Room ${patient?.admission?.room?.name}`}</span>
																		) : (
																			<span>No Room Assigned</span>
																		)}
																	</div>
																</div>
															</div>
														)}
														<Field name="patient">
															{({ input, meta }) => (
																<AsyncSelect
																	isClearable
																	getOptionValue={option => option.id}
																	getOptionLabel={option =>
																		patientname(option, true)
																	}
																	defaultOptions
																	value={patient}
																	loadOptions={fetchPatients}
																	onChange={e => {
																		input.onChange(e);
																		setPatient(e);
																	}}
																	placeholder="Select patient"
																/>
															)}
														</Field>
														<ErrorBlock name="patient" />
													</div>
												</div>
											</Condition>
											<table className="table table-compact smaller text-faded mb-0">
												<thead>
													<tr>
														<th>Item</th>
														<th className="text-center">Qty</th>
														<th className="text-right">Price</th>
													</tr>
												</thead>
												<tbody>
													{cartItems.map((cart, i) => {
														return (
															<tr key={i}>
																<td>
																	<span>{cart.name}</span>
																</td>
																<td>
																	<div className="d-flex align-items-center">
																		<a
																			className="text-danger mr-2"
																			style={{ fontSize: '14px' }}
																			onClick={() => minus(cart)}
																		>
																			<i className="os-icon os-icon-minus-circle" />
																		</a>
																		<input
																			type="number"
																			className="form-control no-arrows m-0"
																			value={cart.qty}
																			min="1"
																			style={{
																				width: '40px',
																				height: '25px',
																				padding: '0.375rem 0.25rem',
																			}}
																			readOnly
																		/>
																	</div>
																</td>
																<td className="text-right text-bright">
																	{values?.customer === 'staff'
																		? formatCurrency(cart.staff_price)
																		: formatCurrency(cart.price)}
																</td>
																<td className="text-center">
																	<a
																		className="text-danger"
																		style={{ fontSize: '14px' }}
																		onClick={() => removeItem(cart)}
																	>
																		<i className="os-icon os-icon-x-circle" />
																	</a>
																</td>
															</tr>
														);
													})}
													{cartItems.length === 0 && (
														<tr>
															<td colSpan="3" className="text-center">
																No items in cart!
															</td>
														</tr>
													)}
												</tbody>
											</table>
											<div className="row pt-4">
												<div className="col-md-12">
													<div className="form-group mb-0">
														<div className="input-group">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	TOTAL (₦)
																</div>
															</div>
															<ConditionNot when="customer" isNot="staff">
																<Field
																	name="total"
																	className="form-control no-arrows"
																	component="input"
																	type="number"
																	placeholder="Total"
																	readOnly
																/>
															</ConditionNot>
															<Condition when="customer" is="staff">
																<Field
																	name="staff_total"
																	className="form-control no-arrows"
																	component="input"
																	type="number"
																	placeholder="Total"
																	readOnly
																/>
															</Condition>
														</div>
													</div>
												</div>
											</div>
											<div className="row mt-2">
												<div className="col-md-12 text-right">
													<button
														className="btn btn-primary"
														disabled={submitting}
														type="submit"
													>
														Place Order
													</button>
													<button
														className="btn btn-warning ml-1"
														type="button"
														onClick={() => {
															form.reset();
															setCartItems([]);
														}}
													>
														Reset
													</button>
												</div>
											</div>
										</div>
									</form>
								);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TakeOrder;
