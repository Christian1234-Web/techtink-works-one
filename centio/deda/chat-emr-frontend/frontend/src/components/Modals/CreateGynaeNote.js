import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import ModalHeader from '../ModalHeader';

const CreateGynaeNote = ({
	closeModal,
	updateNote,
	type,
	antenatal_id,
	patient,
}) => {
	const [lmp, setLmp] = useState(null);

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
					lmp: moment(values.lmp, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
				},
				patient_id: patient.id,
				type,
				antenatal_id,
				category: 'gynaeHistory',
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
						title="New Gynaecological Record"
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
													<label>Menarche</label>
													<Field
														name="menarche"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter menarche"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Menstral Cycle</label>
													<Field
														name="menstral_cycle"
														className="form-control"
														component="input"
														type="number"
														placeholder="Enter menstral cycle"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>LMP</label>
													<div className="custom-date-input">
														<Field
															name="lmp"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={lmp}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setLmp(date);
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
											<div className="col-sm-6">
												<div className="form-group">
													<label>Contraception</label>
													<Field
														name="contraception"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter contraception"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Method/Type of Contraception</label>
													<Field
														name="method_of_contraception"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter contraception method"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Dysmenorrhea</label>
													<Field
														name="dysmenorrhea"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter dysmenorrhea"
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Abnormal Menstrual Bleeding</label>
													<Field
														name="abnormalBleeding"
														className="form-control"
														component="input"
														type="text"
														placeholder="Enter abnormal menstrual bleeding"
													/>
												</div>
											</div>
										</div>
										<div className="row mt-1">
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

export default CreateGynaeNote;
