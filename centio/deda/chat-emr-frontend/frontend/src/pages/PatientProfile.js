import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import PatientMenu from '../components/Navigation/PatientMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import HashRoute from '../components/HashRoute';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import { confirmAction } from '../services/utilities';
import AncBlock from '../components/AncBlock';

const ClinicalTasks = lazy(() => import('../components/Patient/ClinicalTasks'));
const Nicu = lazy(() => import('../components/Patient/Nicu'));
const Dashboard = lazy(() => import('../components/Patient/Dashboard'));
const Lab = lazy(() => import('../components/Patient/Lab'));
const Encounters = lazy(() => import('../components/Patient/Encounters'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const Radiology = lazy(() => import('../components/Patient/Radiology'));
const Procedure = lazy(() => import('../components/Patient/Procedure'));
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const Allergies = lazy(() => import('../components/Patient/Allergies'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));
const ExcuseDuty = lazy(() => import('../components/Patient/ExcuseDuty'));
const CreateExcuseDuty = lazy(() => import('../components/CreateExcuseDuty'));
const IVFHistory = lazy(() => import('../components/Patient/IVFHistory'));
const AntenatalHistory = lazy(() =>
	import('../components/Patient/AntenatalHistory')
);
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const RadiologyRequest = lazy(() =>
	import('../components/Patient/RadiologyRequest')
);
const ProcedureRequest = lazy(() =>
	import('../components/Patient/ProcedureRequest')
);
const AllergyRequest = lazy(() =>
	import('../components/Patient/AllergyRequest')
);
const PatientAdmission = lazy(() =>
	import('../components/Patient/PatientAdmission')
);
const ImmunizationChart = lazy(() =>
	import('../components/Patient/ImmunizationChart')
);
const ProblemList = lazy(() => import('../components/Patient/ProblemList'));
const Documents = lazy(() => import('../components/Patient/Documents'));
const AdmissionHistory = lazy(() =>
	import('../components/Patient/AdmissionHistory')
);
const LabourHistory = lazy(() => import('../components/Patient/LabourHistory'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1).split('#');
	const patient = useSelector(state => state.user.patient);
	switch (hash[0]) {
		case 'encounters':
			return <Encounters patient={patient} />;
		case 'lab':
			return <Lab patient={patient} />;
		case 'lab-request':
			return <LabRequest module="patient" patient={patient} />;
		case 'pharmacy':
			return <Pharmacy patient={patient} />;
		case 'pharmacy-request':
			return <PharmacyRequest module="patient" patient={patient} />;
		case 'problem-list':
			return <ProblemList patient={patient} />;
		case 'documents':
			return <Documents patient={patient} />;
		case 'vitals':
			return (
				<Vitals
					patient={patient}
					type={hash[1].split('%20').join(' ')}
					category="general"
				/>
			);
		case 'allergens':
			return <Allergies patient={patient} />;
		case 'clinical-tasks':
			return <ClinicalTasks patient={patient} />;
		case 'nicu':
			return <Nicu patient={patient} />;
		case 'radiology':
			return <Radiology patient={patient} />;
		case 'radiology-request':
			return <RadiologyRequest module="patient" patient={patient} />;
		case 'procedure':
			return <Procedure patient={patient} />;
		case 'procedure-request':
			return <ProcedureRequest module="patient" patient={patient} />;
		case 'allergy-request':
			return <AllergyRequest patient={patient} />;
		case 'start-admission':
			return <PatientAdmission patient={patient} />;
		case 'immunization-chart':
			return <ImmunizationChart patient={patient} />;
		case 'excuse-duty':
			return <ExcuseDuty patient={patient} />;
		case 'new-excuse-duty':
			return <CreateExcuseDuty patient={patient} />;
		case 'ivf-history':
			return <IVFHistory patient={patient} />;
		case 'anc-history':
			return <AntenatalHistory patient={patient} />;
		case 'labour-history':
			return <LabourHistory patient={patient} />;
		case 'admission-history':
			return <AdmissionHistory patient={patient} />;
		default:
			return <Dashboard patient={patient} />;
	}
};

class PatientProfile extends Component {
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	confirmStartAdmission = () => {
		confirmAction(
			this.startAdmission,
			null,
			'Are you sure you want to place this patient on admission?',
			'Confirm Admission'
		);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#dashboard`);
		}
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	render() {
		const { location, patient } = this.props;
		return (
			<div className="layout-w">
				<button
					aria-label="Close"
					className="close custom-close"
					type="button"
					onClick={this.closeProfile}
				>
					<span className="os-icon os-icon-close" />
				</button>
				{patient ? (
					<Fragment>
						<PatientMenu />
						<div
							className="content-w content-w-l-18"
							style={{ width: 'calc(100% - 18%)', overflow: 'hidden' }}
						>
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock
												profile={true}
												patient={patient}
												hasButtons={true}
												canAdmit={true}
												canDischarge={true}
												canNewNote={true}
											/>
											{patient.antenatal_id && (
												<AncBlock
													patient={patient}
													enrollmentId={patient.antenatal_id}
												/>
											)}
										</div>
										<Suspense fallback={<Splash />}>
											<Switch>
												<HashRoute hash={location.hash} component={Page} />
											</Switch>
										</Suspense>
									</div>
								</div>
							</div>
						</div>
					</Fragment>
				) : (
					<div className="content-w">
						<div className="top-bar color-scheme-transparent"></div>
						<div className="content-i">
							<div className="content-box text-center">
								<h5>Patient record was not found</h5>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		patient: state.user.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(PatientProfile)
);
