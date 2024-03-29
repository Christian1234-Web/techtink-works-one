import React from 'react';

import ClinicalLabMenu from './ClinicalLabMenu';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import NurseMenu from './NurseMenu';
import DoctorMenu from './DoctorMenu';
import HrMenu from './HrMenu';
import StoreMenu from './StoreMenu';
import CafeteriaMenu from './CafeteriaMenu';
import HMOMenu from './HMOMenu';
import SettingsMenu from './SettingsMenu';
import FrontDeskMenu from './FrontDeskMenu';
import ProcedureMenu from './ProcedureMenu';
import RecordsMenu from './RecordsMenu';
import AccountingMenu from './AccountingMenu';
import ReportMenu from './ReportMenu';
import MyAccount from './MyAccount';
import TherapyMenu from './TherapyMenu';
import SurveyMenu from './SurveyMenu';

const AdminMenu = () => {
	return (
		<>
			<li className="sub-header">
				<span>FRONTDESK</span>
			</li>
			<FrontDeskMenu />
			<li className="sub-header">
				<span>MEDICAL LAB</span>
			</li>
			<ClinicalLabMenu />
			<li className="sub-header">
				<span>PAYPOINT</span>
			</li>
			<PayPointMenu />
			<li className="sub-header">
				<span>PHARMACY</span>
			</li>
			<PharmacyMenu />
			<li className="sub-header">
				<span>RADIOLOGY</span>
			</li>
			<RadiologyMenu />
			<li className="sub-header">
				<span>PROCEDURE</span>
			</li>
			<ProcedureMenu />
			<li className="sub-header">
				<span>NURSE</span>
			</li>
			<NurseMenu />
			<li className="sub-header">
				<span>DOCTOR</span>
			</li>
			<DoctorMenu />
			<li className="sub-header">
				<span>HUMAN RESOURCES</span>
			</li>
			<HrMenu />
			<li className="sub-header">
				<span>THERAPY</span>
			</li>
			<TherapyMenu />
			<li className="sub-header">
				<span>STORE</span>
			</li>
			<StoreMenu />
			<li className="sub-header">
				<span>CAFETERIA</span>
			</li>
			<CafeteriaMenu />
			<li className="sub-header">
				<span>HMO MGT</span>
			</li>
			<HMOMenu />
			<li className="sub-header">
				<span>RECORDS</span>
			</li>
			<RecordsMenu />
			<li className="sub-header">
				<span>SURVEYS</span>
			</li>
			<SurveyMenu />
			<li className="sub-header">
				<span>ACCOUNTING</span>
			</li>
			<AccountingMenu />
			<li className="sub-header">
				<span>REPORTS</span>
			</li>
			<ReportMenu />
			<SettingsMenu />
			<MyAccount />
		</>
	);
};

export default AdminMenu;
