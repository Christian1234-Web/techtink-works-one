/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import TableLoading from '../../components/TableLoading';
import {
	cafeteriaAPI,
	paginate,
	CAFETERIA1,
	VAT,
} from '../../services/constants';
import {
	confirmAction,
	formatCurrency,
	formatCurrencyBare,
	formatDate,
	itemRender,
	patientname,
	request,
	staffname,
	updateImmutable,
} from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import waiting from '../../assets/images/waiting.gif';
import OrderPayment from '../../components/Modals/OrderPayment';
import CafeteriaReceipt from '../../components/Modals/CafeteriaReceipt';
import {
	hasCanDoCafeteriaPaymentPermission,
	hasConfirmOrderReadyPermission,
} from '../../permission-utils/cafeteria';

const Orders = () => {
	const [loaded, setLoaded] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [items, setItems] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [status, setStatus] = useState('');
	const [showMakePayment, setShowMakePayment] = useState(false);
	const [checked, setChecked] = useState([]);
	const [showReceipt, setShowReceipt] = useState(false);
	const [paymentItem, setPaymentItem] = useState(null);

	const dispatch = useDispatch();

	const user = useSelector(state => state.user.profile);

	const fetchOrders = useCallback(
		async (page, status) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const s = status || '';
				const url = `${cafeteriaAPI}/orders?page=${p}&limit=12&status=${s}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				setItems(result);
				setLoaded(true);
				setFiltering(false);
				dispatch(stopBlock());
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} catch (error) {
				console.log(error);
				setLoaded(true);
				setFiltering(false);
				dispatch(stopBlock());
				notifyError(error.message || 'could not fetch orders');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			const _status = user.role.slug === 'cafeteria-waiter' ? '0' : '';
			setStatus(_status);
			fetchOrders(1, _status);
		}
	}, [fetchOrders, loaded, user]);

	const onNavigatePage = async pageNumber => {
		await fetchOrders(pageNumber, status);
	};

	const confirmReady = item => {
		confirmAction(update, item, 'Is the order ready?', 'Are you sure?');
	};

	const update = async item => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/orders/${item.id}/ready`;
			const rs = await request(url, 'POST', true);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('order is ready');
				const list = updateImmutable(items, rs.data);
				setItems(list);
			} else {
				notifyError(rs.message || 'could not update order');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError(error.message || 'could not update order');
		}
	};

	const confirmCancel = item => {
		confirmAction(
			cancel,
			item,
			'Do you want to cancel order?',
			'Are you sure?'
		);
	};

	const cancel = async item => {
		try {
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/orders/${item.id}/cancel`;
			const rs = await request(url, 'POST', true);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('order is cancelled');
				const list = updateImmutable(items, rs.data);
				setItems(list);
			} else {
				notifyError(rs.message || 'could not cancel order');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError(error.message || 'could not cancel order');
		}
	};

	const doFilter = () => {
		setFiltering(true);
		fetchOrders(1, status);
	};

	const onChecked = e => {
		let selected = [];
		if (e.target.checked) {
			const item = items.find(t => t.id === Number(e.target.value));
			selected = [
				...checked,
				{
					...item,
					id: Number(e.target.value),
					amount: Number(item.amount),
					quantity: Number(item.quantity),
				},
			];
		} else {
			selected = checked.filter(c => Number(c.id) !== Number(e.target.value));
		}

		setChecked(selected);
	};

	const makePayment = () => {
		document.body.classList.add('modal-open');
		setShowMakePayment(true);
	};

	const closeModal = () => {
		setShowMakePayment(false);
		setShowReceipt(false);
		setChecked([]);
		document.body.classList.remove('modal-open');
	};

	const print = async item => {
		try {
			const date = formatDate(item.createdAt, 'DD-MMM-YYYY');
			const payment_method = '--';

			let customer = '';
			if (item.staff) {
				customer = staffname(item.staff);
			} else if (item.patient) {
				customer = patientname(item.patient);
			} else {
				customer = 'Guest';
			}

			const food = item.foodItem;

			const total_amount = Number(item.amount) * Number(item.quantity);

			const vat = total_amount * Number(VAT);
			const subTotal = formatCurrencyBare(total_amount, true);
			const amount = formatCurrencyBare(total_amount + vat);
			const paid = formatCurrencyBare(0);
			const change = formatCurrencyBare(0);
			const items = `${food.name.replace('&', 'and')},${item.quantity},${
				item.amount
			},${total_amount}`;

			const rs = await axios.get(
				`${CAFETERIA1}/receipt?date=${date}&payment_method=${payment_method}&name=${customer}&sub_total=${subTotal}&vat=${vat}&amount=${amount}&paid=${paid}&change=${change}&items=${items}`
			);
			console.log(rs.data);
		} catch (e) {
			console.log(e);
			notifyError('could not print receipt');
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className="element-box m-0 mb-4 p-3">
						<form className="row">
							<div className="form-group col-md-4 mb-0">
								<select
									style={{ height: '32px' }}
									id="status"
									className="form-control"
									name="status"
									value={status}
									onChange={e => setStatus(e.target.value)}
								>
									<option value="">Select Status</option>
									<option value="-1">Cancelled</option>
									<option value="0">Pending</option>
									<option value="1">Order Ready</option>
									<option value="2">Order Paid</option>
								</select>
							</div>
							<div className="col-md-5"></div>
							<div className="form-group col mb-0 text-right">
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
							{checked.length > 0 &&
								hasCanDoCafeteriaPaymentPermission(user.permissions) && (
									<div className="form-group col mb-0">
										<div
											className="btn btn-sm btn-danger btn-upper text-white filter-btn"
											onClick={makePayment}
										>
											<i className="os-icon os-icon-finance-28" />
											<span>Cart</span>
											<span className="count">{checked.length}</span>
										</div>
									</div>
								)}
						</form>
					</div>
					<div className="element-box p-3 m-0">
						{!loaded ? (
							<TableLoading />
						) : (
							<>
								<div className="table-responsive">
									<table className="table table-theme v-middle table-hover">
										<thead>
											<tr>
												<th></th>
												<th>ID</th>
												<th style={{ width: '210px' }}>Customer</th>
												<th>Name</th>
												<th>Quantity</th>
												<th>Amount</th>
												<th>Total</th>
												<th>Date</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{items.map((item, i) => {
												const isChecked = checked.find(
													c => Number(c.id) === Number(item.id)
												);
												return (
													<tr key={i}>
														<td>
															{item.status === 1 && (
																<input
																	type="checkbox"
																	name="select"
																	id={`select${item.id}`}
																	value={item.id}
																	onChange={onChecked}
																	checked={!!isChecked}
																/>
															)}
														</td>
														<td>{item.id}</td>
														<td>
															{item.customer === 'staff'
																? staffname(item.staff)
																: ''}
															{item.customer === 'patient'
																? patientname(item.patient)
																: ''}
															{item.customer === 'patient' &&
															item.patient?.admission?.room ? (
																<span className="badge badge-primary">{`${item.patient?.admission?.room?.category?.name}, Room ${item.patient?.admission?.room?.name}`}</span>
															) : (
																''
															)}
															{item.customer === 'walk-in' ? item.name : ''}
														</td>
														<td>{item.foodItem.name}</td>
														<td>{item.quantity}</td>
														<td>{formatCurrency(item.amount)}</td>
														<td>
															{formatCurrency(
																Number(item.quantity) * Number(item.amount)
															)}
														</td>
														<td>
															{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
														</td>
														<td>
															{item.status === 0 && (
																<span className="badge badge-secondary">
																	pending
																</span>
															)}
															{item.status === 1 && !item.transaction && (
																<span className="badge badge-warning">
																	ready
																</span>
															)}
															{item.status === 2 && item.transaction && (
																<span className="badge badge-success">
																	paid
																</span>
															)}
															{item.status === -1 && (
																<span className="badge badge-danger">
																	cancelled
																</span>
															)}
															{item.status === -2 && (
																<span className="badge badge-info text-white">
																	pay later
																</span>
															)}
														</td>
														<td className="row-actions">
															<Tooltip title="Print Receipt">
																<a
																	className="primary"
																	onClick={() => print(item)}
																>
																	<i className="os-icon os-icon-printer" />
																</a>
															</Tooltip>
															{!item.transaction && (
																<>
																	{item.status === 0 &&
																		hasConfirmOrderReadyPermission(
																			user.permissions
																		) && (
																			<Tooltip title="Is ready">
																				<a
																					className="info"
																					onClick={() => confirmReady(item)}
																				>
																					<i className="os-icon os-icon-check-square" />
																				</a>
																			</Tooltip>
																		)}
																	{item.status === 0 && (
																		<Tooltip title="Cancel Order">
																			<a
																				className="danger"
																				onClick={() => confirmCancel(item)}
																			>
																				<i className="os-icon os-icon-ui-15" />
																			</a>
																		</Tooltip>
																	)}
																</>
															)}
														</td>
													</tr>
												);
											})}
											{loaded && items.length === 0 && (
												<tr>
													<td colSpan="10" className="text-center">
														No Orders Found!
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
										showTotal={total => `Total ${total} orders`}
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
			{showMakePayment && checked.length > 0 && (
				<OrderPayment
					orders={checked}
					total={checked.reduce((total, item) => {
						const product = Number(item.amount) * Number(item.quantity);
						return total + product;
					}, 0)}
					closeModal={() => closeModal()}
					showReceiptModal={(item, status) => {
						let list = items;
						for (const single of item.transaction_details) {
							list = updateImmutable(list, {
								id: single.id,
								status: item.status === 1 ? 2 : -2,
								transaction: item,
							});
						}
						setItems(list);
						if (status) {
							setPaymentItem(item);
							closeModal();
							setShowReceipt(true);
							document.body.classList.add('modal-open');
						}
					}}
				/>
			)}
			{showReceipt && paymentItem && (
				<CafeteriaReceipt
					transaction={paymentItem}
					closeModal={() => {
						closeModal();
						setPaymentItem(null);
					}}
				/>
			)}
		</>
	);
};

export default Orders;
