/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';

import {
	request,
	staffname,
	confirmAction,
	formatCurrency,
	patientname,
	parseSource,
	updateImmutable,
	print,
	billItem,
	formatCurrencyBare,
} from '../services/utilities';
import { deleteTransaction, loadTransactions } from '../actions/transaction';
import { notifyError, notifySuccess } from '../services/notify';
import ModalShowTransactions from './Modals/ModalShowTransactions';
import ModalApproveTransaction from './Modals/ModalApproveTransaction';
import Admitted from './Admitted';
import NicuAdmitted from './NicuAdmitted';
import { startBlock, stopBlock } from '../actions/redux-block';
import { hasDeleteTransactionPermission } from '../permission-utils/paypoint';

const TransactionTable = ({ transactions, showActionBtns, queue }) => {
	const [showTransactions, setShowTransactions] = useState(false);
	const [transaction, setTransaction] = useState(null);
	const [patient, setPatient] = useState(null);
	const [processTransaction, setProcessTransaction] = useState(false);

	const dispatch = useDispatch();

	const staff = useSelector(state => state.user.profile);

	const doApproveTransaction = item => {
		document.body.classList.add('modal-open');
		setTransaction(item);
		setProcessTransaction(true);
	};

	const deleteTask = async data => {
		try {
			dispatch(startBlock());
			const url = `transactions/${data.id}`;
			await request(url, 'DELETE', true);
			dispatch(deleteTransaction(data));
			notifySuccess(`Transaction deleted!`);
			dispatch(stopBlock());
		} catch (err) {
			console.log(err);
			dispatch(stopBlock());
			notifyError(`${err.message}`);
		}
	};

	const confirmDelete = data => {
		confirmAction(deleteTask, data);
	};

	const showList = patient => {
		document.body.classList.add('modal-open');
		setShowTransactions(true);
		setPatient(patient);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setProcessTransaction(false);
		setShowTransactions(false);
		setTransaction(null);
		setPatient(null);
	};

	const sendToQueue = async transaction => {
		confirmAction(
			onSendToQueue,
			transaction,
			'You are about to push this patient to vitals queue without taking payment.'
		);
	};

	const onSendToQueue = async transaction => {
		try {
			dispatch(startBlock());
			const data = {
				patient_id: transaction.patient?.id,
			};
			const url = `transactions/${transaction.id}/skip-to-queue`;
			const rs = await request(url, 'POST', true, data);
			if (rs.success && rs.appointment) {
				const newTransactions = updateImmutable(transactions, {
					...transaction,
					appointment: rs.appointment,
				});
				dispatch(loadTransactions(newTransactions));
				dispatch(stopBlock());
				notifySuccess('Patient has been vitals queued');
			} else {
				dispatch(stopBlock());
				notifyError(rs.message || 'Could not add patient to queue');
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError('Could not add patient to queue');
		}
	};

	const doPrint = async transaction => {
		const itemName = billItem(transaction);

		const total_amount = Math.abs(Number(transaction.amount));

		const items =
			transaction?.bill_source === 'cafeteria'
				? transaction?.transaction_details
						?.map(item => {
							const price = formatCurrencyBare(item.price);
							const total = formatCurrencyBare(
								Number(item.price) * Number(item.qty)
							);
							return `${item.name},${item.qty},${price},${total}`;
						})
						.join(':')
				: `${itemName.replace(',', ' - ')},1,${total_amount},${total_amount}`;

		await print(transaction, items);
	};

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>DATE</th>
						<th>PATIENT NAME</th>
						<th>SERVICE</th>
						<th>AMOUNT (&#x20A6;)</th>
						<th>PAYMENT STATUS</th>
						{!queue && <th>TYPE</th>}
						{!queue && <th>RECEIVED By</th>}
						<th className="text-center">ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => {
						const reqItem = transaction.patientRequestItem;
						return (
							<tr key={index}>
								<td nowrap="nowrap">
									{moment(transaction.createdAt).format('DD-MM-YYYY h:mm a')}
								</td>
								<td>
									{transaction.patient && (
										<a onClick={() => showList(transaction.patient)}>
											{patientname(transaction.patient, true)}
											{transaction.admission && (
												<Tooltip
													title={
														<Admitted room={transaction?.admission?.room} />
													}
												>
													<i className="fa fa-hospital-o text-danger" />
												</Tooltip>
											)}
											{transaction.patient?.nicu_id && (
												<Tooltip
													title={
														<NicuAdmitted room={transaction?.nicu?.room} />
													}
												>
													<i className="fa fa-hospital-o text-danger" />
												</Tooltip>
											)}
										</a>
									)}
									{transaction.dedastaff
										? staffname(transaction.dedastaff)
										: ''}
									{!transaction.patient && !transaction.dedastaff
										? 'Guest'
										: ''}
								</td>
								<td>
									<div className="flex">
										<span className="text-capitalize">
											<span className="text-capitalize">
												<strong>{parseSource(transaction.bill_source)}</strong>
												{(transaction?.bill_source === 'ward' ||
													transaction?.bill_source === 'nicu-accommodation' ||
													transaction?.bill_source === 'credit-deposit' ||
													transaction?.bill_source === 'debit-charge') &&
													`: ${transaction.description}`}
												{(transaction?.bill_source === 'consultancy' ||
													transaction?.bill_source === 'labs' ||
													transaction?.bill_source === 'scans' ||
													transaction?.bill_source === 'procedure' ||
													transaction?.bill_source === 'nursing-service') &&
												transaction.service?.item?.name
													? `: ${transaction.service?.item?.name}`
													: ''}
												{transaction?.bill_source === 'drugs' && (
													<>
														{` : ${reqItem?.fill_quantity} ${
															reqItem?.drug?.unitOfMeasure || '--'
														} of ${reqItem?.drugGeneric?.name || '--'} (${
															reqItem?.drug?.name || '--'
														}) at ${formatCurrency(
															reqItem?.drugBatch?.unitPrice || '--'
														)} each`}
													</>
												)}
												{transaction?.bill_source === 'cafeteria' ? (
													<>{`: ${transaction?.transaction_details
														?.map(t => `${t.name} (${t?.qty || 1})`)
														.join(', ')}`}</>
												) : (
													''
												)}
											</span>
										</span>
									</div>
								</td>
								<td>
									{transaction.status !== 1 &&
										formatCurrency(transaction.amount, true)}
									{transaction.status === 1 &&
										transaction.amount_paid <= 0 &&
										formatCurrency(transaction.amount)}
									{transaction.status === 1 && transaction.amount_paid > 0 && (
										<>
											{Math.abs(transaction.amount) -
												Math.abs(transaction.amount_paid) !==
											0 ? (
												<>
													<>{formatCurrency(transaction.amount)}</>
													<br />
													<span className="badge badge-secondary">
														<small>{`PAID: ${formatCurrency(
															transaction.amount_paid
														)}`}</small>
													</span>
												</>
											) : (
												formatCurrency(transaction.amount_paid)
											)}
										</>
									)}
								</td>
								<td>
									{transaction.status === 1 && (
										<>
											{transaction.payment_method || ''}
											{transaction.payment_method && <br />}
										</>
									)}
									{transaction.status === 0 && (
										<span className="badge badge-secondary text-white">
											pending
										</span>
									)}
									{transaction.status === -1 && (
										<span className="badge badge-info text-white">pending</span>
									)}
									{transaction.status === 1 && (
										<span className="badge badge-success">paid</span>
									)}
								</td>
								{!queue && <td>{transaction.transaction_type || '--'}</td>}
								{!queue && (
									<>
										{transaction.transaction_type === 'debit' ? (
											<td>
												{transaction.staff
													? staffname(transaction.staff)
													: '--'}
											</td>
										) : (
											<td>
												{transaction.cashier
													? staffname(transaction.cashier)
													: '--'}
											</td>
										)}
									</>
								)}
								<td nowrap="nowrap" className="text-center row-actions">
									{showActionBtns && (
										<>
											{transaction.payment_type !== 'HMO' &&
												(transaction.status === 0 ||
													transaction.status === -1) && (
													<Tooltip title="Confirm Payment">
														<a
															className="secondary"
															onClick={() => doApproveTransaction(transaction)}
														>
															<i className="os-icon os-icon-thumbs-up" />
														</a>
													</Tooltip>
												)}
											{transaction.bill_source === 'consultancy' &&
												transaction.appointment &&
												transaction.appointment.status ===
													'Pending Paypoint Approval' &&
												(transaction.status === 0 ||
													transaction.status === -1) && (
													<Tooltip title="Send To Vitals">
														<a
															className="primary"
															onClick={() => sendToQueue(transaction)}
														>
															<i className="os-icon os-icon-mail-18" />
														</a>
													</Tooltip>
												)}
											{(transaction.status === 0 ||
												transaction.status === -1) &&
												hasDeleteTransactionPermission(staff.permissions) && (
													<Tooltip title="Delete Transactions">
														<a
															className="text-danger"
															onClick={() => confirmDelete(transaction)}
														>
															<i className="os-icon os-icon-ui-15" />
														</a>
													</Tooltip>
												)}
										</>
									)}
									{transaction.status === 1 &&
										transaction.transaction_type === 'credit' && (
											<Tooltip title="Print">
												<a
													className="text-info"
													onClick={async () => doPrint(transaction)}
												>
													<i className="os-icon os-icon-printer" />
												</a>
											</Tooltip>
										)}
								</td>
							</tr>
						);
					})}
					{transactions.length === 0 && (
						<tr className="text-center">
							<td colSpan={!queue ? '9' : '7'}>No transactions</td>
						</tr>
					)}
				</tbody>
			</table>
			{showTransactions && patient && (
				<ModalShowTransactions
					patient={patient}
					closeModal={() => closeModal()}
				/>
			)}
			{processTransaction && transaction && (
				<ModalApproveTransaction
					transaction={transaction}
					closeModal={() => closeModal()}
				/>
			)}
		</>
	);
};

export default TransactionTable;
