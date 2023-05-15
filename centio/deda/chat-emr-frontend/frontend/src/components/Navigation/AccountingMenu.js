import React from 'react';
import { Link } from 'react-router-dom';
const AccountingMenu = () => {
	return (
		<>
			<li>
				<Link to="/accounting/staffs">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Staff List</span>
				</Link>
			</li>
			<li>
				<Link to="/accounting/payroll">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Payroll</span>
				</Link>
			</li>
			<li>
				<Link to="/accounting/transactions">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Transactions</span>
				</Link>
			</li>
		</>
	);
};

export default AccountingMenu;
