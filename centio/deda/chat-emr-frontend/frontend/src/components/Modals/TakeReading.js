import React, { lazy, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { patientAPI } from '../../services/constants';
import { request } from '../../services/utilities';
import { loadVitals } from '../../actions/patient';

const BMI = lazy(() => import('../Vitals/BMI'));
const BloodPressure = lazy(() => import('../Vitals/BloodPressure'));
const Dilation = lazy(() => import('../Vitals/Dilation'));
const FetalHeartRate = lazy(() => import('../Vitals/FetalHeartRate'));
const FundusHeight = lazy(() => import('../Vitals/FundusHeight'));
const BSA = lazy(() => import('../Vitals/BSA'));
const Glucose = lazy(() => import('../Vitals/Glucose'));
const HeadCircumference = lazy(() => import('../Vitals/HeadCircumference'));
const Height = lazy(() => import('../Vitals/Height'));
const LengthOfArm = lazy(() => import('../Vitals/LengthOfArm'));
const MidArmCircumference = lazy(() => import('../Vitals/MidArmCircumference'));
const MUAC = lazy(() => import('../Vitals/MUAC'));
const PainScale = lazy(() => import('../Vitals/PainScale'));
const PCV = lazy(() => import('../Vitals/PCV'));
const Protein = lazy(() => import('../Vitals/Protein'));
const Pulse = lazy(() => import('../Vitals/Pulse'));
const Respiration = lazy(() => import('../Vitals/Respiration'));
const SPO = lazy(() => import('../Vitals/SPO'));
const SurfaceArea = lazy(() => import('../Vitals/SurfaceArea'));
const Temperature = lazy(() => import('../Vitals/Temperature'));
const Urine = lazy(() => import('../Vitals/Urine'));
const Weight = lazy(() => import('../Vitals/Weight'));

const Page = ({ type, task, patient }) => {
	switch (type) {
		case 'Urine':
			return <Urine task={task} patient={patient} />;
		case 'Weight':
			return <Weight task={task} patient={patient} />;
		case 'Temperature':
			return <Temperature task={task} patient={patient} />;
		case 'Surface Area':
			return <SurfaceArea task={task} patient={patient} />;
		case 'SpO2':
			return <SPO task={task} patient={patient} />;
		case 'Respiration':
			return <Respiration task={task} patient={patient} />;
		case 'Pulse':
			return <Pulse task={task} patient={patient} />;
		case 'Protein':
			return <Protein task={task} patient={patient} />;
		case 'PCV':
			return <PCV task={task} patient={patient} />;
		case 'Pain Scale':
			return <PainScale task={task} patient={patient} />;
		case 'MUAC':
			return <MUAC task={task} patient={patient} />;
		case 'Mid-Arm Circumference':
			return <MidArmCircumference task={task} patient={patient} />;
		case 'Length of Arm':
			return <LengthOfArm task={task} patient={patient} />;
		case 'Height':
			return <Height task={task} patient={patient} />;
		case 'Head Circumference':
			return <HeadCircumference task={task} patient={patient} />;
		case 'Glucose':
			return <Glucose task={task} patient={patient} />;
		case 'Dilation':
			return <Dilation task={task} patient={patient} />;
		case 'Fetal Heart Rate':
			return <FetalHeartRate task={task} patient={patient} />;
		case 'Fundus Height':
			return <FundusHeight task={task} patient={patient} />;
		case 'Blood Pressure':
			return <BloodPressure task={task} patient={patient} />;
		case 'BSA':
			return <BSA task={task} patient={patient} />;
		case 'BMI':
		default:
			return <BMI task={task} patient={patient} />;
	}
};

const TakeReading = ({ closeModal, taskItem, patient }) => {
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const getData = useCallback(async () => {
		const url = `${patientAPI}/${taskItem.patient_id}/vitals`;
		const res = await request(url, 'GET', true);
		return res;
	}, [taskItem]);

	useEffect(() => {
		async function doLoadVitals() {
			const rs = await getData();
			dispatch(
				loadVitals(rs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
			);
			setLoaded(true);
		}

		if (!loaded) {
			doLoadVitals();
		}
	}, [dispatch, getData, loaded]);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={() => closeModal()}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Take Reading</h4>
						<div className="element-box p-2">
							<div className="row">
								<div className="col-sm-12">
									<div className="element-box mb-3">
										<Page
											type={taskItem.task}
											task={taskItem}
											patient={patient}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TakeReading;
