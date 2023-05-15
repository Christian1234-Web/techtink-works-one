/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useDispatch } from 'react-redux';
import truncate from 'lodash.truncate';

import { toggleProfile } from '../../actions/user';
import {
	getAge,
	staffname,
	patientname,
	formatDate,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { request } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';
import { messageService } from '../../services/message';

const VitalsQueue = () => {
	const [loading, setLoading] = useState(true);
	const [queues, setQueues] = useState([]);
	const dispatch = useDispatch();

	const fetchQueue = useCallback(async () => {
		try {
			const url = 'front-desk/queue-system/get-vitals-queue-lists';
			const rs = await request(url, 'GET', true);
			setQueues(rs);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		if (loading) {
			fetchQueue();
		}
	}, [loading, fetchQueue]);

	useEffect(() => {
		const subscription = messageService.getMessage().subscribe(message => {
			const { type, data } = message.text;
			if (type === 'nursing-queue') {
				setQueues([...queues, data.queue]);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const showProfile = patient => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			dispatch(toggleProfile(true, info));
		}
	};

	const sendToDoctor = async queue => {
		try {
			if (!queue) {
				notifyError('Could not add patient to queue');
				return;
			}
			dispatch(startBlock());
			const data = {
				patient_id: queue.appointment?.patient?.id,
				queue_id: queue.id,
			};
			const url = `front-desk/queue-system/add/${queue.appointment.id}`;
			const res = await request(url, 'POST', true, data);
			if (res.success) {
				const arr = queues.filter(q => q.id !== queue.id);
				setQueues(arr);
				dispatch(stopBlock());
				notifySuccess('Patient has been queued to see the doctor');
			} else {
				dispatch(stopBlock());
				notifyError('Could not add patient to queue');
			}
		} catch (e) {
			dispatch(stopBlock());
			notifyError('Could not add patient to queue');
		}
	};

	const blastPrompt = async patient => {
		try {
			dispatch(startBlock());
			const url = `front-desk/queue-system/prompt/?patient_id=${patient.id}&type=vitals`;
			await request(url, 'GET', true);
			dispatch(stopBlock());
		} catch (e) {
			notifyError('Something went wrong');
			dispatch(stopBlock());
		}
	};

	return (
		<div className="element-wrapper">
			<h6 className="element-header">List of patients in queue for vitals</h6>
			<div className="element-box p-3 m-0">
				{loading ? (
					<TableLoading />
				) : (
					<div className="table-responsive">
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Patient</th>
									<th>Whom To See</th>
									<th>Gender / Age</th>
									<th>Service</th>
									<th>Date</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{queues
									.filter(queue => queue.queueType === 'vitals')
									.map((queue, key) => (
										<tr key={key}>
											<td>{patientname(queue.appointment.patient, true)}</td>
											<td>{staffname(queue.appointment.whomToSee)}</td>
											<td>{`${queue.appointment.patient.gender} / ${getAge(
												queue.appointment.patient.date_of_birth
											)}`}</td>
											<td>
												{truncate(queue.appointment.service?.item?.name || '', {
													length: 50,
													omission: '...',
												})}
											</td>
											<td>
												{formatDate(queue.createdAt, 'DD-MMM-YYYY h:mma')}
											</td>
											<td nowrap="nowrap">
												<Tooltip title="View Profile">
													<a
														className="btn btn-primary btn-sm ml-2"
														onClick={() =>
															showProfile(queue.appointment.patient)
														}
													>
														<i className="os-icon os-icon-user" />
													</a>
												</Tooltip>
												<Tooltip title="Send To Doctor">
													<a
														className="btn btn-primary btn-sm ml-2"
														onClick={() => sendToDoctor(queue)}
													>
														<i className="os-icon os-icon-mail-18" />
													</a>
												</Tooltip>
												<Tooltip title="Call Patient">
													<a
														onClick={() =>
															blastPrompt(queue.appointment.patient)
														}
														className="btn text-primary ml-1"
													>
														<i className="os-icon os-icon-volume-2" />
													</a>
												</Tooltip>
											</td>
										</tr>
									))}
								{queues.length === 0 && (
									<tr>
										<td colSpan="6" className="text-center">
											No result found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default VitalsQueue;
