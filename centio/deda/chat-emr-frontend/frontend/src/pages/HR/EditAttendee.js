import { useState, useEffect } from 'react';
import Select from 'react-select';

import waiting from '../../assets/images/waiting.gif';

import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';

const EditAttendee = ({ staffId, closeModal, updateState }) => {
	const [loaded, setLoaded] = useState(false);
	const [departments, setDepartments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [department, setDepartment] = useState(null);

	async function getActiveDepartments() {
		try {
			const rs = await request('departments', 'GET', true);
			const res = rs.map(item => ({
				...item,
				label: item.name,
			}));
			setDepartments(res);
			console.log(res);
		} catch (e) {}
	}

	const OnSubmit = async e => {
		try {
			e.preventDefault();
			const url = `hr/attendance/user/update/${staffId}`;
			const values = {
				department_id: department,
			};
			const rs = await request(url, 'PATCH', true, values);

			if (rs.success) {
				notifySuccess('Department updated');
				closeModal();
				console.log(rs);
				updateState(rs.data);
			} else {
				notifyError(rs.message || 'Could not update department');
				console.log(rs);
			}
		} catch (error) {
			setSubmitting(false);
			notifyError(error.message || 'Could not update department');
			console.log(error);
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
				style={{ maxWidth: '620px' }}
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
						<h4 className="onboarding-title">update department</h4>

						<div className="form-block">
							<form onSubmit={OnSubmit}>
								<div className="row">
									<div className="form-group col-sm-12">
										<label>Department</label>
										<Select
											id="department"
											name="department"
											placeholder="Select a department"
											options={departments}
											onChange={e => {
												if (e == null) {
													setDepartment(null);
												} else {
													setDepartment(e.id);
												}
											}}
										/>
										{!department && (
											<small className="text-danger">select a department</small>
										)}
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-12 text-center">
										<button
											className="btn btn-primary"
											type="submit"
											disabled={submitting || !department}
										>
											{submitting ? (
												<img src={waiting} alt="submitting" />
											) : (
												'update Department'
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

export default EditAttendee;
