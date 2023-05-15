import moment from 'moment';
import React from 'react';
import { notifyError, notifySuccess } from '../../services/notify';
import {
	formatCurrency,
	parseSource,
	patientname,
	QuickBooksrequest,
} from '../../services/utilities';

const TransactionItem = ({ item, index, updateTransaction }) => {
	const getCookie = cookieName => {
		let cookie = {};
		document.cookie.split(';').forEach(function (el) {
			let [key, value] = el.split('=');
			cookie[key.trim()] = value;
		});
		return cookie[cookieName];
	};

	const submitToQbo = async transaction => {
		const bill = {
			type: 'salesreceipt',
			id: transaction.id,
			note: 'Usual Payment',
			method: 'Cash',
		};
		const qbo = {
			realmId: getCookie('realmId'),
			access_token: getCookie('access_token'),
			refresh_token: getCookie('refresh_token'),
			code: getCookie('code'),
			state: getCookie('state'),
			id_token: getCookie('id_token'),
		};

		const qboSubmitUrl = 'accounts/qbo/report/save';

		try {
			// Add transaction to quick books
			const rs = await QuickBooksrequest(qboSubmitUrl, bill, qbo);

			if (rs.link) {
				window.location.href = rs.link;
			}
			if (!rs.success) {
				notifyError(rs.message);
			} else {
				notifySuccess('Added To QuickBooks');
				updateTransaction(rs.transaction);
			}
			console.log(rs);
		} catch (error) {
			notifyError(error.message);
			console.log('fetch error:- ', error);
		}
	};

	const reqItem = item.patientRequestItem;

	return (
		<tr>
			<td>{index}</td>
			<td style={{ width: '120px' }}>
				{moment(item.createdAt).format('DD-MM-YYYY H:mma')}
			</td>
			<td>{patientname(item.patient, true)}</td>
			<td>
				<div className="flex">
					<span className="text-capitalize">
						<span className="text-capitalize">
							<strong>{parseSource(item.bill_source)}</strong>
							{(item?.bill_source === 'ward' ||
								item?.bill_source === 'nicu-accommodation' ||
								item?.bill_source === 'credit-deposit' ||
								item?.bill_source === 'debit-charge') &&
								`: ${item.description}`}
							{(item?.bill_source === 'consultancy' ||
								item?.bill_source === 'labs' ||
								item?.bill_source === 'scans' ||
								item?.bill_source === 'procedure' ||
								item?.bill_source === 'nursing-service') &&
							item.service?.item?.name
								? `: ${item.service?.item?.name}`
								: ''}
							{item?.bill_source === 'drugs' && reqItem ? (
								<>
									{` : ${reqItem.fill_quantity} ${
										reqItem.drug.unitOfMeasure
									} of ${reqItem.drugGeneric.name} (${
										reqItem.drug.name
									}) at ${formatCurrency(reqItem.drugBatch.unitPrice)} each`}
								</>
							) : (
								''
							)}
						</span>
					</span>
				</div>
			</td>
			<td style={{ width: '120px' }}>{Math.abs(item.amount)}</td>
			<td className="row-actions">
				{item.isAddedToQbo ? (
					<span className="badge badge-success">Added</span>
				) : (
					<a
						className="primary"
						title="Add QuickBooks"
						onClick={() => submitToQbo(item)}
					>
						<i className="os-icon os-icon-check-circle" />
					</a>
				)}
			</td>
		</tr>
	);
};

export default TransactionItem;
