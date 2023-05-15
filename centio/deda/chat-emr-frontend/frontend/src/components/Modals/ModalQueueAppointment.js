import React, { useState, useCallback, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';

import {
	Compulsory,
	ErrorBlock,
	formatCurrency,
	formatDate,
	patientname,
	ReactSelectAdapter,
	request,
	staffname,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import ModalHeader from '../ModalHeader';
import moment from 'moment';
import { serviceAPI } from '../../services/constants';

const consultations = [
	{
		label: 'Regular Encounter/Initial Consultation/Normal Consultation',
		value: 'initial',
	},
	{ label: 'Follow Up Consultation', value: 'follow-up' },
	{ label: 'Investigation Review', value: 'review' },
];

const ModalQueueAppointment = ({ appointment, closeModal, update }) => {
	const [loaded, setLoaded] = useState(false);

	const [doctors, setDoctors] = useState([]);
	const [services, setServices] = useState([]);

	const [doctor, setDoctor] = useState(null);
	const [appointmentDate, setAppointmentDate] = useState(null);

	const dispatch = useDispatch();

	const departments = useSelector(state =>
		state.department.filter(d => d.has_appointment === 1)
	);

	async function getActiveDoctors() {
		try {
			const rs = await request('utility/active-doctors', 'GET', true);
			const res = rs.map(item => ({
				...item,
				label: `${staffname(item)} (${item.room.name})`,
			}));
			setDoctors(res);
		} catch (e) {}
	}

	const fetchServicesByCategory = useCallback(
		async slug => {
			try {
				const url = `${serviceAPI}/${slug}`;
				const rs = await request(url, 'GET', true);
				console.log(rs);
				setServices(rs);
				dispatch(stopBlock());
			} catch (error) {
				console.log({ error });
				notifyError('error fetching consultations');
				dispatch(stopBlock());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!loaded) {
			dispatch(startBlock());
			if (appointment) {
				if (appointment.appointment_date) {
					setAppointmentDate(
						moment(appointment.appointment_date, 'YYYY-MM-DD HH:mm:ss').toDate()
					);
				} else {
					setAppointmentDate(null);
				}
			}

			try {
				fetchServicesByCategory('consultancy');
				getActiveDoctors();
			} catch (e) {}
			setLoaded(true);
		}
	}, [appointment, departments, dispatch, fetchServicesByCategory, loaded]);

	const initialValues = {
		department: appointment?.department || departments[0],
		consultation:
			consultations.find(c => c.value === appointment?.consultation_type) || '',
		specialty: appointment?.service?.item || '',
		doctor: appointment?.whomToSee || '',
		appointment_date: appointment.appointment_date
			? moment(appointment.appointment_date, 'YYYY-MM-DD HH:mm:ss').format(
					'DD-MM-YYYY h:mm aa'
			  )
			: '',
		description: appointment?.description || '',
	};

	const handleSubmit = async values => {
		try {
			const data = {
				appointment_date: moment(
					values.appointment_date,
					'DD-MM-YYYY h:mm aa'
				).format('YYYY-MM-DD HH:mm:ss'),
				patient_id: appointment.patient.id,
				sendToQueue: true,
				consultation_id: values.consultation?.value || '',
				department_id: values.department?.id || '',
				service_id: values.specialty?.id || '',
				doctor_id: values.doctor?.id || '',
				consulting_room_id: values.doctor?.room?.id || '',
				description: values.description || '',
			};
			dispatch(startBlock());
			const url = `front-desk/appointments/${appointment.id}/queue`;
			const rs = await request(url, 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('Appointment pushed to queue!');
				update(rs.appointment);
				closeModal();
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not save appointment',
				};
			}
		} catch (e) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save appointment' };
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
				style={{ maxWidth: '800px' }}
			>
				<div className="modal-content text-center">
					<ModalHeader
						title="Push Appointment to Queue"
						closeModal={closeModal}
					/>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<Form
								onSubmit={handleSubmit}
								initialValues={Object.fromEntries(
									Object.entries(initialValues).filter(([_, v]) => v !== '')
								)}
								validate={values => {
									const errors = {};
									if (!values.department) {
										errors.department = 'Select department';
									}
									if (!values.consultation) {
										errors.consultation = 'Select consultation';
									}
									if (!values.specialty) {
										errors.specialty = 'Select specialty';
									}

									return errors;
								}}
								render={({ handleSubmit, submitting, submitError }) => (
									<form onSubmit={handleSubmit}>
										{appointment.patient &&
											appointment.patient.lastAppointment && (
												<div className="onboarding-text alert-custom text-center">
													{`Last Appointment Date - ${moment(
														appointment.patient.lastAppointment.appointment_date
													).format('DD MMM, YYYY HH:mm A')}`}
												</div>
											)}
										{appointment.patient &&
											appointment.patient.outstanding < 0 && (
												<div className="alert alert-danger mt-3">
													{`Outstanding Balance: ${formatCurrency(
														appointment.patient.outstanding,
														true
													)}`}
												</div>
											)}
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
												<div className="form-group relative">
													<label>Patient</label>
													{appointment.patient && (
														<div className="posit-top">
															<div className="row">
																<div className="col-sm-12">
																	<span className="badge badge-info text-white">
																		{appointment.patient.hmo.name}
																	</span>
																</div>
															</div>
														</div>
													)}
													<input
														className="form-control"
														type="text"
														name="patient_id"
														value={patientname(appointment.patient, true)}
														onChange={() => {}}
														readOnly
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label>
														Department <Compulsory />
													</label>
													<Field
														name="department"
														component={ReactSelectAdapter}
														options={departments}
														getOptionValue={option => option.id}
														getOptionLabel={option => option.name}
														placeholder="Select department"
													/>
													<ErrorBlock name="department" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>Appointment Date</label>
													<input
														className="form-control"
														type="text"
														name="appointment_date"
														value={formatDate(
															appointment.appointment_date,
															'DD-MMM-YYYY h:mm A'
														)}
														onChange={() => {}}
														readOnly
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Change Time</label>
													<Field
														name="appointment_date"
														render={({ name, input: { onChange } }) => (
															<div className="custom-date-input">
																<DatePicker
																	selected={appointmentDate}
																	onChange={date => {
																		isValid(date)
																			? onChange(
																					format(
																						new Date(date),
																						'dd-MM-yyyy h:mm aa'
																					)
																			  )
																			: onChange(null);
																		setAppointmentDate(date);
																	}}
																	dropdownMode="select"
																	dateFormat="dd-MM-yyyy h:mm aa"
																	className="single-daterange form-control"
																	placeholderText="Select date of appointment"
																	name={name}
																	showTimeSelectOnly
																	timeInputLabel="Time: "
																	showTimeInput
																	disabledKeyboardNavigation
																/>
															</div>
														)}
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label>
														Consultation <Compulsory />
													</label>
													<Field
														name="consultation"
														component={ReactSelectAdapter}
														options={consultations}
														getOptionValue={option => option.value}
														getOptionLabel={option => option.label}
														placeholder="Select consultation"
													/>
													<ErrorBlock name="consultation" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Who do you want to see? <Compulsory />
													</label>
													<Field
														name="specialty"
														component={ReactSelectAdapter}
														options={services}
														getOptionValue={option => option.id}
														getOptionLabel={option => option.name}
														placeholder="Select a Specialty"
													/>
													<ErrorBlock name="specialty" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>Whom To See?</label>
													<Field
														name="doctor"
														render={({ name, input }) => (
															<Select
																name={name}
																searchable
																getOptionValue={option => option.id}
																getOptionLabel={option => option.label}
																options={doctors}
																value={doctor}
																onChange={(item, prevVal) => {
																	input.onChange(item);
																	setDoctor(item);
																}}
																placeholder="Select Whom to see"
															/>
														)}
													/>
													{doctor && (
														<small className="text-danger">
															{`Consultation ${doctor.room.name}`}
														</small>
													)}
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<label>Reason for visit</label>
													<Field
														name="description"
														className="form-control"
														component="textarea"
														placeholder="Enter a brief description"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-check">
													<label className="form-check-label">
														<input
															className="form-check-input mt-0"
															name="sendToQueue"
															type="checkbox"
															checked
															readOnly
														/>{' '}
														Add patient to queue
													</label>
												</div>
											</div>
										</div>
										<div className="row mt-2">
											<div className="col-sm-12 text-right">
												<button
													className="btn btn-secondary mr-2"
													onClick={closeModal}
												>
													Cancel
												</button>
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
		</div>
	);
};

export default ModalQueueAppointment;
