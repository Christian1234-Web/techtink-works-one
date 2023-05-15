import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Splash from '../../components/Splash';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

const General = lazy(() => import('../../components/Enrollment/General'));
const FathersInfo = lazy(() =>
	import('../../components/Enrollment/FathersInfo')
);
const ObstericsHistory = lazy(() =>
	import('../../components/Enrollment/ObstericsHistory')
);
const PreviousPregnancies = lazy(() =>
	import('../../components/Enrollment/PreviousPregnancies')
);
const EnrollmentPackages = lazy(() =>
	import('../../components/Enrollment/EnrollmentPackages')
);

class EnrollmentForm extends Component {
	state = {
		page: 1,
		submitting: false,
		patient: null,
		doctors: [],
		lmp: '',
		dob: '',
	};

	submitAntenatal = async data => {
		try {
			this.props.startBlock();
			const { history, location, reset } = this.props;
			this.setState({ submitting: true });
			const url = 'patient/antenatal';
			const rs = await request(url, 'POST', true, data);
			this.props.stopBlock();
			this.setState({ submitting: false });
			if (rs.success) {
				notifySuccess('antenatal enrollment done!');
				reset('antenatal');
				history.push(
					location.hash
						? `${location.pathname}#dashboard`
						: '/antenatal/enrolled'
				);
			} else {
				notifyError(rs.message || 'antenatal enrollment failed');
			}
		} catch (e) {
			this.props.stopBlock();
			this.setState({ submitting: false });
			notifyError(e.message || 'antenatal enrollment failed');
		}
	};

	setInput = (value, type) => {
		this.setState({ [type]: value });
	};

	nextPage = async data => {
		if (this.state.page === 5) {
			const { patient, doctors, lmp, dob } = this.state;

			if (!patient) {
				notifyError('please select antenatal patient');
				return;
			}

			const obstericHistory = {
				gestDelivery: data.gestDelivery || '',
				deliveredWhere: data.deliveredWhere || '',
				sex: data.sex || '',
				weight: data.weight || '',
				alive: data.obsteric_alive || '',
				dob: dob ? moment(dob).format('DD-MMM-YYYY') : '',
				abnormalities: data.abnormalities || '',
				comment: data.additional_comment || '',
			};

			let history = null;
			if (Object.values(obstericHistory).filter(x => x).length > 0) {
				history = Object.fromEntries(
					Object.entries(obstericHistory).filter(([_, v]) => v !== '')
				);
			}

			const newAntenatal = {
				patient_id: patient?.id,
				bookingPeriod: data.bookingPeriod || '',
				doctors: doctors,
				lmp: lmp !== '' ? moment(lmp).format('YYYY-MM-DD') : '',
				lmpSource: data.lmpSource,
				edd: lmp !== '' ? moment(lmp).add(40, 'w').format('YYYY-MM-DD') : '',
				father: {
					name: data.name || '',
					phone: data.phone || '',
					blood_group: data.blood_group || '',
				},
				history: {
					category: 'obstericHistory',
					description: history,
				},
				previousPregnancy: {
					gravida: data.gravida || '',
					para: data.para || '',
					alive: data.alive || '',
					miscarriage: data.miscarriage || '',
					abortion: data.abortion || '',
				},
				enrollment_package_id: data.package_id,
			};

			this.submitAntenatal(newAntenatal);
			return;
		}

		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page + 1,
			};
		});
	};

	previousPage = () => {
		this.setState(prevState => {
			return {
				...prevState,
				page: prevState.page - 1,
			};
		});
	};

	setPatient = patient => {
		this.setState({ patient });
	};

	setDoctors = doctors => {
		this.setState({ doctors });
	};

	render() {
		const { page, submitting, patient, lmp, doctors, dob } = this.state;
		return (
			<div className="element-box">
				<Suspense fallback={<Splash />}>
					{page === 1 && (
						<General
							onSubmit={this.nextPage}
							page={page}
							setPatient={this.setPatient}
							patient={patient}
							setDoctors={this.setDoctors}
							doctors={doctors}
							setInput={this.setInput}
							lmp={lmp}
						/>
					)}
					{page === 2 && (
						<FathersInfo
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							page={page}
						/>
					)}

					{page === 3 && (
						<ObstericsHistory
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							setInput={this.setInput}
							dob={dob}
							page={page}
						/>
					)}
					{page === 4 && (
						<PreviousPregnancies
							previousPage={this.previousPage}
							onSubmit={this.nextPage}
							page={page}
						/>
					)}

					{page === 5 && (
						<EnrollmentPackages
							submitting={submitting}
							previousPage={this.previousPage}
							page={page}
							doSubmit={this.nextPage}
						/>
					)}
				</Suspense>
			</div>
		);
	}
}

EnrollmentForm = reduxForm({
	form: 'antenatal', //Form name is same
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(EnrollmentForm);

export default withRouter(
	connect(null, { startBlock, stopBlock })(EnrollmentForm)
);
