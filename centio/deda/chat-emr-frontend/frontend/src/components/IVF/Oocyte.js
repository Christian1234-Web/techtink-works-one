import React, { useState } from 'react';
import DatePicker from 'antd/lib/date-picker';
import { Field } from 'react-final-form';
import moment from 'moment';

import { notifyError, notifySuccess } from '../../services/notify';
import {
	Compulsory,
	ErrorBlock,
	patientname,
	ReactSelectAdapter,
	request,
} from '../../services/utilities';
import FormWizard from '../FormWizard';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';

const Oocyte = ({ closeModal }) => {
	const [date, setDate] = useState('');

	const [, setNo_of_vitals] = useState('');
	const [displaySearch, setDisplaySearch] = useState(false);
	const [chosenPatient, setChosenPatient] = useState(null);
	const [service, setService] = useState(null);

	const no_of_vitals = [
		{ name: '1', id: 1 },
		{ name: '2', id: 2 },
		{ name: '3', id: 3 },
		{ name: '4', id: 4 },
		{ name: '5', id: 5 },
		{ name: '6', id: 6 },
		{ name: '7', id: 7 },
		{ name: '8', id: 8 },
		{ name: '9', id: 9 },
		{ name: '10', id: 10 },

		{ name: '1', id: 11 },
		{ name: '2', id: 12 },
		{ name: '3', id: 13 },
		{ name: '4', id: 14 },
		{ name: '5', id: 15 },
		{ name: '6', id: 16 },
		{ name: '7', id: 17 },
		{ name: '8', id: 18 },
		{ name: '9', id: 19 },
		{ name: '10', id: 20 },

		{ name: '1', id: 21 },
		{ name: '2', id: 22 },
		{ name: '3', id: 23 },
		{ name: '4', id: 24 },
		{ name: '5', id: 25 },
		{ name: '6', id: 26 },
		{ name: '7', id: 27 },
		{ name: '8', id: 28 },
		{ name: '9', id: 29 },
		{ name: '10', id: 30 },

		{ name: '1', id: 31 },
		{ name: '2', id: 32 },
		{ name: '3', id: 33 },
		{ name: '4', id: 34 },
		{ name: '5', id: 35 },
		{ name: '6', id: 36 },
		{ name: '7', id: 37 },
		{ name: '8', id: 38 },
		{ name: '1', id: 1 },
		{ name: '2', id: 2 },
		{ name: '3', id: 3 },
		{ name: '4', id: 4 },
		{ name: '5', id: 5 },
		{ name: '6', id: 6 },
		{ name: '7', id: 7 },
		{ name: '8', id: 8 },
		{ name: '9', id: 9 },
		{ name: '10', id: 10 },
	];

	const no_of_emb = [
		{ name: '1', id: 1 },
		{ name: '2', id: 2 },
		{ name: '3', id: 3 },
		{ name: '4', id: 4 },
		{ name: '5', id: 5 },
		{ name: '6', id: 6 },
		{ name: '7', id: 7 },
		{ name: '8', id: 8 },
		{ name: '9', id: 9 },
		{ name: '10', id: 10 },

		{ name: '11', id: 11 },
		{ name: '12', id: 12 },
		{ name: '13', id: 13 },
		{ name: '14', id: 14 },
		{ name: '15', id: 15 },
		{ name: '16', id: 16 },
		{ name: '17', id: 17 },
		{ name: '18', id: 18 },
		{ name: '19', id: 19 },
		{ name: '20', id: 20 },

		{ name: '21', id: 21 },
		{ name: '22', id: 22 },
		{ name: '23', id: 23 },
		{ name: '24', id: 24 },
		{ name: '25', id: 25 },
		{ name: '26', id: 26 },
		{ name: '27', id: 27 },
		{ name: '28', id: 28 },
		{ name: '29', id: 29 },
		{ name: '30', id: 30 },

		{ name: '31', id: 31 },
		{ name: '32', id: 32 },
		{ name: '33', id: 33 },
		{ name: '34', id: 34 },
		{ name: '35', id: 35 },
		{ name: '36', id: 36 },
		{ name: '37', id: 37 },
		{ name: '38', id: 38 },
		{ name: '39', id: 39 },
		{ name: '40', id: 40 },

		{ name: '41', id: 41 },
		{ name: '42', id: 42 },
		{ name: '43', id: 43 },
		{ name: '44', id: 44 },
		{ name: '45', id: 45 },
		{ name: '46', id: 46 },
		{ name: '47', id: 47 },
		{ name: '48', id: 48 },
		{ name: '49', id: 49 },
		{ name: '50', id: 50 },
	];

	const state_of_origin = [
		{ name: 'Abia State', id: 1 },
		{ name: 'Adamawa State', id: 2 },
		{ name: 'Akwa Ibom State', id: 3 },
		{ name: 'Anambra State', id: 4 },
		{ name: 'Bauchi State', id: 5 },
		{ name: 'Bayelsa State', id: 6 },
		{ name: 'Benue State', id: 7 },
		{ name: 'Borno State', id: 8 },
		{ name: 'Cross River State', id: 9 },
		{ name: 'Delta State', id: 10 },

		{ name: 'Ebonyi State', id: 11 },
		{ name: 'Edo State', id: 12 },
		{ name: 'Ekiti State', id: 13 },
		{ name: 'Enugu State', id: 14 },
		{ name: 'Federal Capital Territory', id: 15 },
		{ name: 'Gombe State', id: 16 },
		{ name: 'Imo State', id: 17 },
		{ name: 'Jigawa State', id: 18 },
		{ name: 'Kaduna State', id: 19 },
		{ name: 'Kano State', id: 20 },

		{ name: 'Katsina State', id: 21 },
		{ name: 'Kebbi State', id: 22 },
		{ name: 'Kogi State', id: 23 },
		{ name: 'Kwara State', id: 24 },
		{ name: 'Lagos State', id: 25 },
		{ name: 'Nasarawa State6', id: 26 },
		{ name: 'Niger State', id: 27 },
		{ name: 'Ogun State', id: 28 },
		{ name: 'Ondo State', id: 29 },
		{ name: 'Osun State', id: 30 },

		{ name: 'Oyo State', id: 31 },
		{ name: 'Plateau State', id: 32 },
		{ name: 'Rivers State', id: 33 },
		{ name: 'Sokoto State', id: 34 },
		{ name: 'Taraba State', id: 35 },
		{ name: 'Yobe State', id: 36 },
		{ name: 'Zamfara State', id: 37 },
		// { name: '8', id: 38 },
	];

	const initialValues = {
		grade: '',
		media_u: '',
		description: '',
		emb: '',
		no_strains: '',
		dewar: '',
		position: '',
		name: '',
		age: '',
		blood_g: '',
		state_origin: '',
		genotype: '',
		height: '',
		weight: '',
		bmi: '',
		comp: '',
	};

	const getPatients = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onSubmit = async values => {
		const donor_object = {
			name: values.name,
			age: parseInt(values.age),
			blood_g: values.blood_g,
			state: values.state_origin.name,
			genotype: values.genotype,
			height: parseFloat(values.height),
			weight: parseFloat(values.weight),
			bmi: values.bmi,
			comp: values.comp,
		};
		const data = {
			date: moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
			numOfOocyte: parseInt(values.emb.name),
			grade: values.grade,
			numOfStems: parseInt(values.no_strains.name),
			dewar: parseInt(values.dewar.name),
			position: parseInt(values.position.name),
			description: values.description,
			mediaUsed: values.media_u,
			donor: donor_object,
		};
		// console.log(data);
		try {
			const url = `freezing/oocyte/save`;
			const rs = await request(url, 'POST', true, data);
			console.log(rs);
			notifySuccess('Save Successful!');
			// closeModal();
		} catch (err) {
			console.log(err);
			notifyError('Failed to Save!');
			closeModal();
		}
	};

	return (
		<div
			className="p-2"
			style={{ height: '37rem', overflowY: 'scroll', overflowX: 'hidden' }}
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
						if (!values.media_u) {
							errors.media_u = 'Enter media used';
						}
						if (!values.grade) {
							errors.grade = 'Enter grade';
						}
						if (!values.no_strains) {
							errors.no_strains = 'Enter number of Strains';
						}
						if (!values.description) {
							errors.description = 'Enter description';
						}
						if (!values.dewar) {
							errors.dewar = 'Enter dewar';
						}
						if (!values.position) {
							errors.position = 'Enter position';
						}
						if (!values.name) {
							errors.name = 'Enter name';
						}
						if (!values.age) {
							errors.age = 'Enter age';
						}
						if (!values.emb) {
							errors.emb = 'Enter emb';
						}

						if (!values.blood_g) {
							errors.blood_g = 'Enter blood group';
						}
						if (!values.state_origin) {
							errors.state_origin = 'Enter state of origin';
						}
						if (!values.genotype) {
							errors.genotype = 'Enter genotype';
						}
						if (!values.height) {
							errors.height = 'Enter height';
						}
						if (!values.weight) {
							errors.weight = 'Enter weight';
						}
						if (!values.bmi) {
							errors.bmi = 'Enter bmi';
						}
						if (!values.comp) {
							errors.comp = 'Enter completion';
						}

						return errors;
					}}
				>
					<div className="row">
						<div className="col-sm-4">
							<div className="form-group">
								<label>Date</label> <Compulsory />
								<div>
									<DatePicker
										style={{ width: '25rem' }}
										onChange={e => setDate(e)}
									/>
									<ErrorBlock name="date" />
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>No of Oocyte/EMB</label>
								<Compulsory />
								<div>
									<Field
										name="emb"
										placeholder="Select Number of Oocyte/EMB"
										options={no_of_emb}
										component={ReactSelectAdapter}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										// onChange={e => setNo_of_vitals(e.name)}
									/>
									<ErrorBlock name="emb" />
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Grade</label>
								{/* <Compulsory /> */}
								<Field
									name="grade"
									className="form-control"
									component="input"
									type="text"
									placeholder="Grade"
								/>
								{/* <ErrorBlock name="grade" /> */}
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>No of Straws</label> <Compulsory />
								<div>
									<Field
										name="no_strains"
										placeholder="Select Number of Straws"
										options={no_of_vitals}
										component={ReactSelectAdapter}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										// onChange={e => setNo_of_vitals(e.name)}
									/>
									<ErrorBlock name="no_strains" />
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Dewar</label> <Compulsory />
								<div>
									<Field
										name="dewar"
										placeholder="Select Number of Dewar"
										options={no_of_vitals}
										component={ReactSelectAdapter}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										// onChange={e => setNo_of_vitals(e.name)}
									/>
									<ErrorBlock name="dewar" />
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Position</label> <Compulsory />
								<div>
									<Field
										name="position"
										placeholder="Select Number of Position"
										options={no_of_vitals}
										component={ReactSelectAdapter}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										// onChange={e => setNo_of_vitals(e.name)}
									/>
									<ErrorBlock name="position" />
								</div>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label>Media Used</label>
								<Compulsory />
								<Field
									name="media_u"
									className="form-control"
									component="input"
									type="text"
									placeholder="Media Used"
								/>
								<ErrorBlock name="media_u" />
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label>Description</label> <Compulsory />
								<Field
									name="description"
									className="form-control"
									component="textarea"
									type="text"
									placeholder="Description"
								/>
								<ErrorBlock name="description" />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-3 d-flex justify-content-around">
							<div>
								<input
									type="radio"
									id="donor"
									name="oocyte"
									value="donor"
									onClick={() => setDisplaySearch(false)}
								/>
								<label for="donor" className="m-2">
									Donor
								</label>
							</div>
							<div>
								<input
									type="radio"
									id="client"
									name="oocyte"
									value="client"
									onClick={() => setDisplaySearch(true)}
								/>
								<label for="client" className="m-2">
									Client
								</label>
							</div>
						</div>
					</div>
					{displaySearch && (
						<div className="row">
							<div className="form-group col-sm-12">
								<label htmlFor="patient">Patient Name</label>
								<AsyncSelect
									isClearable
									getOptionValue={option => option.id}
									getOptionLabel={option => patientname(option, true)}
									defaultOptions
									name="patient"
									loadOptions={getPatients}
									onChange={e => {
										if (e) {
											setChosenPatient(e);
										} else {
											setChosenPatient(null);
											setService([]);
										}
									}}
									placeholder="Search patients"
								/>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-sm-4">
							<div className="form-group">
								<label>Name</label> <Compulsory />
								<Field
									name="name"
									className="form-control"
									component="input"
									type="text"
									placeholder="Name"
								/>
								<ErrorBlock name="name" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Age</label> <Compulsory />
								<Field
									name="age"
									className="form-control"
									component="input"
									type="text"
									placeholder="Age"
								/>
								<ErrorBlock name="age" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Blood Group</label> <Compulsory />
								<Field
									name="blood_g"
									className="form-control"
									component="input"
									type="text"
									placeholder="Blood Group"
								/>
								<ErrorBlock name="blood_g" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>State of Origin</label> <Compulsory />
								<div>
									<Field
										name="state_origin"
										placeholder="Select State of Origin"
										options={state_of_origin}
										component={ReactSelectAdapter}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										// onChange={e => setNo_of_vitals(e.name)}
									/>
									<ErrorBlock name="state_origin" />
								</div>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Genotype</label> <Compulsory />
								<Field
									name="genotype"
									className="form-control"
									component="input"
									type="text"
									placeholder="Genotype"
								/>
								<ErrorBlock name="genotype" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Height</label> <Compulsory />
								<Field
									name="height"
									className="form-control"
									component="input"
									type="number"
									placeholder="Genotype"
								/>
								<ErrorBlock name="height" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Weight</label> <Compulsory />
								<Field
									name="weight"
									className="form-control"
									component="input"
									type="number"
									placeholder="Genotype"
								/>
								<ErrorBlock name="weight" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>BMI</label> <Compulsory />
								<Field
									name="bmi"
									className="form-control"
									component="input"
									type="text"
									placeholder="Genotype"
								/>
								<ErrorBlock name="bmi" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label>Complexion</label> <Compulsory />
								<Field
									name="comp"
									className="form-control"
									component="input"
									type="text"
									placeholder="Completion"
								/>
								<ErrorBlock name="comp" />
							</div>
						</div>
					</div>
				</FormWizard.Page>
			</FormWizard>
		</div>
	);
};
export default Oocyte;
