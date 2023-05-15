import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { format, isValid } from 'date-fns';

import waiting from '../../assets/images/waiting.gif';
import {
	ErrorBlock,
	ReactSelectAdapter,
	request,
} from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import ModalHeader from '../ModalHeader';
import { startBlock, stopBlock } from '../../actions/redux-block';

const ModalApplyLeave = ({ closeModal, addLeave }) => {
	const [loaded, setLoaded] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [leaveCategories, setLeaveCategories] = useState([]);

	const dispatch = useDispatch();

	const staff = useSelector(state => state.user.profile);

	const fetchLeaveCategory = useCallback(async () => {
		try {
			const rs = await request('leave-category', 'GET', true);
			setLeaveCategories(
				rs.map(leave => ({
					...leave,
					value: leave.id,
					label: leave.name,
				}))
			);
			setLoaded(true);
		} catch (error) {
			setLoaded(true);
			notifyError('could not fetch leave categories!');
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchLeaveCategory();
		}
	}, [fetchLeaveCategory, loaded]);

	const handleSubmit = async values => {
		try {
			const data = {
				...values,
				staff_id: staff.details.id,
				start_date: moment(values.start_date, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
				end_date: moment(values.end_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
				leave_category_id: values.leave_type?.id || '',
				type: 'leave',
			};
			dispatch(startBlock());
			const url = 'hr/leave-management';
			const rs = await request(url, 'POST', true, data);
			notifySuccess('Leave request sent');
			dispatch(stopBlock());
			addLeave(rs);
			closeModal();
		} catch (error) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not send leave request' };
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content">
					<ModalHeader title="Apply for Leave" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<div className="element-box m-0 p-3">
							<div className="form-block">
								<Form
									onSubmit={handleSubmit}
									validate={values => {
										const errors = {};
										if (!values.leave_type) {
											errors.leave_type = 'Select type of leave';
										}
										if (!values.start_date) {
											errors.start_date = 'Select start date';
										}
										if (!values.end_date) {
											errors.end_date = 'Select end date';
										}
										if (!values.reason) {
											errors.reason =
												'Please tell us why you want to take this leave';
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
														<label>Select leave type</label>
														<Field
															name="leave_type"
															component={ReactSelectAdapter}
															options={leaveCategories}
															placeholder="Select leave type"
														/>
														<ErrorBlock name="leave_type" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Start of leave</label>
														<Field
															name="start_date"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={startDate}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setStartDate(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of leave"
																		minDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
														<ErrorBlock name="start_date" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>End of leave</label>
														<Field
															name="end_date"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={endDate}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setEndDate(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of leave"
																		minDate={startDate}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>Reason for Applying</label>
														<Field
															name="reason"
															className="form-control"
															component="textarea"
															placeholder="Enter your reason for taking this leave"
														/>
														<ErrorBlock name="reason" />
													</div>
												</div>
												<div className="col-sm-12 text-center">
													<button
														className="btn btn-primary"
														disabled={submitting}
														type="submit"
													>
														{submitting ? (
															<img src={waiting} alt="submitting" />
														) : (
															'Apply'
														)}
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
		</div>
	);
};

export default ModalApplyLeave;
