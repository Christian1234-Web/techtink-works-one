import React from 'react';

import {
	formatDate,
	formatPatientId,
	patientname,
	patientnokname,
} from '../../services/utilities';
import ModalHeader from '../ModalHeader';

const PatientProfile = ({ patient, closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '980px' }}
			>
				<div className="modal-content text-center">
					<ModalHeader title="Profile" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<div className="row">
							<div className="col-lg-6">
								<div className="onboarding-text alert-custom2 text-center m-0">
									Patient Profile
								</div>
								<div className="table-responsive">
									<table className="table table-striped table-sm">
										<tbody>
											<tr>
												<th>EMR ID</th>
												<td>{formatPatientId(patient)}</td>
											</tr>
											<tr>
												<th>Name</th>
												<td>{`${patient?.title || ''} ${patientname(
													patient
												)}`}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{patient.phone_number || '--'}</td>
											</tr>
											<tr>
												<th>Email</th>
												<td>{patient.email || '--'}</td>
											</tr>
											<tr>
												<th>Gender</th>
												<td>{patient.gender || '--'}</td>
											</tr>
											<tr>
												<th>Date of Birth</th>
												<td>
													{formatDate(patient.date_of_birth, 'DD-MMM-YYYY')}
												</td>
											</tr>
											<tr>
												<th>Occupation</th>
												<td>{patient.occupation || '--'}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{patient.address || '--'}</td>
											</tr>
											<tr>
												<th>Marital Status</th>
												<td>{patient.maritalStatus || '--'}</td>
											</tr>
											<tr>
												<th>Ethnicity</th>
												<td>{patient.ethnicity || '--'}</td>
											</tr>
											<tr>
												<th>Blood Group</th>
												<td>{patient.blood_group || '--'}</td>
											</tr>
											<tr>
												<th>Blood Type</th>
												<td>{patient.blood_type || '--'}</td>
											</tr>
											<tr>
												<th>Enrollee ID</th>
												<td>{patient.enrollee_id || '--'}</td>
											</tr>
											<tr>
												<th>Mother</th>
												<td>{patientname(patient.mother, true)}</td>
											</tr>
											<tr>
												<th>Referred By</th>
												<td>{patient.referredBy || '--'}</td>
											</tr>
											<tr>
												<th>Active</th>
												<td>
													<span
														className={`badge ${
															patient.is_active
																? 'badge-success'
																: 'badge-danger'
														}`}
													>
														{patient.is_active ? 'Active' : 'Deactivated'}
													</span>
												</td>
											</tr>
											<tr>
												<th>Deceased</th>
												<td>
													<span
														className={`badge ${
															patient.deceased
																? 'badge-danger'
																: 'badge-success'
														}`}
													>
														{patient.deceased ? 'Yes' : 'No'}
													</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="onboarding-text alert-custom2 text-center m-0">
									Next of Kin
								</div>
								<div className="table-responsive">
									<table className="table table-striped table-sm">
										<tbody>
											<tr>
												<th>Name</th>
												<td>{patientnokname(patient.nextOfKin)}</td>
											</tr>
											<tr>
												<th>Relationship</th>
												<td>{patient.nextOfKin?.relationship || '--'}</td>
											</tr>
											<tr>
												<th>Email</th>
												<td>{patient.nextOfKin?.email || '--'}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{patient.nextOfKin?.phoneNumber || '--'}</td>
											</tr>
											<tr>
												<th>Date of Birth</th>
												<td>
													{formatDate(
														patient.nextOfKin?.date_of_birth,
														'DD-MMM-YYYY'
													)}
												</td>
											</tr>
											<tr>
												<th>Gender</th>
												<td>{patient.nextOfKin?.gender || '--'}</td>
											</tr>
											<tr>
												<th>Occupation</th>
												<td>{patient.nextOfKin?.occupation || '--'}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{patient.nextOfKin?.address || '--'}</td>
											</tr>
											<tr>
												<th>Marital Status</th>
												<td>{patient.nextOfKin?.maritalStatus || '--'}</td>
											</tr>
											<tr>
												<th>Ethnicity</th>
												<td>{patient.nextOfKin?.ethnicity || '--'}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientProfile;
