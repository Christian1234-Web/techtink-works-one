/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { paginate } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError } from '../../services/notify';

const List = () => {
	const [vendors, setVendors] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const loadItems = useCallback(
		async (page, q, staffId) => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `inventory/vendors?page=${p}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setVendors(result);
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError('Error while fetching requisitions');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			loadItems();
		}
	}, [loadItems, loaded]);

	const onNavigatePage = async nextPage => {
		await loadItems(nextPage);
	};

	return (
		<>
			<div className="element-box m-0 mb-4 p-3">
				<div className="table table-responsive">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<table className="table table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Created At</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{vendors.map((item, i) => {
										return (
											<tr key={i}>
												<td>{item.id}</td>
												<td>{item.name}</td>
												<td>
													{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm a')}
												</td>
												<td className="row-actions"></td>
											</tr>
										);
									})}
									{vendors.length === 0 && (
										<tr>
											<td colSpan="6" className="text-center">
												No vendors found!
											</td>
										</tr>
									)}
								</tbody>
							</table>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} vendors`}
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

export default List;
