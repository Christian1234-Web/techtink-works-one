import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	hasViewHmoCompanyPermission,
	hasViewHmoSchemesPermission,
	hasViewHmoTransactionsPermission,
} from '../../permission-utils/hmo';

const HMOMenu = () => {
	const profile = useSelector(state => state.user.profile);

	return (
		<>
			{hasViewHmoCompanyPermission(profile.permissions) && (
				<li>
					<Link to="/hmo">
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>HMO Companies</span>
					</Link>
				</li>
			)}
			{hasViewHmoSchemesPermission(profile.permissions) && (
				<li>
					<Link to="/hmo/schemes">
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>HMO Schemes</span>
					</Link>
				</li>
			)}
			{hasViewHmoTransactionsPermission(profile.permissions) && (
				<li>
					<Link to="/hmo/transactions/all">
						<div className="icon-w">
							<div className="os-icon os-icon-agenda-1" />
						</div>
						<span>Transactions</span>
					</Link>
				</li>
			)}
			{hasViewHmoTransactionsPermission(profile.permissions) && (
				<li>
					<Link to="/hmo/claims">
						<div className="icon-w">
							<div className="os-icon os-icon-agenda-1" />
						</div>
						<span>Claims</span>
					</Link>
				</li>
			)}
		</>
	);
};

export default HMOMenu;
