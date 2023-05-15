import React, { useState, useEffect, useCallback } from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { format, isValid } from 'date-fns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';

import FormWizard from '../FormWizard';
import {
	genders,
	maritalStatuses,
	relationships,
	religions,
	contracts,
	staffAPI,
} from '../../services/constants';

import {
	Compulsory,
	ErrorBlock,
	ReactSelectAdapter,
	request,
	updateImmutable,
} from '../../services/utilities';

import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import { loadDepartments } from '../../actions/department';
import ModalHeader from '../ModalHeader';

const ModalCreateStaff = ({ updateStaffs, closeModal, staff, staffs }) => {
	const [loading, setLoading] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [nation, setNation] = useState(null);
	const [states, setStates] = useState([]);
	const [dateOfEmployment, setDateOfEmployment] = useState(null);
	const [nokDateOfBirth, setNokDateOfBirth] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [signatureRawData, setSignatureRawData] = useState('');
	const [signatureImageData, setSignatureImageData] = useState('');
	const [imgHeight, setImgHeight] = useState(0);
	const [imgWidth, setImgWidth] = useState(0);

	const departments = useSelector(state => state.department);
	const roles = useSelector(state => state.role.roles);
	const countries = useSelector(state => state.utility.countries);
	const banks = useSelector(state => state.utility.banks);
	const specializations = useSelector(state => state.settings.specializations);

	const sortedCountries = countries.sort((a, b) => (a.name > b.name ? 1 : -1));

	const dispatch = useDispatch();

	const getCountry = (staff, countries) => {
		const id = staff.nationality ? parseInt(staff.nationality, 10) : '';
		return countries.find(c => c.id === id);
	};

	let initialValues = {};
	if (staff) {
		const id = staff.nationality ? parseInt(staff.nationality, 10) : '';
		const country = countries.find(c => c.id === id);
		const state_id = staff.state_of_origin
			? parseInt(staff.state_of_origin, 10)
			: '';

		initialValues = {
			username: staff.user?.username || '',
			role: staff.user?.role || '',
			department: staff.department || '',
			first_name: staff?.first_name || '',
			last_name: staff?.last_name || '',
			other_names: staff?.other_names || '',
			date_of_birth: staff.date_of_birth
				? moment(staff.date_of_birth, 'YYYY-MM-DD').format('DD-MM-YYYY')
				: '',
			gender: staff.gender ? { label: staff.gender, value: staff.gender } : '',
			religion: staff.religion
				? { label: staff.religion, value: staff.religion }
				: '',
			country: staff.nationality ? country : '',
			state_of_origin: country
				? country.states.find(s => s.id === state_id)
				: '',
			lga: staff?.lga || '',
			email: staff?.email || '',
			phone_number: staff?.phone_number || '',
			address: staff?.address || '',
			is_consultant: staff?.is_consultant || false,
			profession: staff?.profession || '',
			job_title: staff?.job_title || '',
			specialization: staff?.specialization || '',
			date_of_employment: staff.employment_start_date
				? moment(staff.employment_start_date, 'YYYY-MM-DD').format('DD-MM-YYYY')
				: '',
			contract_type: staff.contract_type
				? { label: staff.contract_type, value: staff.contract_type }
				: '',
			employee_number: staff?.employee_number || '',
			bank: staff.bank_name ? banks.find(b => b.name === staff.bank_name) : '',
			account_number: staff?.account_number || '',
			pension_manager: staff?.pension_mngr || '',
			monthly_salary: staff?.monthly_salary || '0',
			annual_salary: staff?.annual_salary || '0',
			marital_status: staff.marital_status
				? { value: staff.marital_status, label: staff.marital_status }
				: '',
			number_of_children: staff?.number_of_children || '',
			nok_name: staff?.next_of_kin || '',
			nok_relationship: staff.next_of_kin_relationship
				? {
						value: staff.next_of_kin_relationship,
						label: staff.next_of_kin_relationship,
				  }
				: '',
			sign: signatureImageData,
			nok_phoneNumber: staff?.next_of_kin_contact_no || '',
			nok_address: staff?.next_of_kin_address || '',
			nok_date_of_birth: staff.next_of_kin_dob
				? moment(staff.next_of_kin_dob, 'YYYY-MM-DD').format('DD-MM-YYYY')
				: '',
		};
	}

	useEffect(() => {
		if (!loaded) {
			if (staff) {
				if (staff.date_of_birth) {
					setDateOfBirth(moment(staff.date_of_birth, 'YYYY-MM-DD').toDate());
				} else {
					setDateOfBirth(null);
				}
				if (staff.nationality) {
					const country = getCountry(staff, countries);
					setNation(country);
					setStates(country?.states || []);
				}
				if (staff.employment_start_date) {
					setDateOfEmployment(
						moment(staff.employment_start_date, 'YYYY-MM-DD').toDate()
					);
				} else {
					setDateOfEmployment(null);
				}
				if (staff.next_of_kin_dob) {
					setNokDateOfBirth(
						moment(staff.next_of_kin_dob, 'YYYY-MM-DD').toDate()
					);
				} else {
					setNokDateOfBirth(null);
				}
				setAvatar(staff.profile_pic);
			}
			setLoaded(true);
		}
	}, [countries, loaded, staff]);

	const fetchDepartment = useCallback(async () => {
		try {
			const rs = await request('departments', 'GET', true);
			dispatch(loadDepartments(rs));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			notifyError(error.message || 'could not fetch departments!');
		}
	}, [dispatch]);

	useEffect(() => {
		if (loading) {
			fetchDepartment();
		}
	}, [fetchDepartment, loading]);

	const onSubmit = async values => {
		try {
			const data = {
				...values,
				date_of_birth: moment(values.date_of_birth, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
				employment_start_date: moment(
					values.date_of_employment,
					'DD-MM-YYYY'
				).format('YYYY-MM-DD'),
				next_of_kin_dob:
					values.nok_date_of_birth && values.nok_date_of_birth !== ''
						? moment(values.nok_date_of_birth, 'DD-MM-YYYY').format(
								'YYYY-MM-DD'
						  )
						: '',
				bank_name: values.bank?.name || '',
				contract_type: values.contract_type?.value || '',
				department_id: values.department?.id || '',
				gender: values.gender?.value || '',
				marital_status: values.marital_status?.value || '',
				next_of_kin_relationship: values.nok_relationship?.value || '',
				religion: values.religion?.value || '',
				role_id: values.role?.id || '',
				specialization_id: values.specialization?.id || '',
				state_of_origin: values.state_of_origin?.id || '',
				nationality: values.country?.id || null,
				pension_mngr: values?.pension_manager || null,
				next_of_kin: values?.nok_name || null,
				next_of_kin_address: values?.nok_address || null,
				next_of_kin_contact_no: values?.nok_phoneNumber || null,
				profile_pic: avatar,
			};

			dispatch(startBlock());
			const url = staff ? `${staffAPI}/${staff.id}` : staffAPI;
			const rs = await request(url, staff ? 'PUT' : 'POST', true, data);
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

	const startSigning = () => {
		const canvasObj = document.getElementById('cvs');
		canvasObj
			.getContext('2d')
			.clearRect(0, 0, canvasObj.width, canvasObj.height);
		setImgWidth(canvasObj.width);
		setImgHeight(canvasObj.height);

		const message = {
			firstName: '',
			lastName: '',
			eMail: '',
			location: '',
			imageFormat: 1,
			imageX: imgWidth,
			imageY: imgHeight,
			imageTransparency: false,
			imageScaling: false,
			maxUpScalePercent: 0.0,
			rawDataFormat: 'ENC',
			minSigPoints: 25,
		};

		document.addEventListener(
			'SigCaptureWeb_SignResponse',
			SignResponse,
			false
		);
		const messageData = JSON.stringify(message);
		const element = document.createElement('SigCaptureWeb_ExtnDataElem');
		element.setAttribute('SigCaptureWeb_MsgAttribute', messageData);
		document.documentElement.appendChild(element);
		const evt = document.createEvent('Events');
		evt.initEvent('SigCaptureWeb_SignStartEvent', true, false);
		element.dispatchEvent(evt);
	};

	const SignResponse = event => {
		const str = event.target.getAttribute('SigCaptureWeb_msgAttri');
		const obj = JSON.parse(str);
		SetValues(obj, imgWidth, imgHeight);
	};

	const SetValues = (objResponse, imageWidth, imageHeight) => {
		const obj = JSON.parse(JSON.stringify(objResponse));
		const ctx = document.getElementById('cvs').getContext('2d');

		if (
			obj.errorMsg !== null &&
			obj.errorMsg !== '' &&
			obj.errorMsg !== 'undefined'
		) {
			alert(obj.errorMsg);
		} else {
			if (obj.isSigned) {
				setSignatureImageData(obj.imageData);
				setSignatureRawData(obj.rawData);

				const img = new Image();
				img.onload = function () {
					ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
				};
				img.src = 'data:image/png;base64,' + obj.imageData;
			}
		}
	};

	const ClearFormData = () => {
		setSignatureImageData('');
		setSignatureRawData('');
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-lg" style={{ maxWidth: '1024px' }}>
				<div className="modal-content text-center">
					<ModalHeader
						title={staff ? 'Edit Staff Record' : 'New Staff Account'}
						closeModal={closeModal}
					/>
					<div className="onboarding-content with-gradient">
						<div className="modal-body">
							<div className="support-index">
								<div className="support-ticket-content-w">
									<div
										className="support-ticket-info"
										style={{ flex: '0 0 200px' }}
									>
										<div
											className="customer mb-0 pb-0"
											style={{ width: '110px', borderBottom: '0 none' }}
										>
											<div
												className="avatar"
												style={{
													width: '110px',
													borderRadius: '65px',
													margin: 'auto',
												}}
											>
												<img
													alt=""
													style={{ width: '110px', borderRadius: '65px' }}
													src={require('../../assets/images/placeholder.jpg')}
												/>
											</div>
											<div className="mt-3 text-center">
												<button className="btn btn-info btn-small text-white">
													<i className="os-icon os-icon-ui-51" /> upload picture
												</button>
												<button className="btn btn-primary btn-small mt-2">
													<i className="os-icon os-icon-ui-65" /> take photo
												</button>
											</div>
										</div>
									</div>
								</div>
								<div
									className=""
									style={{
										width: 'calc(100% - 240px)',
										marginLeft: '20px',
									}}
								>
									<FormWizard
										initialValues={Object.fromEntries(
											Object.entries(initialValues).filter(([_, v]) => v !== '')
										)}
										onSubmit={onSubmit}
										btnClasses="modal-footer buttons-on-right"
									>
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.username) {
													errors.username = 'Enter staff username';
												}
												if (!values.role) {
													errors.role = 'Select staff role';
												}
												if (!values.department) {
													errors.department = 'Select department';
												}
												if (!values.first_name) {
													errors.first_name = 'Enter first name';
												}
												if (!values.last_name) {
													errors.last_name = 'Enter last name';
												}
												if (!values.date_of_birth) {
													errors.date_of_birth = 'Select date of birth';
												}
												if (!values.gender) {
													errors.gender = 'Select gender';
												}
												if (!values.religion) {
													errors.religion = 'Select religion';
												}
												if (!values.country) {
													errors.country = 'Select nationality';
												}
												if (!values.state_of_origin) {
													errors.state_of_origin = 'Select state of origin';
												}
												if (!values.lga) {
													errors.lga = 'Enter staff lga';
												}
												if (!values.email) {
													errors.email = 'Enter email address';
												}
												if (!values.phone_number) {
													errors.phone_number = 'Enter phone number';
												}
												if (!values.address) {
													errors.address = 'Enter address';
												}
												return errors;
											}}
										>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Username <Compulsory />
														</label>
														<Field
															name="username"
															className="form-control"
															component="input"
															type="text"
															placeholder="Username"
															disabled={staff !== null}
														/>
														<ErrorBlock name="username" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															User Role <Compulsory />
														</label>
														<Field
															name="role"
															component={ReactSelectAdapter}
															options={roles}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
															isDisabled={staff !== null}
														/>
														<ErrorBlock name="role" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Department <Compulsory />
														</label>
														<Field
															name="department"
															component={ReactSelectAdapter}
															options={departments}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<ErrorBlock name="department" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															First Name <Compulsory />
														</label>
														<Field
															name="first_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="First Name"
														/>
														<ErrorBlock name="first_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Last Name <Compulsory />
														</label>
														<Field
															name="last_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="Last Name"
														/>
														<ErrorBlock name="last_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Other Names</label>
														<Field
															name="other_names"
															className="form-control"
															component="input"
															type="text"
															placeholder="Other Names"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Date of Birth <Compulsory />
														</label>
														<Field
															name="date_of_birth"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={dateOfBirth}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setDateOfBirth(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of birth"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
														<ErrorBlock name="date_of_birth" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Gender <Compulsory />
														</label>
														<Field
															name="gender"
															component={ReactSelectAdapter}
															options={genders}
														/>
														<ErrorBlock name="gender" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Religion <Compulsory />
														</label>
														<Field
															name="religion"
															component={ReactSelectAdapter}
															options={religions}
														/>
														<ErrorBlock name="religion" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Nationality <Compulsory />
														</label>
														<Field
															name="country"
															render={({ name, input }) => (
																<Select
																	name={name}
																	searchable
																	getOptionValue={option => option.id}
																	getOptionLabel={option => option.name}
																	options={sortedCountries}
																	value={nation}
																	onChange={(item, prevVal) => {
																		input.onChange(item);
																		setNation(item);
																		setStates(item.states);
																	}}
																/>
															)}
														/>
														<ErrorBlock name="country" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															State of Origin <Compulsory />
														</label>
														<Field
															name="state_of_origin"
															component={ReactSelectAdapter}
															options={states}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<ErrorBlock name="state_of_origin" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															LGA <Compulsory />
														</label>
														<Field
															name="lga"
															className="form-control"
															component="input"
															type="text"
															placeholder="LGA"
														/>
														<ErrorBlock name="lga" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Email Address <Compulsory />
														</label>
														<Field
															name="email"
															className="form-control"
															component="input"
															type="email"
															placeholder="Email Address"
														/>
														<ErrorBlock name="email" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Phone Number <Compulsory />
														</label>
														<Field
															name="phone_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Phone Number"
														/>
														<ErrorBlock name="phone_number" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Address <Compulsory />
														</label>
														<Field
															name="address"
															className="form-control"
															component="input"
															type="text"
															placeholder="Address"
														/>
														<ErrorBlock name="address" />
													</div>
												</div>
											</div>
										</FormWizard.Page>
										<FormWizard.Page
											validate={values => {
												const errors = {};
												if (!values.profession) {
													errors.profession = 'Enter staff profession';
												}
												if (!values.specialization) {
													errors.specialization = 'Select specialization';
												}
												if (!values.date_of_employment) {
													errors.date_of_employment =
														'Select date of employment';
												}
												if (!values.contract_type) {
													errors.contract_type = 'Select type of contract';
												}
												if (!values.bank) {
													errors.bank = 'Select bank';
												}
												if (!values.account_number) {
													errors.account_number = 'Enter salary account number';
												}
												if (!values.marital_status) {
													errors.marital_status = 'Select marital status';
												}
												if (!values.nok_name) {
													errors.nok_name = 'Enter next of kin name';
												}
												if (!values.nok_relationship) {
													errors.nok_relationship =
														'Select next of kin relationship';
												}
												if (!values.nok_phoneNumber) {
													errors.nok_phoneNumber =
														'Enter next of kin phone number';
												}
												return errors;
											}}
										>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label className="mr-3">Is Consultant</label>
														<Field
															name="is_consultant"
															component="input"
															type="checkbox"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Profession <Compulsory />
														</label>
														<Field
															name="profession"
															className="form-control"
															component="input"
															type="text"
															placeholder="Profession"
														/>
														<ErrorBlock name="profession" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Job Title</label>
														<Field
															name="job_title"
															className="form-control"
															component="input"
															type="text"
															placeholder="Job Title"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Specialization <Compulsory />
														</label>
														<Field
															name="specialization"
															component={ReactSelectAdapter}
															options={specializations}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<ErrorBlock name="specialization" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Date of Employment <Compulsory />
														</label>
														<Field
															name="date_of_employment"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={dateOfEmployment}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setDateOfEmployment(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of employment"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
														<ErrorBlock name="date_of_employment" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Type of Contract <Compulsory />
														</label>
														<Field
															name="contract_type"
															component={ReactSelectAdapter}
															options={contracts}
														/>
														<ErrorBlock name="contract_type" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Employee Number</label>
														<Field
															name="employee_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Employee Number"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Bank <Compulsory />
														</label>
														<Field
															name="bank"
															component={ReactSelectAdapter}
															options={banks}
															getOptionValue={option => option.id}
															getOptionLabel={option => option.name}
														/>
														<ErrorBlock name="bank" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Account Number <Compulsory />
														</label>
														<Field
															name="account_number"
															className="form-control"
															component="input"
															type="text"
															placeholder="Account Number"
														/>
														<ErrorBlock name="account_number" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Pension Manager</label>
														<Field
															name="pension_manager"
															className="form-control"
															component="input"
															type="text"
															placeholder="Pension Manager"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Marital Status <Compulsory />
														</label>
														<Field
															name="marital_status"
															component={ReactSelectAdapter}
															options={maritalStatuses}
														/>
														<ErrorBlock name="marital_status" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Number of Children</label>
														<Field
															name="number_of_children"
															className="form-control"
															component="input"
															type="text"
															placeholder="Number of Children"
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Name <Compulsory />
														</label>
														<Field
															name="nok_name"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Name"
														/>
														<ErrorBlock name="nok_name" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Relationship to Staff</label>
														<Field
															name="nok_relationship"
															component={ReactSelectAdapter}
															options={relationships}
														/>
														<ErrorBlock name="nok_relationship" />
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>
															Next of Kin Phone Number <Compulsory />
														</label>
														<Field
															name="nok_phoneNumber"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Phone Number"
														/>
														<ErrorBlock name="nok_phoneNumber" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Address</label>
														<Field
															name="nok_address"
															className="form-control"
															component="input"
															type="text"
															placeholder="NOK Address"
														/>
													</div>
												</div>
												<div className="col-sm">
													<div className="form-group">
														<label>Next of Kin Date of Birth</label>
														<Field
															name="nok_date_of_birth"
															render={({ name, input: { onChange } }) => (
																<div className="custom-date-input">
																	<DatePicker
																		selected={nokDateOfBirth}
																		onChange={date => {
																			isValid(date)
																				? onChange(
																						format(new Date(date), 'dd-MM-yyyy')
																				  )
																				: onChange(null);
																			setNokDateOfBirth(date);
																		}}
																		peekNextMonth
																		showMonthDropdown
																		showYearDropdown
																		dropdownMode="select"
																		dateFormat="dd-MM-yyyy"
																		className="single-daterange form-control"
																		placeholderText="Select date of birth"
																		maxDate={new Date()}
																		name={name}
																		disabledKeyboardNavigation
																	/>
																</div>
															)}
														/>
													</div>
												</div>
											</div>
										</FormWizard.Page>
										<FormWizard.Page onChange={() => console.log('malik')}>
											<div className="signature-pad-wrapper">
												<div className="d-flex justify-content-around align-items-center">
													<h2 className="header">Please Sign Here</h2>
													<div>
														<button
															onClick={startSigning}
															type="button"
															className="btn btn-sm btn-primary"
														>
															Click to Sign
														</button>
													</div>
												</div>
												<canvas
													id="cvs"
													className="signature-pad"
													width="500"
													height="150"
												></canvas>
												<div className="signature-data-wrapper">
													{/* <div className="signature-raw-data">
														{signatureRawData}
													</div> */}
													{/* <div className="signature-image-data">
														{signatureImageData}
													</div> */}
												</div>
											</div>
										</FormWizard.Page>
									</FormWizard>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ModalCreateStaff);
