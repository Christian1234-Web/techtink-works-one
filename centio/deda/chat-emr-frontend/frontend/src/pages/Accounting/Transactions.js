import Pagination from 'antd/lib/pagination';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	itemRender,
	patientname,
	request,
	updateImmutable,
} from '../../services/utilities';
import TransactionItem from './TransactionItem';
import { notifyError } from '../../services/notify';

// NEWLY IMPORT
import waiting from '../../assets/images/waiting.gif';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

const getOptionValues = option => option.id;
const getOptionLabels = option => patientname(option, true);

const trasactionStatus = [
	{ value: 0, label: 'not Added' },
	{ value: 1, label: 'added' },
];

const pageSize = 10;

const Transactions = () => {
	const [transactionsItems, setTransactionsItems] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: pageSize,
		totalItems: 0,
	});
	const [isAdded, setIsAdded] = useState();
	const [filtering, setIsFiltering] = useState(false);

	const dispatch = useDispatch();

	const UpdateTransaction = payload => {
		const updatedList = updateImmutable(transactionsItems, payload);

		setTransactionsItems(updatedList);
	};

	const fetchTransactions = useCallback(async (page, addedToQbo) => {
		try {
			dispatch(startBlock());
			const p = page || 1;
			const added = addedToQbo || 0;
			const transactionsUrl = `transactions/qbo?isAddedToQbo=${added}&page=${p}&limit=${pageSize}`;
			// Fetch transactions
			const rs = await request(transactionsUrl, 'GET', true);
			const { result, ...meta } = rs;
			setTransactionsItems(result);
			setMeta(meta);
			setIsFiltering(false);
			dispatch(stopBlock());
		} catch (error) {
			notifyError('error fetching Transactions');
			dispatch(stopBlock());
		}
	}, []);

	useEffect(() => {
		fetchTransactions();
	}, []);

	const onNavigatePage = async nextPage => {
		fetchTransactions(nextPage, isAdded);
	};

	const doFilter = async e => {
		e.preventDefault();
		setIsFiltering(true);
		fetchTransactions(1, isAdded);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-3">
						<label>Patient</label>
						<AsyncSelect
							isClearable
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							defaultOptions
							name="patient_id"
							id="patient_id"
							// loadOptions={getOptions}
							placeholder="Search patients"
						/>
					</div>
					<div className="form-group col-md-2">
						<label>Status</label>
						<select
							style={{ height: '35px' }}
							id="status"
							value={isAdded}
							className="form-control"
							name="status"
							onChange={e => setIsAdded(e.target.value)}
						>
							<option value="">Choose status</option>
							{trasactionStatus.map((status, i) => {
								return (
									<option key={i} value={status.value}>
										{status.label}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group col-md-2 mt-4">
						<div
							className="btn btn-primary btn-upper text-white filter-btn"
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
			{/* END OF QUERY BAR */}
			<div className="element-box m-0 p-3">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>ID</th>
								<th>Date Created</th>
								<th>Patient Name</th>
								<th>bill_source</th>
								<th>Amount</th>
								<th className="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{transactionsItems.map((item, i) => {
								return (
									<TransactionItem
										key={i}
										index={i + 1}
										item={item}
										updateTransaction={UpdateTransaction}
									/>
								);
							})}
							{transactionsItems.length === 0 && (
								<tr>
									<td colSpan="10" className="text-center">
										No Transactions found!
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{meta && (
					<div className="pagination pagination-center mt-4">
						<Pagination
							current={meta.currentPage}
							pageSize={meta.itemsPerPage}
							total={meta.totalItems}
							showTotal={total => `Total ${total} transactions`}
							itemRender={itemRender}
							onChange={current => onNavigatePage(current)}
							showSizeChanger={false}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default Transactions;
