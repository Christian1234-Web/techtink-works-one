/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import startCase from 'lodash.startcase';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Tooltip from 'antd/lib/tooltip';
import axios from 'axios';

import waiting from '../../assets/images/waiting.gif';
import TableLoading from '../../components/TableLoading';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	formatCurrency,
	formatCurrencyBare,
	formatDate,
	itemRender,
	patientname,
	request,
	staffname,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { CAFETERIA2, VAT } from '../../services/constants';

const { RangePicker } = DatePicker;

const Transactions = () => {
	const [loading, setLoading] = useState(true);
	const [patientData, setPatientData] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [category, setCategory] = useState('');
	const [meta, setMeta] = useState(null);

	const paymentMethods = useSelector(state => state.utility.methods);

	const dispatch = useDispatch();

	const fetchTransactions = useCallback(
		async (page, q) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `transactions/search?page=${p}&limit=10&startDate=${startDate}&endDate=${endDate}&bill_source=cafeteria&filter=`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setTransactions(result);
				setLoading(false);
				setFiltering(false);
				dispatch(stopBlock());
			} catch (error) {
				notifyError('error fetching patients');
				setLoading(false);
				dispatch(stopBlock());
				setFiltering(false);
			}
		},
		[dispatch, endDate, startDate]
	);

	useEffect(() => {
		if (loading) {
			fetchTransactions();
		}
	}, [fetchTransactions, loading]);

	const onNavigatePage = async nextPage => {
		await fetchTransactions(nextPage);
	};

	const doFilter = () => {
		setFiltering(true);
		fetchTransactions(1);
	};

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const print = async transaction => {
		try {
			const date = formatDate(transaction.createdAt, 'DD-MMM-YYYY');
			const payment_method = transaction.payment_method;

			let customer = '';
			if (transaction.dedastaff) {
				customer = staffname(transaction.dedastaff);
			} else if (transaction.patient) {
				customer = patientname(transaction.patient);
			} else {
				customer = 'Guest';
			}

			const total_amount = Math.abs(Number(transaction.amount));
			const vat = total_amount * Number(VAT);
			const subTotal = formatCurrencyBare(total_amount, true);
			const amount = formatCurrencyBare(total_amount + vat);
			const paid = formatCurrencyBare(transaction.amount_paid || 0);
			const change = formatCurrencyBare(transaction.change || 0);
			const items = transaction.transaction_details
				?.map(item => {
					const price = formatCurrencyBare(item.price);
					const total = formatCurrencyBare(
						Number(item.price) * Number(item.qty)
					);
					return `${item.name.replace('&', 'and')},${
						item.qty
					},${price},${total}`;
				})
				.join(':');

			const rs = await axios.get(
				`${CAFETERIA2}/receipt?date=${date}&payment_method=${payment_method}&name=${customer}&sub_total=${subTotal}&vat=${vat}&amount=${amount}&paid=${paid}&change=${change}&items=${items}`
			);
			console.log(rs.data);
		} catch (e) {
			console.log(e);
			notifyError('could not print receipt');
		}
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-3">
						<label>From - To</label>
						<RangePicker onChange={e => dateChange(e)} />
					</div>
					<div className="form-group col-md-3">
						<label>Search</label>
						<input
							style={{ height: '32px' }}
							id="search"
							className="form-control"
							name="search"
							value={patientData}
							onChange={e => setPatientData(e.target.value)}
							placeholder="search for patient: emr id, name, phone number, email"
						/>
					</div>
					<div className="form-group col-md-2">
						<label>Payment method</label>
						<select
							style={{ height: '32px' }}
							id="status"
							className="form-control"
							name="status"
							value={paymentMethod}
							onChange={e => setPaymentMethod(e.target.value)}
						>
							<option value="">Select Method</option>
							{paymentMethods.map((item, i) => {
								return (
									<option key={i} value={item.id}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group col-md-2">
						<label>Category</label>
						<select
							style={{ height: '32px' }}
							id="category"
							className="form-control"
							name="category"
							value={category}
							onChange={e => setCategory(e.target.value)}
						>
							<option value="">Select Category</option>
							<option value="staff">Staff</option>
							<option value="patient">Patient</option>
							<option value="walk-in">Walk-in</option>
						</select>
					</div>
					<div className="form-group col-md-2 mt-4">
						<div
							className="btn btn-sm btn-primary btn-upper text-white filter-btn"
							onClick={doFilter}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</div>
					</div>
				</form>
			</div>
			<div className="element-box p-3 m-0">
				<div className="table table-responsive">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Customer</th>
										<th>Item Sold</th>
										<th>Method</th>
										<th>Type</th>
										<th>Amount</th>
										<th>Paid</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((item, i) => {
										const patient = item.patient
											? patientname(item.patient, true)
											: 'Guest';
										return (
											<tr key={i}>
												<td>
													{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
												</td>
												<td>{item.staff ? staffname(item.staff) : patient}</td>
												<td>
													{item?.transaction_details
														?.map(t => `${t.name} (${t?.qty || 1})`)
														.join(', ') || '-'}
												</td>
												<td>{item.payment_method || '--'}</td>
												<td>{startCase(item.transaction_type)}</td>
												<td>
													{item.transaction_type === 'credit'
														? formatCurrency(item.amount_paid)
														: formatCurrency(item.amount)}
												</td>
												<td>
													{item.status === 1 ? (
														<span className="badge badge-success">paid</span>
													) : item.status === 0 ? (
														<span className="badge badge-secondary">
															pending payment
														</span>
													) : (
														<span className="badge badge-secondary">owing</span>
													)}
												</td>
												<td className="row-actions">
													{
														<Tooltip title="Print Receipt">
															<a
																className="secondary"
																onClick={() => print(item)}
															>
																<i className="os-icon os-icon-printer" />
															</a>
														</Tooltip>
													}
												</td>
											</tr>
										);
									})}
									{transactions.length === 0 && (
										<tr>
											<td colSpan="7">No transactions</td>
										</tr>
									)}
								</tbody>
							</table>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalItems, 10)}
										showTotal={total => `Total ${total} transactions`}
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
		</>
	);
};

export default Transactions;
