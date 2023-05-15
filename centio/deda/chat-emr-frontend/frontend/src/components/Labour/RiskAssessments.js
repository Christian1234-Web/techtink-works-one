import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableLoading from '../TableLoading';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import NewAssessment from '../Modals/NewAssessment';
import { labourAPI } from '../../services/constants';

const RiskAssessments = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [assessment, setAssessment] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const labour = useSelector(state => state.sidepanel.item);

	const fetchAssessments = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `${labourAPI}/${labour.id}/risk-assessments`;
			const rs = await request(url, 'GET', true);
			setAssessment(rs.risk_assessment || null);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching risk assessments');
		}
	}, [dispatch, labour]);

	useEffect(() => {
		if (loading) {
			fetchAssessments();
			setLoading(false);
		}
	}, [fetchAssessments, loading]);

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{assessment === null && (
						<a
							className="btn btn-sm btn-secondary text-white ml-3"
							onClick={() => newEntry()}
						>
							Take Risk Assessment
						</a>
					)}
				</div>
				<h6 className="element-header">Risk Assessment</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-hover">
								<tbody>
									<tr>
										<th style={{ width: '40%' }}>Risk Score:</th>
										<td>{assessment?.risk_score || '--'}</td>
									</tr>
									<tr>
										<th>Height (cm):</th>
										<td>{assessment?.height || '--'}</td>
									</tr>
									<tr>
										<th>Weight (kg):</th>
										<td>{assessment?.weight || '--'}</td>
									</tr>
									<tr>
										<th>Outcome of previous pregnancy:</th>
										<td>{assessment?.previous_pregnancy_outcome || '--'}</td>
									</tr>
									<tr>
										<th>History of low birth weight:</th>
										<td>{assessment?.history_low_birth_weight || '--'}</td>
									</tr>
									<tr>
										<th>Experience in previous pregnancies:</th>
										<td>
											{assessment?.previous_pregnancy_experience
												? assessment?.previous_pregnancy_experience
												: '--'}
										</td>
									</tr>
									<tr>
										<th>Note:</th>
										<td>{assessment?.note || '--'}</td>
									</tr>
									<tr>
										<th>Recorded by:</th>
										<td>{assessment?.createdBy || '--'}</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
			{showModal && (
				<NewAssessment
					closeModal={closeModal}
					labour_id={labour.id}
					patient={patient}
					update={item => setAssessment(item)}
				/>
			)}
		</div>
	);
};

export default RiskAssessments;
