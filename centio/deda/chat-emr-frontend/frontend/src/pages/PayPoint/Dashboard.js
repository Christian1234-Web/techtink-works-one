/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { itemRender, request } from '../../services/utilities';
import { loadTransactions } from '../../actions/transaction';
import TransactionTable from '../../components/TransactionTable';
import TableLoading from '../../components/TableLoading';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [meta, setMeta] = useState(null);

	const transactions = useSelector(state => state.transaction.transactions);

	const dispatch = useDispatch();

	const fetchTransactions = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const today = moment().format('YYYY-MM-DD');
				const url = `transactions?page=${p}&patient_id=&startDate=${today}&endDate=${today}&service_id=&status=`;
				const rs = await request(url, 'GET', true);
				console.log(rs);
				const { result, ...meta } = rs;
				setMeta(meta);
				dispatch(loadTransactions(result));
				setLoading(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				setLoading(false);
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (loading) {
			fetchTransactions();
		}
	}, [fetchTransactions, loading]);

	const onNavigatePage = nextPage => {
		console.log(nextPage);
		fetchTransactions(nextPage);
	};

	return (
		<>
			<h6 className="element-header">
				Today's Transactions ({moment().format('DD-MMM-YYYY')})
			</h6>
			<div className="element-box p-3 m-0">
				<div className="table-responsive">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<TransactionTable
								transactions={transactions}
								showActionBtns={true}
								queue={false}
							/>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
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

export default Dashboard;
