import moment from 'moment';
import React from 'react';

import { formatDate } from '../../services/utilities';

import ModalHeader from '../ModalHeader';

const ModalLeaveRequest = ({ leave, closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content">
					<ModalHeader title="Leave Request" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<div className="element-box m-0 p-3">
							<table className="table table-striped">
								<tbody>
									<tr>
										<th>Leave Category</th>
										<td>{leave?.category?.name}</td>
									</tr>
									<tr>
										<th>Start Date</th>
										<td>{formatDate(leave.start_date, 'DD-MMM-YYYY')}</td>
									</tr>
									<tr>
										<th>End Date</th>
										<td>{formatDate(leave.end_date, 'DD-MMM-YYYY')}</td>
									</tr>
									<tr>
										<th>Leave Duration</th>
										<td>
											{moment(leave.end_date).diff(
												moment(leave.start_date),
												'd'
											)}{' '}
											Days
										</td>
									</tr>
									<tr>
										<th>Leave Reason</th>
										<td>{leave?.application}</td>
									</tr>
									<tr>
										<th>Status</th>
										<td>
											{leave.status >= 1 && (
												<span className="badge badge-success">Approved</span>
											)}
											{leave.status === 0 && (
												<span className="badge badge-warning">Pending</span>
											)}
											{leave.status === -1 && (
												<span className="badge badge-danger">Declined</span>
											)}
										</td>
									</tr>
									{leave.decline_reason && leave.decline_reason !== '' && (
										<tr>
											<th>Decline Reason</th>
											<td>{leave?.decline_reason}</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalLeaveRequest;
