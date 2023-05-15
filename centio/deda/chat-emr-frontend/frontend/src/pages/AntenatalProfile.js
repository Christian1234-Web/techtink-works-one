/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Suspense, lazy, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import AntenatalMenu from '../components/Navigation/AntenatalProfileMenu';
import SSRStorage from '../services/storage';
import { SIDE_PANEL } from '../services/constants';
import Splash from '../components/Splash';
import ProfileBlock from '../components/ProfileBlock';
import HashRoute from '../components/HashRoute';
import AncBlock from '../components/AncBlock';
import { toggleSidepanel } from '../actions/sidepanel';

const Notes = lazy(() => import('../components/Antenatal/Notes'));
const Vitals = lazy(() => import('../components/Patient/Vitals'));
const Pharmacy = lazy(() => import('../components/Patient/Pharmacy'));
const Radiology = lazy(() => import('../components/Patient/Radiology'));
const PharmacyRequest = lazy(() =>
	import('../components/Patient/PharmacyRequest')
);
const RadiologyRequest = lazy(() =>
	import('../components/Patient/RadiologyRequest')
);
const Lab = lazy(() => import('../components/Patient/Lab'));
const LabRequest = lazy(() => import('../components/Patient/LabRequest'));
const ObstHistory = lazy(() => import('../components/Antenatal/ObstHistory'));
const GynaeHistory = lazy(() => import('../components/Antenatal/GynaeHistory'));
const AntenatalAssessments = lazy(() =>
	import('../components/Antenatal/AntenatalAssessments')
);

const storage = new SSRStorage();

const Page = ({ location }) => {
	const antenatal = useSelector(state => state.sidepanel.item);
	const patient = useSelector(state => state.sidepanel.patient);
	const hash = location.hash.substr(1).split('#');
	switch (hash[0]) {
		case 'radiology':
			return (
				<Radiology
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'radiology-request':
			return (
				<RadiologyRequest
					patient={patient}
					module="antenatal"
					itemId={antenatal.id || ''}
				/>
			);
		case 'regimen':
			return (
				<Pharmacy
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'pharmacy-request':
			return (
				<PharmacyRequest
					patient={patient}
					module="antenatal"
					itemId={antenatal.id || ''}
				/>
			);
		case 'lab':
			return (
				<Lab
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
					itemId={antenatal.id || ''}
					type="antenatal"
				/>
			);
		case 'lab-request':
			return (
				<LabRequest
					patient={patient}
					module="antenatal"
					itemId={antenatal.id || ''}
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
		case 'assessments':
			return (
				<AntenatalAssessments
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
				/>
			);
		case 'gynae-history':
			return (
				<GynaeHistory
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
				/>
			);
		case 'obst-history':
			return (
				<ObstHistory
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
				/>
			);
		case 'notes':
		default:
			return (
				<Notes
					patient={patient}
					can_request={antenatal && antenatal.status === 0}
				/>
			);
	}
};

class AntenatalProfile extends Component {
	closeProfile = () => {
		storage.removeItem(SIDE_PANEL);
		this.props.toggleSidepanel(false);
	};

	componentDidMount() {
		setTimeout(() => {
			this.props.history.push('/antenatal/enrolled#notes');
		}, 1200);
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(`${location.pathname}#anc-history`);
	}

	render() {
		const { location, patient, antenatal } = this.props;
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
							<AntenatalMenu />
							<div className="content-i">
								<div className="content-box">
									<div className="row">
										<div className="col-sm-12">
											<ProfileBlock
												profile={true}
												patient={patient}
												hasButtons={false}
											/>
											<AncBlock patient={patient} enrollmentId={antenatal.id} />
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
		antenatal: state.sidepanel.item,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleSidepanel })(AntenatalProfile)
);
