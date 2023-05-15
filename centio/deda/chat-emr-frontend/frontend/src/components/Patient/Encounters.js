import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import {
	request,
	formatDate,
	staffname,
	itemRender,
	updateImmutable,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import ViewEncounter from './Modals/ViewEncounter';
import EncounterNote from './Modals/EncounterNote';
import TableLoading from '../TableLoading';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Encounters = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState(null);
	const [encounter, setEnconter] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showNoteModal, setShowNoteModal] = useState(false);

	const dispatch = useDispatch();

	const fetchEncounters = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `consultation/encounters?patient_id=${patient.id}&page=${p}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setList(result);
				setMeta(meta);
				setLoading(false);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching encounters');
			}
		},
		[dispatch, patient]
	);

	useEffect(() => {
		if (loading) {
			fetchEncounters();
		}
	}, [fetchEncounters, loading]);

	const onNavigatePage = nextPage => {
		fetchEncounters(nextPage);
	};

	const viewEncounter = item => {
		document.body.classList.add('modal-open');
		setEnconter(item);
		setShowModal(true);
	};

	const newNote = item => {
		document.body.classList.add('modal-open');
		setEnconter(item);
		setShowNoteModal(true);
	};

	const closeModal = () => {
		setEnconter(null);
		setShowModal(false);
		setShowNoteModal(false);
		document.body.classList.remove('modal-open');
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<h6 className="element-header">Encounters</h6>
				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Date</th>
											<th>Department</th>
											<th>Specialization</th>
											<th>Staff</th>
											<th className="text-center"></th>
										</tr>
									</thead>
									<tbody>
										{list.map((item, i) => {
											return (
												<tr key={i}>
													<td>
														{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm A')}
													</td>
													<td>{item?.appointment?.department?.name || '--'}</td>
													<td>
														{item?.appointment?.service?.item?.name || '--'}
													</td>
													<td>{staffname(item.staff)}</td>
													<td className="row-actions">
														{!item.encounter_note && (
															<a
																className="btn btn-secondary text-white"
																onClick={() => newNote(item)}
															>
																add note
															</a>
														)}
														<a onClick={() => viewEncounter(item)}>
															<i className="os-icon os-icon-eye"></i>
														</a>
														{/* <a onClick={() => print(item)}>
															<i className="os-icon os-icon-printer"></i>
														</a> */}
													</td>
												</tr>
											);
										})}
										{list.length === 0 && (
											<tr className="text-center">
												<td colSpan="5">No Encounters</td>
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
											showTotal={total => `Total ${total} encounters`}
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
			</div>
			{showModal && (
				<ViewEncounter encounter={encounter} closeModal={closeModal} />
			)}
			{showNoteModal && (
				<EncounterNote
					encounter={encounter}
					closeModal={closeModal}
					updateItems={item => setList(updateImmutable(list, item))}
				/>
			)}
		</div>
	);
};

export default Encounters;
