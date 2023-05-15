import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { ReactSelectAdapter, request } from '../../services/utilities';
import ModalHeader from '../ModalHeader';
import { genders } from '../../services/constants';

const CreateObstNote = ({
	closeModal,
	updateNote,
	type,
	antenatal_id,
	patient,
}) => {
	const [dob, setDob] = useState(null);

	const dispatch = useDispatch();

	const onSubmit = async values => {
		try {
			const history = Object.values(values).filter(x => x);
			if (history.length === 0) {
				return;
			}

			dispatch(startBlock());
			const data = {
				history: {
					...values,
					date_of_birth: moment(values.dob, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
					sex: values.sex?.value || '',
				},
				patient_id: patient.id,
				type,
				antenatal_id,
				category: 'obstericHistory',
			};
			const rs = await request('patient-notes', 'POST', true, data);
			dispatch(stopBlock());
			updateNote(rs);
			notifySuccess('History added!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'Error, could not save note' };
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-lg modal-centered">
				<div className="modal-content text-center">
					<ModalHeader
						closeModal={() => closeModal()}
						title="New Obstetrics Record"
					/>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
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
													<label>Gest. Delivery</label>
													<Field
														name="gest_delivery"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter gest. delivery"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Where</label>
													<Field
														name="delivered_where"
														className="form-control"
														component="input"
														type="text"
														placeholder="Delivered where?"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Sex</label>
													<Field
														name="sex"
														component={ReactSelectAdapter}
														options={[
															{ value: '', label: 'Select Sex' },
															...genders,
														]}
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Weight</label>
													<Field
														name="weight"
														className="form-control"
														component="input"
														type="number"
														placeholder="Enter weight"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Alive</label>
													<Field
														name="alive"
														className="form-control"
														component="input"
														type="text"
														placeholder="alive?"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>DOB</label>
													<div className="custom-date-input">
														<div className="custom-date-input">
															<Field
																name="dob"
																render={({ name, input: { onChange } }) => (
																	<div className="custom-date-input">
																		<DatePicker
																			selected={dob}
																			onChange={date => {
																				isValid(date)
																					? onChange(
																							format(
																								new Date(date),
																								'dd-MM-yyyy'
																							)
																					  )
																					: onChange(null);
																				setDob(date);
																			}}
																			peekNextMonth
																			showMonthDropdown
																			showYearDropdown
																			dropdownMode="select"
																			dateFormat="dd-MM-yyyy"
																			className="single-daterange form-control"
																			placeholderText="Select LMP"
																			name={name}
																			maxDate={new Date()}
																			disabledKeyboardNavigation
																		/>
																	</div>
																)}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Abnormalities</label>
													<Field
														name="abnormalities"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter Abnormalities"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Additional Comment</label>
													<Field
														name="comment"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter Comment"
													/>
												</div>
											</div>
										</div>
										<div className="row mt-5">
											<div className="col-sm-12 d-flex space-between">
												<button className="btn btn-primary" type="submit">
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
		</div>
	);
};

export default CreateObstNote;
