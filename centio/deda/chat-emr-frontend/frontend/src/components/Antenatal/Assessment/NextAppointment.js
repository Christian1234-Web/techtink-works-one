/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';
import {
	antenatalAPI,
	CK_ASSESSMENT,
	defaultAssessment,
	durationTypes,
} from '../../../services/constants';
import { notifyError } from '../../../services/notify';
import { notifySuccess } from '../../../services/notify';
import { messageService } from '../../../services/message';
import { updateAssessmentData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';

const storage = new SSRStorage();

const NextAppointment = ({
	appointment_id,
	previous,
	closeModal,
	antenatal,
	patient,
	refresh,
}) => {
	const [loaded, setLoaded] = useState(false);
	const [items, setItems] = useState(null);

	const [datetime, setDatetime] = useState('');
	const [duration, setDuration] = useState('');
	const [durationType, setDurationType] = useState('');

	const [appointmentDate, setAppointmentDate] = useState('');

	const [error, setError] = useState('');
	const [available, setAvailable] = useState('');

	const dispatch = useDispatch();

	const assessment = useSelector(state => state.patient.assessmentData);
	const staff = useSelector(state => state.user.profile.details);

	const retrieveData = useCallback(async () => {
		const appointmentData = assessment?.nextAppointment;

		setItems(appointmentData);

		setDatetime(appointmentData?.datetime || '');
		if (appointmentData?.datetime && appointmentData.datetime !== '') {
			setAppointmentDate(new Date(moment(appointmentData.datetime)));
		}
		setDuration(appointmentData?.duration || '');
		setDurationType(appointmentData?.duration_type || '');
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const checkAvailableDate = async () => {
		try {
			setAvailable('');
			setError('');

			if (datetime === '') {
				notifyError('Select date');
				return;
			}

			if (duration === '') {
				notifyError('Select duration');
				return;
			}

			if (durationType === '') {
				notifyError('Select duration type');
				return;
			}

			dispatch(startBlock());
			const data = {
				datetime,
				staff_id: staff.id,
				duration,
				duration_type: durationType,
			};
			const url = 'doctor_appointments/check-availability';
			const rs = await request(url, 'POST', true, data);
			const _time = moment(datetime).format('DD-MMM-YYYY h:mm A');
			dispatch(stopBlock());
			if (rs && rs.success && rs.available) {
				setAvailable(`The selected time (${_time}) is available`);
			} else {
				setError(`The selected time (${_time}) is not available`);
			}
		} catch (e) {
			console.log(e);
			dispatch(stopBlock());
			notifyError('Error, could not check date');
		}
	};

	const saveAppointment = data => {
		setItems(data);
		dispatch(
			updateAssessmentData({ ...assessment, nextAppointment: data }, patient.id)
		);
	};

	const saveAssessment = async e => {
		try {
			e.preventDefault();
			dispatch(startBlock());
			const general = assessment.general;
			const info = {
				...assessment,
				measurement: {
					vitals: {
						height_of_fundus: general?.heightOfFundus,
						fetal_heart_rate: general?.fetalHeartRate,
					},
					position_of_foetus: general?.positionOfFoetus,
					fetal_lie: general?.fetalLie,
					brim: general?.relationshipToBrim,
				},
				nextAppointment: {
					...assessment.nextAppointment,
					doctor_id: staff.id,
				},
				appointment_id,
			};
			const url = `${antenatalAPI}/assessments/${antenatal.id}`;
			const rs = await request(url, 'POST', true, info);
			dispatch(stopBlock());
			if (rs && rs.success) {
				if (appointment_id && appointment_id !== '') {
					messageService.sendMessage({
						type: 'update-appointment',
						data: { appointment: rs.appointment },
					});
				}

				notifySuccess('Assessment completed successfully');
				dispatch(updateAssessmentData(defaultAssessment));
				try {
					refresh();
				} catch (e) {}
				storage.removeItem(CK_ASSESSMENT);
				closeModal(true);
			} else {
				dispatch(stopBlock());
				setError('Error, could not save antenatal assessment');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setError('Error, could not save antenatal assessment');
		}
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={saveAssessment}>
				{error && (
					<div
						className="alert alert-danger"
						dangerouslySetInnerHTML={{
							__html: `<strong>Error!</strong> ${error}`,
						}}
					/>
				)}
				{available !== '' && (
					<div className="alert alert-success">{available}</div>
				)}
				<div className="row">
					<div className="col-sm-3">
						<div className="form-group">
							<label>Appointment Date</label>
							<DatePicker
								dateFormat="dd-MMM-yyyy h:mm aa"
								className="single-daterange form-control"
								selected={appointmentDate}
								timeInputLabel="Time: "
								showTimeInput
								timeFormat="HH:mm"
								onChange={date => {
									setAppointmentDate(date);
									const datetime = moment(new Date(date)).format(
										'YYYY-MM-DD HH:mm:ss'
									);
									setDatetime(datetime);
									const data = { ...items, datetime };
									saveAppointment(data);
								}}
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>Duration of Appointment</label>
							<input
								type="number"
								className="form-control"
								placeholder="Enter duration"
								name="duration"
								onChange={e => {
									setDuration(e.target.value);
									const data = { ...items, duration: e.target.value };
									saveAppointment(data);
								}}
								value={duration}
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label>(Minutes/Hour/Days/etc)</label>
							<select
								name="duration_type"
								value={durationType}
								onChange={e => {
									setDurationType(e.target.value);
									const data = { ...items, duration_type: e.target.value };
									saveAppointment(data);
								}}
								className="form-control"
							>
								<option value="">-- Select --</option>
								{durationTypes.map((d, i) => {
									return (
										<option key={i} value={d.value}>
											{d.label}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="form-group">
							<label className="d-block">&nbsp;</label>
							<a className="btn btn-secondary" onClick={checkAvailableDate}>
								Check Availability
							</a>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Finish
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NextAppointment;
