import React from 'react';

import { formatDate } from '../../services/utilities';
import ModalHeader from '../ModalHeader';

const Measurement = ({ closeModal, item }) => {
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
					<ModalHeader
						title={`Measurement taken on ${formatDate(
							item.createdAt,
							'D-MMM-YYYY h:mma'
						)} by ${item.createdBy}`}
						closeModal={closeModal}
					/>
					<div className="onboarding-content with-gradient">
						<div className="row">
							<div className="col-6">
								<div className="table-responsive">
									<table className="table table-striped table-sm">
										<tbody>
											<tr>
												<th>Labour Sign</th>
												<td>{item.labour_sign || '--'}</td>
											</tr>
											<tr>
												<th>Presentation</th>
												<td>{item.presentation || '--'}</td>
											</tr>
											<tr>
												<th>Position of Foetus</th>
												<td>{item.position_of_foetus || '--'}</td>
											</tr>
											<tr>
												<th>Fetal Lie</th>
												<td>{item.fetal_lie || '--'}</td>
											</tr>
											<tr>
												<th>Descent</th>
												<td>{item.descent || '--'}</td>
											</tr>
											<tr>
												<th>Cervical length (cm)</th>
												<td>{item.cervical_length || '--'}</td>
											</tr>
											<tr>
												<th>Cervical effacement (%)</th>
												<td>{item.cervical_effacement || '--'}</td>
											</tr>
											<tr>
												<th>Cervical position</th>
												<td>{item.cervical_position || '--'}</td>
											</tr>
											<tr>
												<th>Membranes/Liquor</th>
												<td>{item.membranes || '--'}</td>
											</tr>
											<tr>
												<th>Moulding</th>
												<td>{item.moulding || '--'}</td>
											</tr>
											<tr>
												<th>Caput</th>
												<td>{item.caput || '--'}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-6">
								<div className="table-responsive">
									<table className="table table-striped table-sm">
										<tbody>
											<tr>
												<th>
													Has the woman passed uring since the last measurement?
												</th>
												<td>{item.has_passed_urine || '--'}</td>
											</tr>
											<tr>
												<th>
													Has oxytocin been administered during the current
													exam?
												</th>
												<td>{item.administered_oxytocin || '--'}</td>
											</tr>
											<tr>
												<th>
													Have other drugs or IV fluids been administered during
													the current exam?
												</th>
												<td>{item.administered_other_drugs || '--'}</td>
											</tr>
											<tr>
												<th>Patient has the following emergency signs</th>
												<td>{item.measurements ? item.measurements : '--'}</td>
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

export default Measurement;
