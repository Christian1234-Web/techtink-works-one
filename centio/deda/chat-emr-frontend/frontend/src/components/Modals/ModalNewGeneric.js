import React, { useState } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useDispatch } from 'react-redux';

import { renderTextInput, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import ModalHeader from '../ModalHeader';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}

	return errors;
};

const ModalNewGeneric = ({ closeModal, handleSubmit, error }) => {
	const [submitting, setSubmitting] = useState(false);

	const dispatch = useDispatch();

	const save = async data => {
		try {
			dispatch(startBlock());
			setSubmitting(true);
			const info = { ...data };
			await request('inventory/generics', 'POST', true, info);
			setSubmitting(false);
			dispatch(stopBlock());
			notifySuccess('Generic name created!');
			closeModal();
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			throw new SubmissionError({
				_error: 'could not add new generic name',
			});
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
					<ModalHeader title="Add Generic Name" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<form onSubmit={handleSubmit(save)}>
								{error && (
									<div
										className="alert alert-danger"
										dangerouslySetInnerHTML={{
											__html: `<strong>Error!</strong> ${error}`,
										}}
									/>
								)}
								<div className="row">
									<div className="col-sm-12">
										<Field
											id="name"
											name="name"
											component={renderTextInput}
											label="Generic name"
											type="text"
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-12 text-right">
										<button
											className="btn btn-primary"
											disabled={submitting}
											type="submit"
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'Save'
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

export default reduxForm({ form: 'new-generic', validate })(ModalNewGeneric);
