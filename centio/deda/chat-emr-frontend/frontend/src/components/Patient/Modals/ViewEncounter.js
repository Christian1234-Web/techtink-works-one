import React, { Fragment } from 'react';
import startCase from 'lodash.startcase';

import { formatDate, parseNote, staffname } from '../../../services/utilities';
import { allVitalItems } from '../../../services/constants';

const ViewEncounter = ({ closeModal, encounter }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content modal-scroll">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title text-center">
							Patient Consultation Encounter
						</h4>
						<div className="onboarding-text alert-custom text-center mt-4">
							{`Consultant: ${staffname(encounter.staff)} | Department: ${
								encounter.appointment?.department?.name || '--'
							} | Date: ${formatDate(
								encounter.createdAt,
								'DD MMM, YYYY HH:mm A'
							)}`}
						</div>
						<div className="table-responsive">
							<div className="dataTables_wrapper container-fluid dt-bootstrap4">
								<div className="row">
									<div className="col-sm-12">
										<div className="onboarding-text alert-custom2 text-center m-0">
											Vital Signs
										</div>
										<table
											className="table table-striped table-lightfont dataTable"
											style={{ width: '100%' }}
										>
											<thead style={{ borderCollapse: 'collapse' }}>
												<tr>
													{encounter.vitals.map((v, i) => (
														<th key={i}>{v.readingType}</th>
													))}
												</tr>
											</thead>
											<tbody>
												<tr>
													{encounter.vitals.map((item, i) => {
														const values = Object.values(item.reading);
														const v = allVitalItems.find(
															v => v.name === item.readingType
														);
														return <td key={i}>{`${values[0]}${v?.unit}`}</td>;
													})}
													{encounter.vitals.length === 0 && (
														<td className="text-center">No vital signs</td>
													)}
												</tr>
											</tbody>
										</table>
										{encounter.patient_notes
											.filter(
												n =>
													n.type !== 'encounter-note' &&
													n.type !== 'diagnosis' &&
													n.type !== 'allergy'
											)
											.map((note, i) => {
												return (
													<Fragment key={i}>
														<div className="onboarding-text alert-custom2 text-center mt-4 mb-2">
															{startCase(note.type)}
														</div>
														<div
															className="px-4"
															dangerouslySetInnerHTML={{
																__html: parseNote(note, true),
															}}
														/>
													</Fragment>
												);
											})}
										<div className="onboarding-text alert-custom2 text-center mt-4 mb-2">
											Allergies
										</div>
										<table className="table table-striped">
											{encounter.allergies.length > 0 && (
												<thead>
													<tr>
														<th>Category</th>
														<th>Drug</th>
														<th>Allergy</th>
														<th>Reaction</th>
														<th>Severity</th>
													</tr>
												</thead>
											)}
											<tbody>
												{encounter.allergies.map((item, i) => {
													return (
														<tr key={i}>
															<td>{item.category}</td>
															<td>
																{item.drugGeneric
																	? item.drugGeneric.name
																	: '--'}
															</td>
															<td>{item.allergy}</td>
															<td>{item.reaction}</td>
															<td>{item.severity}</td>
														</tr>
													);
												})}
												{encounter.allergies.length === 0 && (
													<tr>
														<td colSpan="5" className="text-center">
															No allergens found!
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<div className="onboarding-text alert-custom2 text-center mt-4 mb-2">
											Diagnosis
										</div>
										<table className="table table-striped">
											<thead>
												{encounter.diagnosis.length > 0 && (
													<tr>
														<th>Diagnosis</th>
														<th>Type</th>
														<th>Comment</th>
														<th>Consultant</th>
														<th>Status</th>
													</tr>
												)}
											</thead>
											<tbody>
												{encounter.diagnosis.map((item, i) => {
													return (
														<tr key={i}>
															<td>{`${item.diagnosis.type.toUpperCase()} (${
																item.diagnosis.code
															}): ${item.diagnosis.description}`}</td>
															<td>{item.diagnosis_type}</td>
															<td>{item.comment || '--'}</td>
															<td>{item.createdBy}</td>
															<td>{item.status}</td>
														</tr>
													);
												})}
												{encounter.diagnosis.length === 0 && (
													<tr>
														<td colSpan="5" className="text-center">
															No diagnosis found!
														</td>
													</tr>
												)}
											</tbody>
										</table>
										{/* <div className="onboarding-text alert-custom2 text-center mt-4 mb-2">
											Investigations
										</div>
										<table className="table table-striped">
											<thead>
												{encounter.investigations.length > 0 && (
													<tr>
														<th>ID</th>
														<th>Lab</th>
														<th>Note</th>
													</tr>
												)}
											</thead>
											<tbody>
												{encounter.investigations.map((item, i) => {
													console.log(item)
													return (
														<tr key={i}>
															<td><p className="item-title text-color m-0">{item.code}</p></td>
															<td><p className="item-title text-color m-0">{item.item?.labTest?.name || item.item?.service?.name || '--'}</p></td>
															<td>{item.requestNote || '--'}</td>
														</tr>
													);
												})}
												{encounter.investigations.length === 0 && (
													<tr>
														<td colSpan="5" className="text-center">
															No investigations found!
														</td>
													</tr>
												)}
											</tbody>
										</table> */}
										<div className="onboarding-text alert-custom2 text-center mt-4 mb-2">
											Additional Note
										</div>
										{encounter.encounter_note ? (
											<div
												className="px-4"
												dangerouslySetInnerHTML={{
													__html: parseNote(encounter.encounter_note, true),
												}}
											/>
										) : (
											<table
												className="table table-striped table-lightfont dataTable"
												style={{ width: '100%' }}
											>
												<tbody>
													<tr>
														<td className="text-center">No Note</td>
													</tr>
												</tbody>
											</table>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewEncounter;
