import React from 'react';
import ModalHeader from '../ModalHeader';

const ShowAppointment = ({ closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-md modal-centered">
				<div className="modal-content modal-scroll text-center">
					<ModalHeader closeModal={closeModal} title="Appointment" />
					<div className="onboarding-content with-gradient"></div>
				</div>
			</div>
		</div>
	);
};

export default ShowAppointment;
