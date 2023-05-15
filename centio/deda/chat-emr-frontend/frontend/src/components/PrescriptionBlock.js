/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';

import TableLoading from './TableLoading';
import ProfilePopup from './Patient/ProfilePopup';
import { patientname } from '../services/utilities';
import ViewPrescription from './Pharmacy/ViewPrescription';
import { toggleProfile } from '../actions/user';
import { startBlock, stopBlock } from '../actions/redux-block';
import { request, formatDate } from '../services/utilities';
import { notifyError } from '../services/notify';
import Admitted from './Admitted';

const PrescriptionBlock = ({
	loading,
	patient,
	prescriptions,
	updatePrescriptions,
	removePrescription,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [prescription, setPrescription] = useState(null);

	const dispatch = useDispatch();

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
		setPrescription(null);
	};

	const showProfile = patient => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			dispatch(toggleProfile(true, info));
		}
	};

	const doPrint = async regimen => {
		try {
			dispatch(startBlock());
			const url = `requests/${regimen.id}/print?type=drugs&print_group=1`;
			const rs = await request(url, 'GET', true);
			window.open(rs.file, '_blank');
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError('Error printing regimen request');
			dispatch(stopBlock());
		}
	};

	const blastPrompt = async patient => {
		try {
			dispatch(startBlock());
			const url = `front-desk/queue-system/prompt/?patient_id=${patient.id}&type=pharmacy`;
			await request(url, 'GET', true);
			dispatch(stopBlock());
		} catch (e) {
			notifyError('Something went wrong');
			dispatch(stopBlock());
		}
	};

	return loading ? (
		<TableLoading />
	) : (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Request Date</th>
						<th>ID</th>
						{!patient && <th>Patient</th>}
						{!patient && <th>Insurance</th>}
						<th>Requested By</th>
						<th>Filled By</th>
						<th className="text-center">Request Status</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{prescriptions.map((request, i) => {
						return (
							<tr key={i}>
								<td nowrap="nowrap">
									{formatDate(request.created_at, 'DD-MMM-YYYY h:mmA')}
								</td>
								<td>{request.group_code || ''}</td>
								{!patient && (
									<td>
										<p className="item-title text-color m-0">
											<Tooltip
												title={<ProfilePopup patient={request.patient} />}
											>
												<a
													className="cursor"
													onClick={() => showProfile(request.patient)}
												>
													{patientname(request.patient, true)}
												</a>
											</Tooltip>
											{request.admission && (
												<Tooltip
													title={<Admitted room={request?.admission?.room} />}
												>
													<i className="fa fa-hospital-o text-danger ml-1" />
												</Tooltip>
											)}
											{request.patient.nicu_id && (
												<Tooltip
													title={<Admitted room={request?.admission?.room} />}
												>
													<i className="fa fa-hospital-o text-danger ml-1" />
												</Tooltip>
											)}
										</p>
									</td>
								)}
								{!patient && <td>{request.patient.hmo.name}</td>}
								<td>{request.created_by || '--'}</td>
								<td>{request.filled_by || '--'}</td>
								<td className="text-center">
									{request.status === 0 && request.filled === 0 && (
										<span className="badge badge-warning">Pending</span>
									)}
									{request.transaction_status === 0 &&
										request.status === 0 &&
										request.filled === 1 && (
											<span className="badge badge-info text-white">
												Awaiting Payment
											</span>
										)}
									{request.transaction_status === 1 && request.status === 0 && (
										<span className="badge badge-secondary">
											Awaiting Dispense
										</span>
									)}
									{request.status === 1 && (
										<span className="badge badge-success">Completed</span>
									)}
								</td>
								<td className="row-actions">
									<Tooltip title="View Prescription">
										<a
											className="info"
											onClick={() => {
												document.body.classList.add('modal-open');
												setPrescription(request);
												setShowModal(true);
											}}
										>
											<i className="os-icon os-icon-eye" />
										</a>
									</Tooltip>
									{request.filled === 1 && (
										<Tooltip title="Print Prescription">
											<a className="ml-2" onClick={() => doPrint(request)}>
												<i className="icon-feather-printer" />
											</a>
										</Tooltip>
									)}
										<Tooltip title="Call Patient">
											<a
												onClick={() => blastPrompt(request.patient)}
												className="text-primary"
											>
												<i className="os-icon os-icon-volume-2" />
											</a>
										</Tooltip>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{showModal && (
				<ViewPrescription
					prescription={prescription}
					closeModal={closeModal}
					updatePrescriptions={updatePrescriptions}
					removePrescription={removePrescription}
					doPrint={doPrint}
				/>
			)}
		</>
	);
};

export default PrescriptionBlock;
