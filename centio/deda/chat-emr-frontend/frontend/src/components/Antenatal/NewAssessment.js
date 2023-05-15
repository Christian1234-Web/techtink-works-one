import React, { Component } from 'react';
import kebabCase from 'lodash.kebabcase';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import EncounterMenu from '../Navigation/EncounterMenu';
import {
	assessmentMenu,
	CK_ASSESSMENT,
	defaultAssessment,
} from '../../services/constants';
import GeneralComments from './Assessment/GeneralComments';
import GeneralAssessment from './Assessment/GeneralAssessment';
import LabInvestigation from './Assessment/LabInvestigation';
import RadiologyRequest from './Assessment/RadiologyRequest';
import Prescription from './Assessment/Prescription';
import NextAppointment from './Assessment/NextAppointment';
import SSRStorage from '../../services/storage';
import { updateAssessmentData } from '../../actions/patient';
import TableLoading from '../TableLoading';

const storage = new SSRStorage();

const AssessmentTabs = ({
	index,
	previous,
	next,
	closeModal,
	appointment_id,
	patient,
	antenatal,
	refreshAssessments,
}) => {
	switch (index) {
		case 5:
			return (
				<NextAppointment
					appointment_id={appointment_id || ''}
					previous={previous}
					closeModal={closeModal}
					antenatal={antenatal}
					patient={patient}
					refresh={refreshAssessments}
				/>
			);
		case 4:
			return <Prescription next={next} previous={previous} patient={patient} />;
		case 3:
			return (
				<RadiologyRequest next={next} previous={previous} patient={patient} />
			);
		case 2:
			return (
				<LabInvestigation next={next} previous={previous} patient={patient} />
			);
		case 1:
			return (
				<GeneralAssessment next={next} previous={previous} patient={patient} />
			);
		case 0:
		default:
			return <GeneralComments next={next} patient={patient} />;
	}
};

class NewAssessment extends Component {
	state = {
		eIndex: 0,
		dropdown: false,
		loaded: false,
	};

	async componentDidMount() {
		const { patient } = this.props;
		const data = await storage.getItem(CK_ASSESSMENT);
		const assessment =
			data && data.patient_id === patient.id
				? data.assessment
				: defaultAssessment;
		this.props.updateAssessmentData(assessment, patient.id);
		setTimeout(() => {
			this.setState({ loaded: true });
			this.focusDiv();
		}, 200);
	}

	open = i => () => {
		this.setState({ eIndex: i });
	};

	next = () => {
		const { eIndex } = this.state;
		const i = eIndex + 1;
		if (i <= assessmentMenu.length - 1) {
			this.setState({ eIndex: i });
		}

		setTimeout(() => {
			this.focusDiv();
		}, 200);
	};

	previous = () => {
		const { eIndex } = this.state;
		const i = eIndex - 1;
		if (i >= 0) {
			this.setState({ eIndex: i });
		}

		setTimeout(() => {
			this.focusDiv();
		}, 200);
	};

	toggleDropdown = () => () => {
		this.setState((prevState, props) => ({
			dropdown: !prevState.dropdown,
		}));
	};

	focusDiv() {
		console.log('set focus');
		try {
			ReactDOM.findDOMNode(this.refs.theDiv).focus();
		} catch (e) {}
	}

	render() {
		const {
			closeModal,
			appointment_id,
			patient,
			antenatal,
			refreshAssessments,
		} = this.props;
		const { eIndex, loaded } = this.state;
		const current = assessmentMenu[eIndex];
		return (
			<div
				className="onboarding-modal modal fade animated show top-modal"
				role="dialog"
				style={{ display: 'block' }}
				tabIndex="1"
				ref="theDiv"
			>
				<div className="modal-dialog modal-lg modal-centered">
					<div className="modal-content">
						<button
							aria-label="Close"
							className="close override text-white"
							type="button"
							onClick={() => closeModal()}
						>
							<span className="os-icon os-icon-close"></span>
						</button>
						<div className="layout-w flex-column">
							<EncounterMenu
								encounters={assessmentMenu}
								active={kebabCase(current)}
								open={this.open}
							/>
							<div className="content-w">
								<div className="content-i">
									<div className="content-box encounter-box">
										{!loaded ? (
											<TableLoading />
										) : (
											<AssessmentTabs
												index={eIndex}
												next={this.next}
												previous={this.previous}
												patient={patient}
												appointment_id={appointment_id}
												antenatal={antenatal}
												closeModal={closeModal}
												refreshAssessments={refreshAssessments}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { updateAssessmentData })(NewAssessment);
