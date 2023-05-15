import React, { lazy, useCallback, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { patientAPI, allVitalItems } from '../../services/constants';
import { request } from '../../services/utilities';
import { loadVitals } from '../../actions/patient';

const BMI = lazy(() => import('../Vitals/BMI'));
const BloodPressure = lazy(() => import('../Vitals/BloodPressure'));
const Contractions = lazy(() => import('../Vitals/Contractions'));
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
const ServicoGraph = lazy(() => import('../Vitals/ServicoGraph'));
const SPO = lazy(() => import('../Vitals/SPO'));
const SurfaceArea = lazy(() => import('../Vitals/SurfaceArea'));
const Temperature = lazy(() => import('../Vitals/Temperature'));
const Urine = lazy(() => import('../Vitals/Urine'));
const Weight = lazy(() => import('../Vitals/Weight'));

const Page = ({ patient, type }) => {
	switch (type) {
		case 'Urine':
			return <Urine patient={patient} />;
		case 'Contractions':
			return <Contractions patient={patient} />;
		case 'Weight':
			return <Weight patient={patient} />;
		case 'Temperature':
			return <Temperature patient={patient} />;
		case 'Surface Area':
			return <SurfaceArea patient={patient} />;
		case 'SpO2':
			return <SPO patient={patient} />;
		case 'Respiration Rate':
			return <Respiration patient={patient} />;
		case 'Pulse':
			return <Pulse patient={patient} />;
		case 'Protein':
			return <Protein patient={patient} />;
		case 'PCV':
			return <PCV patient={patient} />;
		case 'Pain Scale':
			return <PainScale patient={patient} />;
		case 'MUAC':
			return <MUAC patient={patient} />;
		case 'Mid-Arm Circumference':
			return <MidArmCircumference patient={patient} />;
		case 'Length of Arm':
			return <LengthOfArm patient={patient} />;
		case 'Height':
			return <Height patient={patient} />;
		case 'Head Circumference':
			return <HeadCircumference patient={patient} />;
		case 'Glucose':
			return <Glucose patient={patient} />;
		case 'Dilation':
			return <Dilation patient={patient} />;
		case 'Fetal Heart Rate':
			return <FetalHeartRate patient={patient} />;
		case 'Fundus Height':
			return <FundusHeight patient={patient} />;
		case 'Blood Pressure':
			return <BloodPressure patient={patient} />;
		case 'BSA':
			return <BSA patient={patient} />;
		case 'Servico Graph':
			return <ServicoGraph patient={patient} />;
		case 'BMI':
		default:
			return <BMI patient={patient} />;
	}
};

const Vitals = ({ type, location, patient, category }) => {
	const _category = category === 'general' ? 'vitals' : 'partograph';

	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	const labour = useSelector(state => state.sidepanel.item);

	const fetchVitals = useCallback(async () => {
		const labour_id = labour?.id || '';
		const url = `${patientAPI}/${patient.id}/vitals?labour_id=${labour_id}`;
		const rs = await request(url, 'GET', true);
		dispatch(
			loadVitals(rs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
		);
		setLoaded(true);
	}, [dispatch, labour?.id, patient.id]);

	useEffect(() => {
		if (!loaded) {
			fetchVitals();
		}
	}, [fetchVitals, loaded]);

	return (
		<div className="col-md-12">
			<div className="element-wrapper">
				<div className="element-box-tp mb-3">
					<div className="el-buttons-list">
						{allVitalItems
							.filter(v => {
								const item = v.category.find(c => c === category);
								return item && item === category;
							})
							.map((vital, i) => (
								<Link
									className="btn btn-white btn-sm mr-2"
									to={`${location.pathname}#${_category}#${vital.name}`}
									key={i}
								>
									<i className="os-icon os-icon-delivery-box-2" />
									<span>{vital.name}</span>
								</Link>
							))}
					</div>
				</div>
				<h6 className="element-header text-center">{type}</h6>
				<div className="element-box p-3 m-0">
					<Page patient={patient} type={type} />
				</div>
			</div>
		</div>
	);
};

export default withRouter(Vitals);
