/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { qsParse } from '../../services/utilities';
import AllAppointments from './AllAppointments';
import PatientForm from '../../components/Modals/PatientForm';
import {
	hasCreateAppointmentPermission,
	hasViewAppointmentPermission,
} from '../../permission-utils/appointment';
import DoctorsAppointment from '../../components/Modals/DoctorsAppointment';

const Appointments = ({ location }) => {
	const [activePage, setActivePage] = useState('');
	const [count, setCount] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showAppointment, setShowAppointment] = useState(false);

	const staff = useSelector(state => state.user.profile);

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}

		const query = qsParse(location.search.replace('?', ''));
		setCount(parseInt(query?.new || 0, 10) + 1);
	}, [activePage, location.search, page]);

	const newPatient = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const openAppointments = () => {
		document.body.classList.add('modal-open');
		setShowAppointment(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
		setShowAppointment(false);
	};

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						{hasViewAppointmentPermission(staff.permissions) && (
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'queue' ? 'active' : ''
									}`}
									to="/front-desk/appointments/queue"
								>
									Todays Appointments
								</Link>
							</li>
						)}
						{hasViewAppointmentPermission(staff.permissions) && (
							<li className="nav-item">
								<Link
									aria-expanded="false"
									className={`nav-link ${
										activePage === 'history' ? 'active' : ''
									}`}
									to="/front-desk/appointments/history"
								>
									All Appointments
								</Link>
							</li>
						)}
						<li className="nav-item nav-actions d-sm-block">
							<a
								className="btn btn-primary btn-sm"
								onClick={() => openAppointments()}
							>
								<i className="os-icon os-icon-basic-2-259-calendar"></i>
								<span>Doctors Appointments</span>
							</a>
							<a
								className="btn btn-primary btn-sm"
								onClick={() => newPatient()}
							>
								<i className="os-icon os-icon-plus-circle"></i>
								<span>New Patient</span>
							</a>
							{hasCreateAppointmentPermission(staff.permissions) && (
								<Link
									className="btn btn-primary btn-sm"
									to={{
										pathname: '/front-desk/appointments/queue',
										search: `?new=${count}`,
										state: { from: location.pathname },
									}}
								>
									<i className="os-icon os-icon-plus-circle"></i>
									<span>New Appointment</span>
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
			{activePage === 'queue' && <AllAppointments filter="today" />}
			{activePage === 'history' && <AllAppointments filter="all" />}
			{showModal && <PatientForm closeModal={() => closeModal()} />}
			{showAppointment && (
				<DoctorsAppointment closeModal={() => closeModal()} isDoctor={false} />
			)}
		</div>
	);
};

export default Appointments;
