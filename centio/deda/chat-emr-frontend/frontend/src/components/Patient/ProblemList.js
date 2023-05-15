import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';

import { notifyError } from '../../services/notify';
import {
	confirmAction,
	formatDate,
	getPageList,
	itemRender,
	request,
	updateImmutable,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../TableLoading';
import RecordProblem from '../Modals/RecordProblem';
import { messageService } from '../../services/message';
import { paginate, patientAPI } from '../../services/constants';

const ProblemList = ({ patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState({ ...paginate, itemsPerPage: 10 });
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const fetchProblems = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const url = `${patientAPI}/${patient.id}/diagnoses?group_by=code`;
				const rs = await request(url, 'GET', true);
				const p = page || 1;
				setMeta({ ...meta, currentPage: p, totalPages: rs.length });
				const items = getPageList(rs, meta.itemsPerPage, p);
				setList(items);
				setLoaded(true);
				dispatch(stopBlock());
			} catch (e) {
				setLoaded(true);
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch problems');
			}
		},
		[dispatch, meta, patient]
	);

	useEffect(() => {
		if (!loaded) {
			fetchProblems();
		}
	}, [fetchProblems, loaded]);

	const addProblem = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
	};

	const updateList = items => {
		console.log(items);
		setList([...items, ...list]);
		const critical = items.find(i => i?.alertItem?.category === 'critical');
		if (critical) {
			messageService.sendMessage({ type: 'refresh-alert' });
		}
	};

	const resolve = async id => {
		confirmAction(
			doResolve,
			id,
			'Do you want to resolve this problem?',
			'Are you sure?'
		);
	};

	const doResolve = async id => {
		try {
			dispatch(startBlock());
			const url = `patient-notes/${id}/resolve`;
			const rs = await request(url, 'POST', true);
			dispatch(stopBlock());
			if (rs.success) {
				setList(updateImmutable(list, { ...rs.data, id }));
			} else {
				notifyError(rs.message || 'could not resolve problem');
			}
		} catch (e) {
			setLoaded(true);
			dispatch(stopBlock());
			notifyError(e.message || 'could not resolve problem');
		}
	};

	const onNavigatePage = async nextPage => {
		await fetchProblems(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<a
						className="btn btn-sm btn-secondary text-white"
						onClick={() => addProblem()}
					>
						Add Diagnosis
					</a>
				</div>
				<h6 className="element-header">Problem List</h6>
				<div className="element-box p-3 m-0">
					{!loaded ? (
						<TableLoading />
					) : (
						<>
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Diagnosis</th>
											<th>Type</th>
											<th>Comment</th>
											<th>Consultant</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item, i) => {
											return (
												<tr key={i}>
													<td>{`${item.diagnosis.type.toUpperCase()} (${
														item.diagnosis.code
													}): ${item.diagnosis.description}`}</td>
													<td>{item.diagnosis_type}</td>
													<td>{item.comment || ''}</td>
													<td>{item.createdBy}</td>
													<td>
														{item.status === 'Active' ? (
															<>
																{item.status} |{' '}
																<a onClick={() => resolve(item.id)}>Resolve</a>
															</>
														) : (
															<>
																{item.status}
																<br />
																<small className="bold">{`by ${item.resolved_by}`}</small>{' '}
																on{' '}
																<small className="bold">
																	{formatDate(item.resolved_at, 'DD-MMM-YYYY')}
																</small>
															</>
														)}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} problems`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
										showSizeChanger={false}
									/>
								</div>
							)}
						</>
					)}
				</div>
				{showModal && (
					<RecordProblem
						patient={patient}
						closeModal={closeModal}
						update={updateList}
					/>
				)}
			</div>
		</div>
	);
};

export default ProblemList;
