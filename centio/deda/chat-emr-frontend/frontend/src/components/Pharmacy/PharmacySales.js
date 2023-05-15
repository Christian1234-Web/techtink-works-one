import React from 'react';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import { itemRender } from '../../services/utilities';

const PharmacySales = ({ drugTransactions, meta, onNavigatePage }) => {
	return (
		<>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Patient Name</th>
							<th>Patient ID</th>
							{/* <th>HMO</th> */}
							<th>Request Date</th>
							<th className="text-center">Fill Date</th>
							<th className="text-center">Drug Item</th>
							<th className="text-right">Amount</th>
							<th className="text-right">Quantity</th>
						</tr>
					</thead>
					<tbody>
						{drugTransactions?.map((transaction, index) => (
							<tr key={index}>
								<td>
									{transaction.patient.surname}{' '}
									{transaction.patient.other_names}
								</td>
								<td>{transaction.patient.id}</td>
								{/* <td>{transaction?.hmo?.name}</td> */}
								<td>
									{moment(transaction.createdAt).format('DD-MM-YYYY h:mm a')}
								</td>
								<td className="text-center">
									{moment(transaction.patientRequestItem.filled_at).format(
										'DD-MM-YYYY h:mm a'
									)}
								</td>
								<td className="text-left">
									{transaction.patientRequestItem.drugGeneric.name}
								</td>
								<td className="text-right">
									&#x20A6; {transaction.amount * -1}
								</td>
								<td className="text-right">
									{transaction.patientRequestItem.fill_quantity}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="pagination pagination-center mt-4">
				<Pagination
					current={parseInt(meta.currentPage, 10)}
					pageSize={parseInt(meta.itemsPerPage, 10)}
					total={parseInt(meta.totalItems, 10)}
					showTotal={total => `Total ${total} items`}
					itemRender={itemRender}
					onChange={current => onNavigatePage(current)}
					showSizeChanger={false}
				/>
			</div>
		</>
	);
};

export default PharmacySales;
