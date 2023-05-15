import React, { useState } from 'react';
import { notifyError, notifySuccess } from '../../services/notify';
import { patientname, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';

export const VerifyPhone = ({ closeModal, appointment, updateAppointment }) => {
	const [submitting, setSubmitting] = useState(false);
	const [number, setNumber] = useState(appointment?.patient?.phone_number);
	// eslint-disable-next-line no-unused-vars
	const [patientName, setPatientName] = useState(
		patientname(appointment?.patient)
	);
	const [changed, setChanged] = useState(false);

	const updatePhoneFunc = e => {
		const { value } = e.target;
		setNumber(value);

		setChanged(true);
	};
	console.log('appointment Id', appointment?.id);

	const SubmitPhone = async (id, newnumber, changed) => {
		try {
			const url = `patient/edit/phone/?pid=${id}`;
			const hash_send = `patient/hash/send/?pid=${id}`;

			setSubmitting(true);

			if (changed) {
				const result = await request(url, 'PATCH', true, {
					phone_number: newnumber,
				});

				console.log(result);

				if (result.success) {
					// setNumber(result.patient?.phone_number);
					notifySuccess('Phone saved!');
					closeModal();
					let rs = await request(hash_send, 'POST', true, {
						phone: result.patient?.phone_number,
						username: patientName,
						appointmentId: appointment?.id,
					});

					if (rs.success) {
						updateAppointment(rs?.appointment);
					}
				}
				// Generate and Send Link
			} else {
				// GENERATE LINK
				let rs = await request(hash_send, 'POST', true, {
					phone: number,
					username: patientName,
					appointmentId: appointment?.id,
				});
				if (rs.success) {
					updateAppointment(rs.appointment);
				}
				closeModal();
				notifySuccess('Survey sent!');
			}
			setSubmitting(false);
		} catch (error) {
			console.log(error);
			notifyError('Error saving Phone');
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
				style={{ maxWidth: '320px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Phone Number</h4>

						<div className="form-block">
							<form
								onSubmit={e => {
									e.preventDefault();
									SubmitPhone(appointment?.patient?.id, number, changed);
								}}
							>
								<div className="row">
									<div className="col-sm-12">
										{!number && (
											<label style={{ color: 'red' }}>
												Phone Number required
											</label>
										)}
										<input
											className="form-control"
											type="text"
											value={number}
											onChange={updatePhoneFunc}
										/>
									</div>
								</div>

								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											type="submit"
											disabled={!number}
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : changed ? (
												'Save & Send'
											) : (
												'Send'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
