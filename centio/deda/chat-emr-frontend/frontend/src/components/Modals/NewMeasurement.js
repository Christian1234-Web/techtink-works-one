import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { FORM_ERROR } from 'final-form';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { labourAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import ModalHeader from '../ModalHeader';

const NewMeasurement = ({ closeModal, labour_id, update, patient }) => {
	const dispatch = useDispatch();

	const onSubmit = async values => {
		try {
			dispatch(startBlock());
			const uri = `${labourAPI}/${labour_id}/measurements`;
			const rs = await request(uri, 'POST', true, {
				...values,
				patient_id: patient.id,
			});
			dispatch(stopBlock());
			update(rs.measurement);
			notifySuccess('Measurement taken!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'Error, could not take measurement' };
		}
	};

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
				<div className="modal-content modal-scroll text-center">
					<ModalHeader
						closeModal={() => closeModal()}
						title="Take Measurement"
					/>
					<div className="form-block element-box">
						<Form
							onSubmit={onSubmit}
							validate={values => {
								const errors = {};
								return errors;
							}}
							render={({ handleSubmit, submitting, submitError }) => (
								<form onSubmit={handleSubmit}>
									{submitError && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${submitError}`,
											}}
										/>
									)}
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label>
													Select if patient is in true or false labour
												</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="labour_sign"
																component="input"
																type="radio"
																value="True Labour"
															/>{' '}
															True Labour
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="labour_sign"
																component="input"
																type="radio"
																value="False Labour"
															/>{' '}
															False Labour
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>Presentation</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="presentation"
																component="input"
																type="radio"
																value="Cephalic"
															/>{' '}
															Cephalic
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="presentation"
																component="input"
																type="radio"
																value="Breech"
															/>{' '}
															Breech
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="presentation"
																component="input"
																type="radio"
																value="Shoulder"
															/>{' '}
															Shoulder
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="presentation"
																component="input"
																type="radio"
																value="Any Other"
															/>{' '}
															Any Other
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Position of foetus</label>
												<Field
													name="position_of_foetus"
													className="form-control"
													component="input"
													type="text"
													placeholder="Position of foetus"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Fetal Lie</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="fetal_lie"
																component="input"
																type="radio"
																value="Longitudinal"
															/>{' '}
															Longitudinal
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="fetal_lie"
																component="input"
																type="radio"
																value="Oblique"
															/>{' '}
															Oblique
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="fetal_lie"
																component="input"
																type="radio"
																value="Transverse"
															/>{' '}
															Transverse
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Descent</label>
												<Field
													name="descent"
													className="form-control"
													component="input"
													type="text"
													placeholder="Descent"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Cervical length (cm)</label>
												<Field
													name="cervical_length"
													className="form-control"
													component="input"
													type="text"
													placeholder="Cervical length (cm)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Cervical effacement (%)</label>
												<Field
													name="cervical_effacement"
													className="form-control"
													component="input"
													type="text"
													placeholder="Cervical effacement (%)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Cervical position</label>
												<Field
													name="cervical_position"
													className="form-control"
													component="input"
													type="text"
													placeholder="Cervical position"
												/>
											</div>
										</div>
										<div className="col-sm-12">
											<div className="form-group">
												<label>Membranes/Liquor</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Intact membranes"
															/>{' '}
															Intact membranes
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Clear"
															/>{' '}
															Clear
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Blood stained"
															/>{' '}
															Blood stained
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Light meconium staining"
															/>{' '}
															Light meconium staining
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Particulate meconium staining"
															/>{' '}
															Particulate meconium staining
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="membranes"
																component="input"
																type="radio"
																value="Heavy meconium staining"
															/>{' '}
															Heavy meconium staining
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Moulding</label>
												<Field
													name="moulding"
													className="form-control"
													component="input"
													type="text"
													placeholder="Moulding"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Caput</label>
												<Field
													name="caput"
													className="form-control"
													component="input"
													type="text"
													placeholder="Caput"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>
													Has the woman passed uring since the last measurement?
												</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="has_passed_urine"
																component="input"
																type="radio"
																value="Yes"
															/>{' '}
															Yes
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="has_passed_urine"
																component="input"
																type="radio"
																value="No"
															/>{' '}
															No
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>
													Has oxytocin been administered during the current
													exam?
												</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="administered_oxytocin"
																component="input"
																type="radio"
																value="Yes"
															/>{' '}
															Yes
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="administered_oxytocin"
																component="input"
																type="radio"
																value="No"
															/>{' '}
															No
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>
													Have other drugs or IV fluids been administered during
													the current exam?
												</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="administered_other_drugs"
																component="input"
																type="radio"
																value="Yes"
															/>{' '}
															Yes
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="administered_other_drugs"
																component="input"
																type="radio"
																value="No"
															/>{' '}
															No
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Identify if the patient has any of the following
													emergency signs?
												</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Difficulty in breathing"
															/>{' '}
															Difficulty in breathing
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Shock"
															/>{' '}
															Shock
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Vaginal Bleeding"
															/>{' '}
															Vaginal Bleeding
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Convulsion or Unconsciousness"
															/>{' '}
															Convulsion or Unconsciousness
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Prolapsed Cord"
															/>{' '}
															Prolapsed Cord
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="measurements"
																component="input"
																type="checkbox"
																value="Fetal Distress"
															/>{' '}
															Fetal Distress
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit"
											>
												Save
											</button>
										</div>
									</div>
								</form>
							)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewMeasurement;
