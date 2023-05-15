import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { labourAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import {
	Compulsory,
	ErrorBlock,
	request,
	staffname,
} from '../../services/utilities';
import ModalHeader from '../ModalHeader';

function formatDate(date) {
	return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
}

function formatTime(date) {
	return moment(date, 'h:mm A').format('HH:mm:ss');
}

const RecordDelivery = ({ closeModal, labour_id, update, patient }) => {
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [timeOfBirth, setTimeOfBirth] = useState(null);
	const [pediatrician, setPediatrician] = useState(null);

	const dispatch = useDispatch();

	const getStaffs = async q => {
		if (!q || q.length <= 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const result = await request(url, 'GET', true);
		return result;
	};

	const onSubmit = async values => {
		try {
			dispatch(startBlock());
			console.log(values);
			const body = {
				...values,
				patient_id: patient.id,
				date_of_birth: formatDate(values.date_of_birth),
				time_of_birth: formatTime(values.time_of_birth),
			};
			const uri = `${labourAPI}/${labour_id}/delivery-record`;
			const rs = await request(uri, 'POST', true, body);
			dispatch(stopBlock());
			update(rs.delivery);
			notifySuccess('Delivery recoorded!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'Error, could record delivery' };
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
						title="Record Delivery"
					/>
					<div className="form-block element-box">
						<Form
							onSubmit={onSubmit}
							validate={values => {
								const errors = {};
								if (!values.date_of_birth) {
									errors.date_of_birth = "Enter baby's date of birth";
								}
								if (!values.time_of_birth) {
									errors.time_of_birth = "Enter baby's time of birth";
								}
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
										<div className="col-sm-12">
											<div className="form-group">
												<label>Delivery type</label>
												<div className="d-flex flex-flow-wrap">
													<div>
														<label>
															<Field
																name="delivery_type"
																component="input"
																type="radio"
																value="Full-term normal vaginal delivery"
															/>{' '}
															Full-term normal vaginal delivery
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="delivery_type"
																component="input"
																type="radio"
																value="Normal vaginal delivery with epistomy"
															/>{' '}
															Normal vaginal delivery with epistomy
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="delivery_type"
																component="input"
																type="radio"
																value="Vaginal delivery in malpresentation"
															/>{' '}
															Vaginal delivery in malpresentation
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="delivery_type"
																component="input"
																type="radio"
																value="Assisted delivery (forceps or vent use)"
															/>{' '}
															Assisted delivery (forceps or vent use)
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="delivery_type"
																component="input"
																type="radio"
																value="Cesarean"
															/>{' '}
															Cesarean
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Is the mother alive?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="is_mother_alive"
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
																name="is_mother_alive"
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
												<label>Is the baby alive?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="is_baby_alive"
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
																name="is_baby_alive"
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
												<label>Administered 10 units of Oxytocin?</label>
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
												<label>Was the placenta delivered completely?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="placenta_delivered"
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
																name="placenta_delivered"
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
												<label>{`Bleeding within normal units (< 500ml)?`}</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="normal_bleeding"
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
																name="normal_bleeding"
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
										<div className="col-sm-4" />
										<div className="col-sm-4">
											<div className="form-group">
												<label>
													Date of birth <Compulsory />
												</label>
												<Field
													name="date_of_birth"
													render={({ name, input: { onChange } }) => (
														<div className="custom-date-input">
															<DatePicker
																selected={dateOfBirth}
																onChange={date => {
																	isValid(date)
																		? onChange(
																				format(new Date(date), 'dd-MM-yyyy')
																		  )
																		: onChange(null);
																	setDateOfBirth(date);
																}}
																peekNextMonth
																showMonthDropdown
																showYearDropdown
																dropdownMode="select"
																dateFormat="dd-MM-yyyy"
																className="single-daterange form-control"
																placeholderText="Select date of birth"
																maxDate={new Date()}
																name={name}
																disabledKeyboardNavigation
															/>
														</div>
													)}
												/>
												<ErrorBlock name="date_of_birth" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>
													Time of birth <Compulsory />
												</label>
												<Field
													name="time_of_birth"
													render={({ name, input: { onChange } }) => (
														<div className="custom-date-input">
															<DatePicker
																selected={timeOfBirth}
																onChange={date => {
																	isValid(date)
																		? onChange(
																				format(new Date(date), 'h:mm aa')
																		  )
																		: onChange(null);
																	setTimeOfBirth(date);
																}}
																showTimeSelect
																showTimeSelectOnly
																timeIntervals={1}
																timeCaption="Time"
																dateFormat="h:mm aa"
																className="single-daterange form-control"
																placeholderText="Select time of birth"
																name={name}
																disabledKeyboardNavigation
															/>
														</div>
													)}
												/>
												<ErrorBlock name="time_of_birth" />
											</div>
										</div>
										<div className="col-sm-4" />
										<div className="col-sm-4">
											<div className="form-group">
												<label>Baby cried immediately after birth?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="baby_cried_immediately"
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
																name="baby_cried_immediately"
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
												<label>Sex of baby</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="sex_of_baby"
																component="input"
																type="radio"
																value="Male"
															/>{' '}
															Male
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="sex_of_baby"
																component="input"
																type="radio"
																value="Female"
															/>{' '}
															Female
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="sex_of_baby"
																component="input"
																type="radio"
																value="Other"
															/>{' '}
															Other
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>APGAR score</label>
												<Field
													name="apgar_score"
													className="form-control"
													component="input"
													type="text"
													placeholder="APGAR score"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Weight of baby (kg)</label>
												<Field
													name="weight"
													className="form-control"
													component="input"
													type="text"
													placeholder="Weight of baby (kg)"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Administered vitamin K?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="administered_vitamin_k"
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
																name="administered_vitamin_k"
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
												<label>Is mother RH negative?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="mother_rh_negative"
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
																name="mother_rh_negative"
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
												<label>Additional drugs administered to baby</label>
												<Field
													name="drugs_administered"
													className="form-control"
													component="input"
													type="text"
													placeholder="Additional drugs administered to baby"
												/>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Were was baby transferred to?</label>
												<div className="d-flex">
													<div>
														<label>
															<Field
																name="transferred_to"
																component="input"
																type="radio"
																value="Transferred Out"
															/>{' '}
															Transferred Out
														</label>
													</div>
													<div className="ml-2">
														<label>
															<Field
																name="transferred_to"
																component="input"
																type="radio"
																value="NICU"
															/>{' '}
															NICU
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="form-group">
												<label>Comment</label>
												<Field
													name="comment"
													className="form-control"
													component="input"
													type="text"
													placeholder="Comment"
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label>Pediatrician</label>
												<Field name="pediatrician_id">
													{({ input, meta }) => (
														<AsyncSelect
															isClearable
															getOptionValue={option => option.id}
															getOptionLabel={option => staffname(option)}
															defaultOptions
															value={pediatrician}
															loadOptions={getStaffs}
															onChange={e => {
																setPediatrician(e);
																e ? input.onChange(e.id) : input.onChange(null);
															}}
															placeholder="Search pediatrician"
														/>
													)}
												</Field>
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

export default RecordDelivery;
