import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash.startcase';

import {
	formatDate,
	request,
	staffname,
	parseNote,
} from '../../../services/utilities';
import { notifyError } from '../../../services/notify';
import { startBlock, stopBlock } from '../../../actions/redux-block';

import Splash from '../../Splash';

const ProcedureNoteTable = ({ closeModal, patientRequest_id, type }) => {
	const [loading, setLoadingState] = useState(false);

	const [meta, setMeta] = useState(null);

	const [notes, setNotes] = useState([]);

	useEffect(() => {
		(async () => {
			setLoadingState(true);
			await fetchNotes();
		})();
	}, []);

	const fetchNotes = useCallback(async () => {
		try {
			startBlock();
			const url = `patient-notes/?type=${type}&patientreq_id=${patientRequest_id}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setLoadingState(false);
			setNotes(result);
			setMeta(meta);
			stopBlock();
		} catch (error) {
			console.log(error);
			setLoadingState(false);
			// filtering: false
			stopBlock();
			notifyError(error.message || 'could not fetch visit notes');
		}
	}, [type, patientRequest_id]);

	return (
		<div className="m-0 w-100">
			{loading ? (
				<Splash />
			) : (
				<div
					className="onboarding-modal modal fade animated show d-flex align-items-start justify-content-center"
					role="dialog"
					style={{ display: 'block' }}
				>
					<div
						className="modal-content text-center"
						style={{ maxWidth: '900px' }}
					>
						<div className="modal-content text-center">
							<button
								aria-label="Close"
								className="close"
								type="button"
								onClick={closeModal}
							>
								<span className="os-icon os-icon-close" />
							</button>
							<div className="onboarding-content with-gradient">
								<h4 className="onboarding-title">Notes</h4>

								<div className="form-block">
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
																<tr
																	key={i}
																	className={i % 2 === 1 ? 'odd' : 'even'}
																>
																	<td nowrap="nowrap">
																		{formatDate(
																			note.createdAt,
																			'DD-MMM-YYYY h:mm A'
																		)}
																	</td>
																	<td>
																		<div
																			dangerouslySetInnerHTML={{
																				__html: `<strong class="float-left mr-2"><em>${startCase(
																					note.type
																				)}:</em></strong> ${parseNote(
																					note,
																					true
																				)}`,
																			}}
																		/>
																	</td>
																	<td nowrap="nowrap">
																		{staffname(note.staff)}
																	</td>
																</tr>
															);
														})}

														{notes && notes.length === 0 && (
															<tr>
																<td colSpan="3" className="text-center">
																	No Notes
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default connect(null, { startBlock, stopBlock })(ProcedureNoteTable);
