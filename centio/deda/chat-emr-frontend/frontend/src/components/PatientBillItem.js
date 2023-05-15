import React from 'react';

import { formatDate, parseSource, formatCurrency } from '../services/utilities';

const PatientBillItem = ({
	transactions,
	onChecked,
	total,
	hasChecked,
	checked,
}) => {
	return (
		<>
			{transactions.map(item => {
				const isChecked = checked?.find(c => parseInt(c.id, 10) === item.id);
				const reqItem = item.patientRequestItem;

				return (
					<tr key={item.id}>
						{hasChecked && (
							<td>
								<input
									type="checkbox"
									name="select"
									id={`select${item.id}`}
									value={item.id}
									onChange={onChecked}
									checked={!!isChecked}
								/>
							</td>
						)}
						<td nowrap="nowrap">
							{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
						</td>
						<td>
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
								{item?.bill_source === 'drugs' && (
									<>
										{` : ${reqItem.fill_quantity} ${
											reqItem.drug.unitOfMeasure
										} of ${reqItem.drugGeneric.name} (${
											reqItem.drug.name
										}) at ${formatCurrency(reqItem.drugBatch.unitPrice)} each`}
									</>
								)}
								{item?.bill_source === 'cafeteria' ? (
									<>{`: ${item?.transaction_details
										?.map(t => `${t.name} (${t?.qty || 1})`)
										.join(', ')}`}</>
								) : (
									''
								)}
							</span>
						</td>
						<td>{formatCurrency(item.amount || 0, true)}</td>
					</tr>
				);
			})}
			<tr>
				<td colSpan={hasChecked ? '3' : '2'} className="text-right">
					Total:
				</td>
				<td>{formatCurrency(total, true)}</td>
			</tr>
		</>
	);
};

export default PatientBillItem;
