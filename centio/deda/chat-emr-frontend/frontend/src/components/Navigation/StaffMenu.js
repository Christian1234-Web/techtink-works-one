import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const StaffMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'profile') ? 'active' : ''}>
					<Link to={`${location.pathname}#profile`} className="pointer">
						Profile
					</Link>
				</li>
				<li className={checkHash(hash, 'payroll') ? 'active' : ''}>
					<Link to={`${location.pathname}#payroll`} className="pointer">
						Payroll
					</Link>
				</li>
				<li className={checkHash(hash, 'transactions') ? 'active' : ''}>
					<Link to={`${location.pathname}#transactions`} className="pointer">
						Transactions
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(StaffMenu);
