import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { useDispatch } from 'react-redux';

import ModalHeader from '../ModalHeader';
import { startBlock, stopBlock } from '../../actions/redux-block';
import {
	Compulsory,
	ErrorBlock,
	request,
	updateImmutable,
} from '../../services/utilities';
import { staffAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';

const ModalEditSalary = ({ closeModal, staff, staffs, updateStaffs }) => {
	const dispatch = useDispatch();

	let initialValues = {};
	if (staff) {
		initialValues = {
			monthly_salary: staff?.monthly_salary || '0',
			annual_salary: staff?.annual_salary || '0',
		};
	}

	const onSubmit = async values => {
		try {
			const data = {
				...values,
			};

			dispatch(startBlock());
			const url = `${staffAPI}/${staff.id}/salary`;
			const rs = await request(url, 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				const allStaffs = staff
					? updateImmutable(staffs, rs.staff)
					: [rs.staff, ...staffs];
				updateStaffs(allStaffs);
				notifySuccess('Staff account saved!');
				closeModal();
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not save staff profile',
				};
			}
		} catch (e) {
			console.log(e.message);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save staff profile' };
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
					<ModalHeader title="Edit Staff Salary" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<Form
							onSubmit={onSubmit}
							initialValues={Object.fromEntries(
								Object.entries(initialValues).filter(([_, v]) => v !== '')
							)}
							validate={values => {
								const errors = {};
								if (!values.monthly_salary) {
									errors.monthly_salary = 'Enter monthly salary';
								}
								if (!values.annual_salary) {
									errors.annual_salary = 'Enter annual salary';
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
										<div className="col-sm">
											<div className="form-group">
												<label>
													Gross Salary (Monthly) <Compulsory />
												</label>
												<Field
													name="monthly_salary"
													className="form-control"
													component="input"
													type="number"
													placeholder="Gross Salary (Monthly)"
												/>
												<ErrorBlock name="monthly_salary" />
											</div>
										</div>
										<div className="col-sm">
											<div className="form-group">
												<label>
													Gross Salary (Annually) <Compulsory />
												</label>
												<Field
													name="annual_salary"
													className="form-control"
													component="input"
													type="number"
													placeholder="Gross Salary (Annually)"
												/>
												<ErrorBlock name="annual_salary" />
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
	);
};

export default ModalEditSalary;
