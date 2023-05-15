import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import startCase from 'lodash.startcase';

import {
	formatDate,
	itemRender,
	request,
	staffname,
	parseNote,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

import TableLoading from '../TableLoading';

const AncVisitNotes = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const fetchNotes = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient-notes?page=${p}&limit=10&patient_id=${patient.id}&type=antenatal|anc-comment`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setNotes(result);
				setMeta(meta);
				dispatch(stopBlock());
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
				dispatch(stopBlock());
				notifyError('error fetching notes');
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchNotes();
		}
	}, [fetchNotes, loading]);

	const onNavigatePage = nextPage => {
		fetchNotes(nextPage);
	};

	return (
		<div className="m-0 w-100">
			{loading ? (
				<TableLoading />
			) : (
				<div className="table-responsive">
					<div className="dataTables_wrapper container-fluid dt-bootstrap4">
						<div className="row">
							<div className="col-sm-12">
								<table
									className="table table-striped table-lightfont dataTable"
									style={{ width: '100%' }}
								>
									<thead style={{ borderCollapse: 'collapse' }}>
										<tr>
											<th>Date</th>
											<th>Notes</th>
											<th nowrap="nowrap">Noted By</th>
										</tr>
									</thead>
									<tbody>
										{notes.map((note, i) => {
											return (
												<tr key={i} className={i % 2 === 1 ? 'odd' : 'even'}>
													<td nowrap="nowrap">
														{formatDate(note.createdAt, 'DD-MMM-YYYY h:mm A')}
													</td>
													<td>
														<div
															dangerouslySetInnerHTML={{
																__html: `<strong class="float-left mr-2"><em>${startCase(
																	note.type
																)}:</em></strong> ${parseNote(note, true)}`,
															}}
														/>
													</td>
													<td nowrap="nowrap">{staffname(note.staff)}</td>
												</tr>
											);
										})}

										{notes && notes.length === 0 && (
											<tr>
												<td colSpan="3" className="text-center">
													No Visit Notes
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
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
				</div>
			)}
		</div>
	);
};

export default AncVisitNotes;
