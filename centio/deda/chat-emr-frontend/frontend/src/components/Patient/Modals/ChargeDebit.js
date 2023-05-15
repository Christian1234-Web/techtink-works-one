import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { notifyError, notifySuccess } from '../../../services/notify';
import { request } from '../../../services/utilities';
import { startBlock, stopBlock } from '../../../actions/redux-block';

const ChargeDebit = ({ patient, onHide, refresh }) => {
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const save = async () => {
		try {
			if (amount === '') {
				notifyError('Enter amount');
				return;
			}

			if (description === '') {
				notifyError('Enter description');
				return;
			}

			dispatch(startBlock());
			const data = {
				amount,
				patient_id: patient.id,
				type: 'debit-charge',
				description,
			};
			const url = 'transactions/debit-account';
			await request(url, 'POST', true, data);
			refresh();
			notifySuccess('Account Debited!');
			onHide();
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			notifyError(error.message || 'Could not debit account');
			dispatch(stopBlock());
		}
	};

	return (
		<div
			className="onboarding-modal fade animated show"
			role="dialog"
			style={{ width: '300px' }}
		>
			<div className="modal-centered">
				<div className="modal-content">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => onHide()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<div className="form-group col-sm-12">
								<label>Amount</label>
								<input
									name="amount"
									onChange={e => setAmount(e.target.value)}
									className="form-control"
									placeholder="Amount"
									type="number"
								/>
							</div>
							<div className="form-group col-sm-12">
								<label>Description</label>
								<input
									name="description"
									onChange={e => setDescription(e.target.value)}
									className="form-control"
									placeholder="Description"
									type="text"
								/>
							</div>
							<div className="row">
								<div className="col-sm-12 text-right">
									<button className="btn btn-primary" onClick={() => save()}>
										save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChargeDebit;
