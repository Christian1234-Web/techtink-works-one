import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import ModalHeader from '../ModalHeader';
import {
	formatCurrency,
	formatCurrencyBare,
	formatDate,
	patientname,
	staffname,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { CAFETERIA2, VAT } from '../../services/constants';

const CafeteriaReceipt = ({ transaction, closeModal }) => {
	const [printed, setPrinted] = useState(false);

	const print = useCallback(async () => {
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
			const subTotal = formatCurrencyBare(total_amount - vat, true);
			const amount = formatCurrencyBare(total_amount);

			const paid = formatCurrencyBare(transaction.amount_paid);
			const change = formatCurrencyBare(transaction.change);
			const items = transaction.transaction_details
				?.map(item => {
					const price = formatCurrencyBare(item.price);
					const total = formatCurrencyBare(
						Number(item.price) * Number(item.qty)
					);
					return `${item.name},${item.qty},${price},${total}`;
				})
				.join(':');

			const rs = await axios.get(
				`${CAFETERIA2}/receipt?date=${date}&payment_method=${payment_method}&name=${customer}&sub_total=${subTotal}&vat=${vat}&amount=${amount}&paid=${paid}&change=${change}&items=${items}`
			);
			console.log(rs.data);
			setPrinted(true);
		} catch (e) {
			setPrinted(true);
			console.log(e);
			notifyError('could not print receipt');
		}
	}, [transaction]);

	useEffect(() => {
		if (!printed) {
			print();
		}
	}, [print, printed]);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '420px' }}
			>
				<div className="modal-content text-center">
					<ModalHeader
						title="Cafeteria Receipt"
						closeModal={() => closeModal()}
					/>
					<div className="onboarding-content with-gradient">
						<center className="reciept-header">
							<div className="">
								<img
									width="45%"
									src={require('../../assets/images/logo.png')}
									alt="logo"
								/>
							</div>
						</center>
						<div className="reciept-address mt-4">
							<p style={{ fontSize: '13px' }}>
								Plot 1847, Cadastral Zone B07, Katampe Road, Abuja.
								dedahospital.com.ng <br /> 0818 422 7707, 0818 755 7344, 0808
								233 7758
							</p>
						</div>
						<table className="table table-striped table-sm">
							<tbody>
								<tr>
									<td className="text-left">Date</td>
									<td className="text-right">
										<span>
											{formatDate(transaction.createdAt, 'DD-MMM-YYYY h:mm a')}
										</span>
									</td>
								</tr>
								<tr>
									<td className="text-left">Sold To</td>
									<td className="text-right">
										<span>
											{transaction.dedastaff
												? staffname(transaction.dedastaff)
												: ''}
											{transaction.patient
												? patientname(transaction.patient)
												: ''}
											{!transaction.staff && !transaction.patient
												? 'Guest'
												: ''}
										</span>
									</td>
								</tr>
								<tr>
									<td className="text-left">Payment Method</td>
									<td className="text-right">
										<span>{transaction.payment_method}</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="element-box-tp">
							<table className="table table-sm">
								<thead>
									<tr>
										<th>Item</th>
										<th>Qty</th>
										<th>Amount(&#x20A6;)</th>
										<th className="text-right">Total(&#x20A6;)</th>
									</tr>
								</thead>
								<tbody>
									{transaction.transaction_details?.map((item, i) => (
										<tr key={i}>
											<td>{item.name}</td>
											<td>{item.qty}</td>
											<td>{formatCurrency(item.price)}</td>
											<td className="text-right">
												{formatCurrency(Number(item.price) * Number(item.qty))}
											</td>
										</tr>
									))}
									<tr>
										<td colSpan="3" className="text-right">
											Total:
										</td>
										<td className="text-right text-bold">
											{formatCurrency(transaction.amount, true)}
										</td>
									</tr>
									<tr>
										<td colSpan="3" className="text-right">
											Amount Paid:
										</td>
										<td className="text-right text-bold">
											{formatCurrency(transaction.amount_paid)}
										</td>
									</tr>
									<tr>
										<td colSpan="3" className="text-right">
											Change:
										</td>
										<td className="text-right text-bold">
											{formatCurrency(transaction.change)}
										</td>
									</tr>
								</tbody>
							</table>
							<div>
								<p className="justify-center">
									<strong>Thanks for your patronage!</strong>
								</p>
							</div>
						</div>
						<div className="text-right">
							<button
								className="btn btn-primary btn-sm mx-3"
								type="button"
								onClick={() => print()}
							>
								<i className="icon-feather-printer" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CafeteriaReceipt;
