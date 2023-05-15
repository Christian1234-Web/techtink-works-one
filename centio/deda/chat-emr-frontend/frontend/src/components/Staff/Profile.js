import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useSelector } from 'react-redux';

import { request, staffname } from '../../services/utilities';
import { TOKEN_COOKIE } from '../../services/constants';
import SSRStorage from '../../services/storage';
import { notifyError, notifySuccess } from '../../services/notify';

const storage = new SSRStorage();

const Profile = () => {
	const [fetching, setFetching] = useState(false);
	const [staff, setStaff] = useState(null);

	const view_profile = useRef();
	const view_edit_profile = useRef();
	const btn_edit_profile = useRef();

	const [file, setFile] = useState(null);
	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [middle_name, setMiddle_name] = useState('');
	const [gender, setGender] = useState('');
	const [nationality, setNationality] = useState('');
	const [selected_religion, setReligion] = useState('');
	const [lga, setLga] = useState('--');
	const [selected_lga, setSelected_lga] = useState('');
	const [selected_state_of_origin, setSelected_state_of_origin] = useState('');
	const [state_of_origin, setState_of_origin] = useState();
	const [department, setDepartment] = useState();
	const [selected_department, setSelected_department] = useState('');

	const [selected_marital_status, setMarital_status] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [employee_number, setEmployee_number] = useState('');
	const [account_number, setAccount_number] = useState('');
	const [back_name, setBank_name] = useState('');
	const [job_title, setJob_title] = useState('');
	const [specialization, setSpecialization] = useState(null);
	const [selected_specialization, setSelected_specialization] = useState(
		staff === null ? '--' : staff.details.specialization
	);
	const state_department = useSelector(state => state.department);

	// console.log(staff);

	const genders = [
		{ name: 'Male', id: 1 },
		{ name: 'Female', id: 2 },
		{ name: 'Other', id: 3 },
	];
	const religion = [
		{ name: 'Christianity', id: 1 },
		{ name: 'Islam', id: 2 },
		{ name: 'Other', id: 3 },
	];
	const marital_status = [
		{ name: 'Single', id: 1 },
		{ name: 'Married', id: 2 },
		{ name: 'Other', id: 3 },
	];

	const updateStaffProfile = async (e, file) => {
		e.preventDefault();
		// console.log(staff);
		const data = {
			first_name,
			other_names: middle_name,
			last_name,
			phone,
			email,
			nationality,
			religion: selected_religion,
			marital_status: selected_marital_status,
			gender,
			employee_number,
			bank_name: back_name,
			account_number,
			department: selected_department,
			selected_lga,
			selected_state_of_origin,
			specialization: selected_specialization,
			job_title,
		};
		// console.log(data);
		try {
			const url = `hr/staffs/${staff.id}`;
			const rs = await request(url, 'PUT', true, data);
			console.log(rs);
			notifySuccess('Updated Successfully!');
			fetchStaff();
		} catch (err) {
			console.log(err);
			notifyError('Updated Failed!');
		}
	};

	const fetchDepartment = useCallback(() => {
		setDepartment(state_department);
	}, [state_department]);

	const fetchSpecialization = useCallback(async () => {
		try {
			const url = `specializations`;
			const rs = await request(url, 'GET', true);
			setSpecialization(rs);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const fetchStaff = useCallback(async () => {
		const user = await storage.getItem(TOKEN_COOKIE);
		try {
			const url = `auth/${user.username}`;
			const rs = await request(url, 'GET', true);
			setStaff(rs);

			setLga(rs?.details?.lga || '--');
			setState_of_origin(rs?.details?.state_of_origin || '');
			console.log(rs);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const showEditProfile = () => {
		// console.log(staff)
		setFirst_name(staff.details.first_name);
		setLast_name(staff.details.last_name);
		setMiddle_name(staff.details.other_names);
		setEmail(staff.details.email);
		setPhone(staff.details.phone);
		// setGender(staff.details.gender);
		setNationality(staff.details.nationality);
		// setSelected_lga(staff.details.lga);
		// setSelected_department(staff.details.selected_department);
		// setState_of_origin(staff.details.state_of_origin);
		setEmployee_number(staff.details.employee_number);
		setAccount_number(staff.details.account_number);
		setBank_name(staff.details.bank_name);
		setJob_title(staff.details.job_title);
		// setSelected_specialization(staff.details.specialization);

		view_profile.current.style.display = 'none';
		btn_edit_profile.current.style.display = 'none';
		view_edit_profile.current.style.display = '';
	};

	useEffect(() => {
		if (fetching) {
			fetchStaff();
			fetchDepartment();
			fetchSpecialization();
			setFetching(false);
		}
	}, [fetchStaff, fetchDepartment, fetchSpecialization, fetching]);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				{/* <div className="element-box p-3 m-0">&nbsp;</div> */}

				<div className="card p-4" style={{ border: '1px solid #fff' }}>
					<div className="card-body">
						<div
							className="card-title fs-5 mb-4 d-flex justify-content-between"
							style={{ borderBottom: '1px solid #eee' }}
						>
							<div className="mb-2"> Profile Details</div>

							<div
								className="up-controls mb-2"
								ref={btn_edit_profile}
								style={{ display: '' }}
							>
								<div className="row">
									<div
										className="col-lg-12 text-center mt-4"
										onClick={showEditProfile}
									>
										<Link
											to={`${`setting`}#edit`}
											className="btn btn-primary btn-sm"
										>
											<i className="os-icon os-icon-edit-32"></i>
											<span> Edit Profile</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div ref={view_edit_profile} style={{ display: 'none' }}>
							<form onSubmit={e => updateStaffProfile(e, file)}>
								<div className="row">
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="firstnameinput" className="form-label">
												First Name
											</label>
											<input
												type="text"
												className="form-control"
												id="firstnameinput"
												placeholder="Enter your first name"
												value={first_name}
												onChange={e => setFirst_name(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="firstnameinput" className="form-label">
												Middle Name
											</label>
											<input
												type="text"
												className="form-control"
												id="firstnameinput"
												placeholder="Enter your Middle Name"
												value={middle_name}
												onChange={e => setMiddle_name(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="lastnameinput" className="form-label">
												Last Name
											</label>
											<input
												type="text"
												className="form-control"
												id="lastnameinput"
												placeholder="Enter your last name"
												value={last_name}
												onChange={e => setLast_name(e.target.value)}
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="form-group">
											<label className="form-label">Departments</label>
											<Select
												name="department"
												placeholder="Select Department"
												options={department}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setSelected_department(e.id)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="phonenumberinput" className="form-label">
												Phone Number
											</label>
											<input
												type="text"
												className="form-control"
												id="phonenumberinput"
												placeholder="Enter your phone number"
												value={phone}
												onChange={e => setPhone(e.target.value)}
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Nationality
											</label>
											<input
												type="text"
												className="form-control"
												id="emailinput"
												placeholder="Enter nationality"
												style={{ background: '#fff' }}
												value={nationality}
												onChange={e => setNationality(e.target.value)}
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Upload Image
											</label>
											<input
												type="file"
												className="form-control"
												id="emailinput"
												onChange={e => setFile(e.target.files[0])}
												style={{ background: '#fff' }}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												State of Origin
											</label>
											<Select
												name="state_of_origin"
												placeholder="Select State of Origin"
												options={state_of_origin}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setSelected_state_of_origin(e.name)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Local Gov
											</label>
											<Select
												name="local_gov"
												placeholder="Select Local Gov"
												options={lga}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setSelected_lga(e.name)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Religion
											</label>
											<Select
												name="religion"
												placeholder="Select Religion"
												options={religion}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setReligion(e.name)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Specialization
											</label>
											<Select
												name="specialization"
												placeholder="Select Specialization"
												options={specialization}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setSelected_specialization(e.id)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												id="emailinput"
												placeholder="Enter email"
												style={{ background: '#fff' }}
												value={email}
												onChange={e => setEmail(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Bank Name
											</label>
											<input
												type="text"
												className="form-control"
												id="emailinput"
												placeholder="Enter bank name"
												style={{ background: '#fff' }}
												value={back_name}
												onChange={e => setBank_name(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Account Number
											</label>
											<input
												type="text"
												className="form-control"
												id="emailinput"
												placeholder="Enter account number"
												style={{ background: '#fff' }}
												value={account_number}
												onChange={e => setAccount_number(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Employee Number
											</label>
											<input
												type="text"
												className="form-control"
												id="emailinput"
												placeholder="Enter employee number"
												style={{ background: '#fff' }}
												value={employee_number}
												onChange={e => setEmployee_number(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Job Title
											</label>
											<input
												type="text"
												className="form-control"
												id="emailinput"
												placeholder="Enter job title"
												style={{ background: '#fff' }}
												value={job_title}
												onChange={e => setJob_title(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="emailinput" className="form-label">
												Marital Status
											</label>
											<Select
												name="marital_status"
												placeholder="Select Marital Status"
												options={marital_status}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setMarital_status(e.name)}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="mb-3">
											<label htmlFor="genderInput" className="form-label">
												Gender
											</label>
											<Select
												name="gender"
												placeholder="Select Gender"
												options={genders}
												getOptionValue={option => option.id}
												getOptionLabel={option => option.name}
												onChange={e => setGender(e.name)}
												isClearable={false}
											/>
										</div>
									</div>
									<div className="col-lg-4">
										<div className="d-flex justify-content-between mt-3">
											<Link to="#">
												<button type="button" className="btn btn-danger">
													Cancel
												</button>
											</Link>
											<button type="submit" className="btn btn-primary">
												Update Profile
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>

						<div
							className="card-text"
							ref={view_profile}
							style={{ fontSize: '12px', display: '' }}
						>
							<div className="row">
								<div className="col">
									<p className="">Full Name :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staffname(staff === null ? '--' : staff.details)}
									</h6>
								</div>

								<div className="col">
									<p className="">Employee Number :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.employee_number || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Email :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.email || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Employee Start Date :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.employment_start_date || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Phone Number :</p>
								</div>
								<div className="col">
									<h6 className="">+23480 6575 444</h6>
								</div>

								<div className="col">
									<p className="">Account Number :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.account_number || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Nationality :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.nationality || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Bank Name :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.bank_name || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Gender :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.gender || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Is Consultant</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.is_consultant || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Department :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.department?.name || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Contract Type :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.contract_type || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Marital Status :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.marital_status || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Job Title :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.job_title || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Local Gov :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.lga || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Specialization :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.specialization || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">State Of Origin :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null
											? '--'
											: staff.details?.state_of_origin || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Profession :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.profession || '--'}
									</h6>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p className="">Religion :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.religion || '--'}
									</h6>
								</div>
								<div className="col">
									<p className="">Address :</p>
								</div>
								<div className="col">
									<h6 className="">
										{staff === null ? '--' : staff.details?.address || '--'}
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
