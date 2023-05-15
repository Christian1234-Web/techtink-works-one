import React from 'react';

import List from '../../components/Vendor/List';

const Vendors = () => {
	return (
		<div className="element-wrapper">
			<h6 className="element-header">Vendors</h6>
			<div className="row">
				<div className="col-sm-12">
					<List />
				</div>
			</div>
		</div>
	);
};

export default Vendors;
