import React, { Component } from 'react';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import Popover from 'antd/lib/popover';

import TableLoading from './TableLoading';
import { toggleProfile } from '../actions/user';
import {
	request,
	confirmAction,
	updateImmutable,
	patientname,
	formatDate,
} from '../services/utilities';
import { startBlock, stopBlock } from '../actions/redux-block';
import ProfilePopup from './Patient/ProfilePopup';
import { notifySuccess, notifyError } from '../services/notify';
import ModalScheduleDate from './Modals/ModalScheduleDate';
import ViewRequestNote from './Modals/ViewRequestNote';
import Admitted from './Admitted';
import { toggleSidepanel } from '../actions/sidepanel';
import CreateNote from './Modals/CreateNote';
import ProcedureNoteTable from './Patient/Modals/ProcedureNoteTable';
import VisitNotesTable from './Patient/VisitNotesTable';

class ProcedureBlock extends Component {
	state = {
		procedue: null,
		showRSModal: false,
		visible: null,
		addNote: false,
		setProcedure: null,
		viewNote: false,
	};

	showProfile = patient => {
		if (patient.is_active) {
			const info = { patient, type: 'patient' };
			this.props.toggleProfile(true, info);
		}
	};

	showProcedure = (patient, procedure) => {
		const info = { patient, type: 'procedure', item: procedure };
		this.props.toggleSidepanel(true, info);
	};

	cancelProcedureTest = async data => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${data.id}/delete-request?type=procedure`;
			const rs = await request(url, 'DELETE', true);
			const procedure_request = procedures.find(l => l.id === data.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...procedure_request, item };
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);

			notifySuccess('procedure request cancelled!');
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			notifyError('Error cancelling procedure');
			this.props.stopBlock();
		}
	};

	cancelProcedure = procedure => {
		confirmAction(
			this.cancelProcedureTest,
			procedure,
			'Do you want to cancel this procedure?',
			'Are you sure?'
		);
	};

	scheduleDate = procedure => {
		document.body.classList.add('modal-open');
		this.setState({ showRSModal: true, procedure });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({
			showRSModal: false,
			procedure: null,
			addNote: false,
			viewNote: false,
		});
	};

	startProcedureTest = async data => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${data.id}/start`;
			const datum = {
				date: moment().format('DD-MM-YYYY HH:mm:ss'),
			};
			const rs = await request(url, 'PUT', true, datum);
			const procedure_request = procedures.find(l => l.id === data.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...procedure_request, item };
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);
			this.props.stopBlock();
			notifySuccess('procedure started!');
		} catch (error) {
			console.log(error);
			notifyError('Error starting procedure');
			this.props.stopBlock();
		}
	};

	startProcedure = procedure => {
		confirmAction(
			this.startProcedureTest,
			procedure,
			'Do you want to start this procedure?',
			'Are you sure?'
		);
	};

	concludeProcedure = async data => {
		try {
			const { procedures } = this.props;
			this.props.startBlock();
			const url = `requests/${data.id}/end`;
			const datum = {
				date: moment().format('DD-MM-YYYY HH:mm:ss'),
			};
			const rs = await request(url, 'PUT', true, datum);
			const procedure_request = procedures.find(l => l.id === data.id);
			const item = { ...data.item, ...rs.data };
			const newItem = { ...procedure_request, item };
			const newItems = updateImmutable(procedures, newItem);
			this.props.updateProcedure(newItems);
			this.props.stopBlock();

			this.setState({
				addNote: true,
				setProcedure: data,
			});

			notifySuccess('procedure concluded!');
		} catch (error) {
			console.log(error);
			notifyError('Error concluding procedure');
			this.props.stopBlock();
		}
	};

	finishProcedure = procedure => {
		confirmAction(
			this.concludeProcedure,
			procedure,
			'Do you want to end this procedure? You wont be able to make entries after closing this procedure.',
			'Are you sure?'
		);
	};

	viewNotes = async procedure_id => {
		this.setState({
			viewNote: true,
			setProcedure: procedure_id,
		});
	};

	render() {
		const { loading, procedures, patient, updateProcedure } = this.props;
		const { procedure, showRSModal, visible } = this.state;

		return loading ? (
			<TableLoading />
		) : (
			<>
				<table id="table" className="table table-theme v-middle table-hover">
					<thead>
						<tr>
							<th>Request Date</th>
							<th>ID</th>
							<th>Procedure</th>
							{!patient && <th>Patient</th>}
							<th>By</th>
							<th>Note</th>
							<th>Status</th>
							<th>Resources</th>
							<th>Scheduled</th>
							<th nowrap="nowrap"></th>
						</tr>
					</thead>
					<tbody>
						{procedures.map((data, i) => {
							return (
								<tr key={i} className={data.urgent ? 'urgent' : ''}>
									<td>
										<span>
											{moment(data.createdAt).format('DD-MMM-YYYY h:mmA')}
										</span>
									</td>
									<td>{data.code}</td>
									<td>
										<p className="item-title text-color m-0">
											<a
												className="cursor"
												onClick={() =>
													this.showProcedure(data.patient, data.item)
												}
											>
												{data.item.service.item.name}
											</a>
										</p>
									</td>
									{!patient && (
										<td>
											<p className="item-title text-color m-0">
												<Tooltip
													title={<ProfilePopup patient={data.patient} />}
												>
													<a
														className="cursor"
														onClick={() => this.showProfile(data.patient)}
													>
														{patientname(data.patient, true)}
													</a>
												</Tooltip>
												{data.admission && (
													<Tooltip
														title={<Admitted room={data?.admission?.room} />}
													>
														<i className="fa fa-hospital-o text-danger ml-1" />
													</Tooltip>
												)}
												{data.patient.nicu_id && (
													<Tooltip
														title={<Admitted room={data?.admission?.room} />}
													>
														<i className="fa fa-hospital-o text-danger ml-1" />
													</Tooltip>
												)}
											</p>
										</td>
									)}
									<td>{data.created_by || data.createdBy || '--'}</td>
									<td>
										{data.requestNote ? (
											<Popover
												content={
													<ViewRequestNote
														title="Procedure Note"
														note={data.requestNote}
														closeModal={() => this.setState({ visible: null })}
													/>
												}
												overlayClassName="show-note"
												trigger="click"
												visible={visible && visible === data.id}
												onVisibleChange={() =>
													this.setState({ visible: data.id })
												}
											>
												<a className="item-title text-primary">Note</a>
											</Popover>
										) : (
											'--'
										)}
									</td>
									<td>
										{data.item.cancelled === 0 && (
											<>
												{data.item.transaction?.status === 0 ? (
													<span className="badge badge-warning">
														Awaiting Payment
													</span>
												) : (
													<>
														{!data.item?.scheduledDate && (
															<span className="badge badge-secondary">
																Open
															</span>
														)}
														{data.item?.scheduledDate &&
															!data.item.startedDate && (
																<span className="badge badge-primary">
																	Scheduled
																</span>
															)}
														{data.item.startedDate &&
															!data.item.finishedDate && (
																<span className="badge badge-info text-white">
																	Started
																</span>
															)}
														{data.item.finishedDate && (
															<span className="badge badge-success">
																Concluded
															</span>
														)}
													</>
												)}
											</>
										)}
										{data.item.cancelled === 1 && (
											<span className="badge badge-danger">cancelled</span>
										)}
									</td>
									<td>
										{data.item.resources
											? JSON.parse(data.item.resources).join(', ')
											: '--'}
									</td>
									<td>
										{data.item.transaction &&
										(data.item.transaction.status === 1 ||
											data.item.transaction.status === -1) ? (
											<>
												{!data.item?.scheduledDate ? (
													<a
														onClick={() => this.scheduleDate(data)}
														className="btn btn-sm btn-primary px-2 py-1"
													>
														schedule date
													</a>
												) : (
													`${formatDate(
														data.item.scheduledStartDate,
														'DD/MMM/YYYY h:mm A'
													)} => ${formatDate(
														data.item.scheduledEndDate,
														'DD/MMM/YYYY h:mm A'
													)}`
												)}
											</>
										) : (
											'--'
										)}
									</td>
									<td nowrap="nowrap" className="row-actions">
										{data?.item?.scheduledDate && !data?.item?.startedDate && (
											<a
												onClick={() => this.startProcedure(data)}
												className="btn btn-sm btn-primary px-2 py-1 text-white"
											>
												Start
											</a>
										)}
										{data.item.startedDate && !data.item.finishedDate && (
											<a
												onClick={() => this.finishProcedure(data)}
												className="btn btn-sm btn-primary px-2 py-1 text-white"
											>
												Conclude
											</a>
										)}
										{/* NEW ONE */}
										{data.item.startedDate && data.item.finishedDate && (
											<a
												onClick={() => this.viewNotes(data)}
												className="btn btn-sm btn-primary px-2 py-1 text-white"
											>
												View Notes
											</a>
										)}

										{/* NEW ONE ENDS */}
										{data.item.cancelled === 0 && !data.item?.startedDate && (
											<Tooltip title="Cancel Procedure">
												<a
													className="danger"
													onClick={() => this.cancelProcedure(data)}
												>
													<i className="os-icon os-icon-ui-15" />
												</a>
											</Tooltip>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{procedure && showRSModal && (
					<ModalScheduleDate
						closeModal={this.closeModal}
						procedure={procedure}
						procedures={procedures}
						updateProcedure={updateProcedure}
					/>
				)}

				{this.state.addNote && (
					<CreateNote
						closeModal={this.closeModal}
						updateNote={() => {}}
						patient={this.state.setProcedure.patient}
						patientreq_id={this.state.setProcedure.id}
						type="procedure"
					/>
				)}
				{this.state.viewNote && (
					<ProcedureNoteTable
						closeModal={this.closeModal}
						patientRequest_id={this.state.setProcedure.id}
						type="procedure"
					/>
				)}
			</>
		);
	}
}

export default connect(null, {
	startBlock,
	stopBlock,
	toggleSidepanel,
	toggleProfile,
})(ProcedureBlock);
