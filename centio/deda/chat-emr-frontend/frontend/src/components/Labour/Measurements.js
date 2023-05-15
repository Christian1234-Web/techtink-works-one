import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import TableLoading from '../TableLoading';
import { request, itemRender, formatDate } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import NewMeasurement from '../Modals/NewMeasurement';
import Measurement from '../Modals/Measurement';
import { labourAPI } from '../../services/constants';

const Measurements = ({ can_request = true, patient }) => {
	const [loading, setLoading] = useState(true);
	const [list, setList] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});
	const [showModal, setShowModal] = useState(false);
	const [showMeasurementModal, setShowMeasurementModal] = useState(false);
	const [measureItem, setMeasureItem] = useState(null);

	const dispatch = useDispatch();

	const labour = useSelector(state => state.sidepanel.item);

	const fetchMeasurements = useCallback(
		async page => {
			try {
				dispatch(startBlock());
				const p = page || 1;
				const url = `${labourAPI}/${labour.id}/measurements?page=${p}&limit=10`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setList(result);
				setMeta(meta);
				dispatch(stopBlock());
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				notifyError('error fetching measurements');
			}
		},
		[dispatch, labour]
	);

	useEffect(() => {
		if (loading) {
			fetchMeasurements();
			setLoading(false);
		}
	}, [fetchMeasurements, loading]);

	const onNavigatePage = nextPage => {
		fetchMeasurements(nextPage);
	};

	const newEntry = () => {
		setShowModal(true);
		document.body.classList.add('modal-open');
	};

	const openMeasurement = item => {
		setMeasureItem(item);
		setShowMeasurementModal(true);
		document.body.classList.add('modal-open');
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowMeasurementModal(false);
		setMeasureItem(null);
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
							New Measurement
						</a>
					)}
				</div>
				<h6 className="element-header">Labour Measurements</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Date</th>
										<th>Labour Sign</th>
										<th>Presentation</th>
										<th>Position of Foetus</th>
										<th>Fetal Lie</th>
										<th>Descent</th>
										<th>By</th>
										<th nowrap="nowrap"></th>
									</tr>
								</thead>
								<tbody>
									{list.map((item, i) => {
										return (
											<tr key={i}>
												<td nowrap="nowrap">
													{formatDate(item.createdAt, 'D-MMM-YYYY h:mm A')}
												</td>
												<td>{item.labour_sign || '--'}</td>
												<td>{item.presentation || '--'}</td>
												<td>{item.position_of_foetus || '--'}</td>
												<td>{item.fetal_lie || '--'}</td>
												<td>{item.descent || '--'}</td>
												<td>{item.createdBy}</td>
												<td nowrap="nowrap">
													<Tooltip title="open Measurement">
														<a
															className="info"
															onClick={() => openMeasurement(item)}
														>
															<i className="os-icon os-icon-eye" /> view
														</a>
													</Tooltip>
												</td>
											</tr>
										);
									})}
									{list.length === 0 && (
										<tr>
											<td colSpan="8">
												<div
													className="alert alert-info text-center"
													style={{ width: '100%' }}
												>
													No measurements found!
												</div>
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
										showTotal={total => `Total ${total} measurements`}
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
				<NewMeasurement
					closeModal={closeModal}
					labour_id={labour.id}
					patient={patient}
					update={item => setList([item, ...list])}
				/>
			)}
			{showMeasurementModal && measureItem && (
				<Measurement closeModal={closeModal} item={measureItem} />
			)}
		</div>
	);
};

export default Measurements;
