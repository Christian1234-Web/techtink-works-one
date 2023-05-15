import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import ProcedureMenu from '../components/Navigation/ProcedureProfileMenu';
import SSRStorage from '../services/storage';
import { SIDE_PANEL } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';
import AncBlock from '../components/AncBlock';
import { toggleSidepanel } from '../actions/sidepanel';

const Notes = lazy(() => import('../components/Procedures/Notes'));
const Attachments = lazy(() => import('../components/Procedures/Attachments'));
const Consumables = lazy(() => import('../components/Patient/Consumables'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const MedicalReport = lazy(() =>
	import('../components/Procedures/MedicalReport')
);
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const NursingService = lazy(() =>
	import('../components/Patient/NursingService')
);

const storage = new SSRStorage();

const Page = ({ location }) => {
	const procedure = useSelector(state => state.sidepanel.item);
	const patient = useSelector(state => state.sidepanel.patient);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'attachments':
			return (
				<Attachments
					patient={patient}
					can_request={procedure && !procedure.finishedDate}
				/>
			);
		case 'consumables':
			return (
				<Consumables
					patient={patient}
					can_request={procedure && !procedure.finishedDate}
					itemId={procedure.id || ''}
					type="procedure"
				/>
			);
		case 'medical-report':
			return <MedicalReport patient={patient} />;
		case 'regimen':
			return (
				<Pharmacy
					patient={patient}
					can_request={procedure && !procedure.finishedDate}
					itemId={procedure.id || ''}
					type="procedure"
				/>
			);
		case 'pharmacy-request':
			return (
				<PharmacyRequest
					patient={patient}
					module="procedure"
					itemId={procedure.id || ''}
				/>
			);
		case 'nursing-service':
			return (
				<NursingService
					patient={patient}
					module="procedure"
					can_request={procedure && !procedure.finishedDate}
					itemId={procedure.id || ''}
				/>
			);
		case 'vitals':
			return (
				<Vitals
					patient={patient}
					type={hash[1].split('%20').join(' ')}
					category="general"
				/>
			);
		case 'notes':
		default:
			return (
				<Notes
					patient={patient}
					can_request={procedure && !procedure.finishedDate}
				/>
			);
	}
};

class ProcedureProfile extends Component {
	closeProfile = () => {
		storage.removeItem(SIDE_PANEL);
		this.props.toggleSidepanel(false);
	};

	componentDidMount() {
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#notes`);
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
						<div
							className="content-w"
							style={{ width: 'calc(100% - 18%)', overflow: 'hidden' }}
						>
							<ProcedureMenu />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock
												profile={true}
												patient={patient}
												hasButtons={false}
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
		patient: state.sidepanel.patient,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleSidepanel })(ProcedureProfile)
);
