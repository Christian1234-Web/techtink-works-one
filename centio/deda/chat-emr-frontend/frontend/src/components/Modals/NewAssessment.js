import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { FORM_ERROR } from 'final-form';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { labourAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import ModalHeader from '../ModalHeader';

const plainOptions = [
	'Pre-eclampsia',
	'Eclampsia',
	'Uterine Surgery',
	'APH or PPH (Puerperal Sepsis)',
	'Manual removal of placenta',
	'Anaemia (less than 6g%)',
	'Febrile ailment in pregnancy',
	'Pregnancy associated with hypertension',
	'Medical condition with pregnancy (TB, diabetes, thyroid disorder, asthma)',
	'Bleeding P/V (APH Abortion)',
	'Abnormal presentational (apart from cephalic)',
	'Maturity < 37 weeks or Maturity > 45 weeks',
	'PROM (Premature Rupture Of Membranes)',
	'Fetal distress',
	'Prolonged labour > 24 hours',
	'Uterine size < period of gestation',
	'Traditional birth attendant/Outside interference',
];

const NewAssessment = ({ closeModal, labour_id, update, patient }) => {
	const dispatch = useDispatch();

	const onSubmit = async values => {
		try {
			dispatch(startBlock());
			const uri = `${labourAPI}/${labour_id}/risk-assessments`;
			const rs = await request(uri, 'POST', true, {
				...values,
				patient_id: patient.id,
			});
			dispatch(stopBlock());
			update(rs.riskAssessment);
			notifySuccess('Risk assessment taken!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'Error, could not take risk assessment' };
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
						title="Risk Assessment"
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
										<div className="col-sm-4">
											<div className="form-group">
												<label>Height of woman (cm)</label>
												<Field
													name="height"
													className="form-control"
													component="input"
													type="text"
													placeholder="Height of woman (cm)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Weight of woman (kg)</label>
												<Field
													name="weight"
													className="form-control"
													component="input"
													type="text"
													placeholder="Weight of woman (kg)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>History of low birth weight?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="history_low_birth_weight"
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
																name="history_low_birth_weight"
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
												<label>Outcome of previous pregnancy</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Normal delivery"
															/>{' '}
															Normal delivery
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Assisted delivery"
															/>{' '}
															Assisted delivery
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Cesarean"
															/>{' '}
															Cesarean
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Still Birth"
															/>{' '}
															Still Birth
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Miscarriage"
															/>{' '}
															Miscarriage
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="previous_pregnancy_outcome"
																component="input"
																type="radio"
																value="Spontaneous Abortion"
															/>{' '}
															Spontaneous Abortion
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-12">
											<div className="form-group">
												<label>
													Has the patient experienced any of the following in
													previous pregnancies?
												</label>
												<div className="d-flex flex-flow-wrap">
													{plainOptions.map((item, i) => (
														<div key={i} className={i === 0 ? '' : 'ml-2'}>
															<label>
																<Field
																	name="previous_pregnancy_experience"
																	component="input"
																	type="checkbox"
																	value={item}
																/>{' '}
																{item}
															</label>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="col-sm-12">
											<div className="form-group">
												<label>Note</label>
												<Field
													name="note"
													className="form-control"
													component="textarea"
													type="text"
													placeholder="Note"
												/>
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

export default NewAssessment;
