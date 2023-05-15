import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	hasViewCafeteriaInventoryPermission,
	hasViewCafeteriaRequisitionsPermission,
	hasViewCafeteriaVendorsPermission,
	hasViewOrdersPermission,
	hasViewShowcasePermission,
	hasViewTakeOrderPermission,
	hasViewTransactionsPermission,
} from '../../permission-utils/cafeteria';

const CafeteriaMenu = () => {
	const user = useSelector(state => state.user.profile);

	return (
		<>
			{(hasViewOrdersPermission(user.permissions) ||
				hasViewShowcasePermission(user.permissions) ||
				hasViewTakeOrderPermission(user.permissions) ||
				hasViewTransactionsPermission(user.permissions)) && (
				<li>
					<Link
						to={
							hasViewTakeOrderPermission(user.permissions)
								? '/cafeteria'
								: '/cafeteria/orders'
						}
					>
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>Dashboard</span>
					</Link>
				</li>
			)}
			{hasViewCafeteriaInventoryPermission(user.permissions) && (
				<li>
					<Link to="/cafeteria/inventory">
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>Inventory</span>
					</Link>
				</li>
			)}
			{hasViewCafeteriaVendorsPermission(user.permissions) && (
				<li>
					<Link to="/cafeteria/vendors">
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>Vendors</span>
					</Link>
				</li>
			)}
			{hasViewCafeteriaRequisitionsPermission(user.permissions) && (
				<li>
					<Link to="/cafeteria/requisitions">
						<div className="icon-w">
							<div className="os-icon os-icon-layers" />
						</div>
						<span>Requisitions</span>
					</Link>
				</li>
			)}
		</>
	);
};

export default CafeteriaMenu;
