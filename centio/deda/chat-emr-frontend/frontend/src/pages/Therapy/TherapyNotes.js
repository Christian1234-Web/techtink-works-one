import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';
import { notifyError } from '../../services/notify';
import {
	formatDate,
	itemRender,
	request,
	staffname,
} from '../../services/utilities';

import Pagination from 'antd/lib/pagination';

const TherapyNotes = () => {
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const dispatch = useDispatch();

	const fetchNotes = useCallback(
		async page => {
			const p = page || 1;

			try {
				dispatch(startBlock());
				const url = `patient-notes?page=${p}&limit=10&type=nurse-observation`;

				const rs = await request(url, 'GET', true);
				console.log('fhhhf', rs);
				const { result, ...meta } = rs;
				setNotes(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching notes');
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (loading) {
			fetchNotes();
			setLoading(false);
		}
	}, [fetchNotes, loading]);

	const onNavigatePage = nextPage => {
		fetchNotes(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Note</th>
										<th nowrap="nowrap">Noted By</th>
									</tr>
								</thead>
								<tbody>
									{notes.map((item, i) => {
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>
													<div
														dangerouslySetInnerHTML={{
															__html: item.description,
														}}
													/>
												</td>
												<td nowrap="nowrap">{staffname(item.staff)}</td>
											</tr>
										);
									})}

									{notes && notes.length === 0 && (
										<tr>
											<td colSpan="3" className="text-center">
												No Therapy Notes
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
										showTotal={total => `Total ${total} notes`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TherapyNotes;
