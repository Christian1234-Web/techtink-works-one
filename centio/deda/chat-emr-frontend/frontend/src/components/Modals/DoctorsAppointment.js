import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import ModalHeader from '../ModalHeader';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	formatDate,
	formatPatientId,
	patientname,
	request,
	parseClass,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import TableLoading from '../TableLoading';
import ShowAppointment from './ShowAppointment';

const DoctorsAppointment = ({ closeModal, isDoctor }) => {
	const [loaded, setLoaded] = useState(false);
	const [appointments, setAppointments] = useState([]);
	const [appointment, setAppointment] = useState(null);
	const [showAppointment, setShowAppointment] = useState(false);

	const dispatch = useDispatch();

	const profile = useSelector(state => state.user.profile);

	const fetchAppointments = useCallback(
		async period => {
			try {
				dispatch(startBlock());
				const staff_id = isDoctor ? profile.details.id : '';
				const uri = `doctor_appointments?staff_id=${staff_id}`;
				const rs = await request(uri, 'GET', true);
				const items = rs.map(a => ({
					...a,
					title: patientname(a.patient, false),
					date: a.appointment_datetime,
					className: parseClass(a.is_booked ? 'on' : 'morning'),
				}));
				setAppointments(items);
				dispatch(stopBlock());
				setLoaded(true);
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				setLoaded(true);
				notifyError('could not fetch appointments');
			}
		},
		[dispatch, isDoctor, profile]
	);

	useEffect(() => {
		if (!loaded) {
			fetchAppointments();
		}
	}, [fetchAppointments, loaded]);

	const handleEventClick = args => {
		if (!isDoctor) {
			document.body.classList.add('modal-open');
			setAppointment(args.event.extendedProps);
			// setShowAppointment(true)
		}
	};

	const closeAppointment = () => {
		setShowAppointment(false);
		setAppointment(null);
	};

	function renderEventContent(item) {
		return (
			<div className="p-2">
				<span>
					{formatDate(item.event.extendedProps.appointment_datetime, 'h:mm A')}
				</span>
				<br />
				<span>{item.event.title}</span>
				<br />
				<span>{formatPatientId(item.event.extendedProps.patient)}</span>
			</div>
		);
	}

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
					<ModalHeader closeModal={closeModal} title="Doctors Appointment" />
					<div className="onboarding-content with-gradient">
						{!loaded ? (
							<TableLoading />
						) : (
							<FullCalendar
								plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
								headerToolbar={{
									left: 'prev,next today',
									center: 'title',
									right: 'dayGridMonth',
								}}
								initialView="dayGridMonth"
								events={appointments}
								eventContent={renderEventContent}
								dayMaxEventRows={true}
								views={{
									dayGridMonth: {
										dayMaxEventRows: 3,
									},
								}}
								eventClick={handleEventClick}
							/>
						)}
					</div>
				</div>
			</div>
			{showAppointment && (
				<ShowAppointment
					appointment={appointment}
					closeModal={closeAppointment}
				/>
			)}
		</div>
	);
};

export default DoctorsAppointment;
