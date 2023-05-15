import React from 'react';

import ClinicalLabMenu from './ClinicalLabMenu';
import PayPointMenu from './PayPointMenu';
import PharmacyMenu from './PharmacyMenu';
import RadiologyMenu from './RadiologyMenu';
import NurseMenu from './NurseMenu';
import HMOMenu from './HMOMenu';
import FrontDeskMenu from './FrontDeskMenu';
import ProcedureMenu from './ProcedureMenu';
import RecordsMenu from './RecordsMenu';
import ReportMenu from './ReportMenu';
import MyAccount from './MyAccount';

const RecordsMainMenu = () => {
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
				<span>HMO MGT</span>
			</li>
			<HMOMenu />
			<li className="sub-header">
				<span>RECORDS</span>
			</li>
			<RecordsMenu />
			<li className="sub-header">
				<span>REPORTS</span>
			</li>
			<ReportMenu />
			<MyAccount />
		</>
	);
};

export default RecordsMainMenu;
