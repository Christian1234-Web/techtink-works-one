import React from 'react';

import PrescriptionForm from '../Pharmacy/PrescriptionForm';

const PharmacyRequest = ({ module, itemId, patient }) => {
	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<PrescriptionForm patient={patient} module={module} itemId={itemId} />
			</div>
		</div>
	);
};

export default PharmacyRequest;
