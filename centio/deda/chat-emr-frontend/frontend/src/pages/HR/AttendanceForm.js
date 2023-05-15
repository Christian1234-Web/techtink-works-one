import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { attendanceSchema } from '../../services/validationSchemas';
import { request, staffname } from '../../services/utilities';

import AsyncSelect from 'react-select/async/dist/react-select.esm';

import waiting from '../../assets/images/waiting.gif';

import { useDispatch } from 'react-redux';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';

const AttendanceForm = ({ closeModal }) => {
	const dispatch = useDispatch();

	const getOptionValues = option => option.id;
	const getOptionLabels = option => staffname(option);

	const [loaded, setLoaded] = useState(false);
	const [departments, setDepartments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [staff, setStaff] = useState();

	const { register, handleSubmit, setValue, errors } = useForm({
		validationSchema: attendanceSchema,
	});

	async function getActiveDepartments() {
		try {
			const rs = await request('departments', 'GET', true);
			const res = rs.map(item => ({
				...item,
				label: item.name,
			}));
			setDepartments(res);
		} catch (e) {}
	}

	const getStaffs = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `hr/staffs/find?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const submitUserForm = async data => {
		try {
			dispatch(startBlock());
			setSubmitting(true);

			const values = {
				...data,
				first_name: data.firstname,
				last_name: data.lastname,
				employee_number: data.employee_number,
				staff_id: data.staff,
				department_id: data.department,
			};

			console.log('values', values);
			// Send Req
			const url = 'hr/attendance/create-user';
			const rs = await request(url, 'POST', true, values);
			setSubmitting(false);
			dispatch(stopBlock());
			if (rs.success) {
				notifySuccess('User created successfully');
				closeModal();
			} else {
				notifyError(rs.message || 'Could not create user');
				closeModal();
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			setSubmitting(false);
			closeModal();
			notifyError(error.message || 'Could not create user');
		}
	};

	useEffect(() => {
		if (!loaded) {
			try {
				getActiveDepartments();
			} catch (e) {}
			setLoaded(true);
		}
	}, [loaded]);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '720px' }}
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
						<h4 className="onboarding-title">Enroll Staff</h4>
						<div className="form-block">
							<form onSubmit={handleSubmit(submitUserForm)}>
								<div className="row">
									<div className="form-group col-sm-4">
										<label>Staff</label>
										<AsyncSelect
											isClearable
											getOptionValue={getOptionValues}
											getOptionLabel={getOptionLabels}
											defaultOptions
											name="staff"
											ref={register({ name: 'staff' })}
											value={staff}
											loadOptions={getStaffs}
											onChange={e => {
												console.log(e);
												if (e == null) {
													setValue('staff', '');
													setValue('firstname', null);
													setValue('lastname', null);
													setStaff(null);
												} else {
													setValue('staff', e?.id);
													setValue('firstname', e?.first_name);
													setValue('lastname', e?.last_name);
													setStaff(e);
												}
											}}
											placeholder="Search Staff"
										/>
										<small className="text-danger">
											{errors.staff && errors.staff.message}
										</small>
									</div>
									{/* Input */}
									<div className="form-group col-sm-4">
										<label>First name</label>
										<input
											className="form-control"
											type="text"
											name="firstname"
											ref={register}
											disabled={staff}
										/>
										<small className="text-danger">
											{errors.firstname && errors.firstname.message}
										</small>
									</div>
									<div className="form-group col-sm-4">
										<label>Last name</label>
										<input
											className="form-control"
											type="text"
											name="lastname"
											ref={register}
											disabled={staff}
										/>
										<small className="text-danger">
											{errors.lastname && errors.lastname.message}
										</small>
									</div>

									<div className="form-group col-sm-6">
										<label>Employee ID</label>
										<input
											className="form-control"
											type="text"
											name="employee_number"
											ref={register}
										/>
										<small className="text-danger">
											{errors.employee_number && errors.employee_number.message}
										</small>
									</div>

									<div className="form-group col-sm-6">
										<label>Department</label>
										<Select
											id="department"
											name="department"
											placeholder="Select a department"
											ref={register({ name: 'department' })}
											options={departments}
											onChange={e => {
												if (e == null) {
													setValue('department', null);
												} else {
													setValue('department', e?.id);
												}
											}}
										/>
										<small className="text-danger">
											{errors.department && errors.department.message}
										</small>
									</div>
								</div>

								{/* Begin with button */}
								<div className="modal-footer buttons-on-right">
									<button
										className="btn btn-primary"
										type="submit"
										disabled={submitting}
									>
										{submitting ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Create user'
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AttendanceForm;
