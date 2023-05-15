import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TakeOrder from './TakeOrder';
import Transactions from './Transactions';
import Showcase from './Showcase';
import Orders from './Orders';
import {
	hasViewOrdersPermission,
	hasViewShowcasePermission,
	hasViewTakeOrderPermission,
	hasViewTransactionsPermission,
} from '../../permission-utils/cafeteria';

const Cafeteria = ({ location }) => {
	const [activePage, setActivePage] = useState('');

	const page = location.pathname.split('/').pop();

	const user = useSelector(state => state.user.profile);

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}
	}, [activePage, page]);

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						{hasViewTakeOrderPermission(user.permissions) && (
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'cafeteria' ? 'active' : ''
									}`}
									to="/cafeteria"
								>
									Take Order
								</Link>
							</li>
						)}
						{hasViewOrdersPermission(user.permissions) && (
							<li className="nav-item">
								<Link
									className={`nav-link ${
										activePage === 'orders' ? 'active' : ''
									}`}
									to="/cafeteria/orders"
								>
									Orders
								</Link>
							</li>
						)}
						{hasViewShowcasePermission(user.permissions) && (
							<li className="nav-item">
								<Link
									aria-expanded="false"
									className={`nav-link ${
										activePage === 'showcase' ? 'active' : ''
									}`}
									to="/cafeteria/showcase"
								>
									Showcase Items
								</Link>
							</li>
						)}
						{hasViewTransactionsPermission(user.permissions) && (
							<li className="nav-item">
								<Link
									aria-expanded="false"
									className={`nav-link ${
										activePage === 'transactions' ? 'active' : ''
									}`}
									to="/cafeteria/transactions"
								>
									Transactions
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
			{activePage === 'cafeteria' && <TakeOrder />}
			{activePage === 'orders' && <Orders />}
			{activePage === 'transactions' && <Transactions />}
			{activePage === 'showcase' && <Showcase />}
		</div>
	);
};

export default Cafeteria;
