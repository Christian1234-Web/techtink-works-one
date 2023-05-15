import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import {
	request,
	itemRender,
	formatDate,
	parseNote,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import CreateGynaeNote from '../Modals/CreateGynaeNote';
import { staffname } from '../../services/utilities';

const GynaeHistory = ({ patient, can_request = true }) => {
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const antenatal = useSelector(state => state.sidepanel.item);

	const fetchNotes = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `patient-notes?page=${p}&limit=10&antenatal_id=${antenatal.id}&type=patient-history&category=gynaeHistory`;
				const rs = await request(url, 'GET', true);
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
		[dispatch, antenatal]
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

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	const updateNote = item => {
		setNotes([item, ...notes]);
		setMeta({
			currentPage: 1,
			itemsPerPage: 10,
			totalPages: notes.length + 1,
		});
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{can_request && (
						<a
							className="btn btn-sm btn-secondary text-white ml-3"
							onClick={() => newEntry()}
						>
							Add Record
						</a>
					)}
				</div>
				<h6 className="element-header">Gynaecological History</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Data</th>
										<th nowrap="nowrap">By</th>
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
															__html: parseNote(item),
														}}
													/>
												</td>
												<td nowrap="nowrap">{staffname(item.staff)}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} items`}
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
			{showModal && (
				<CreateGynaeNote
					closeModal={closeModal}
					updateNote={updateNote}
					antenatal_id={antenatal.id}
					patient={patient}
					type="patient-history"
				/>
			)}
		</div>
	);
};

export default GynaeHistory;
