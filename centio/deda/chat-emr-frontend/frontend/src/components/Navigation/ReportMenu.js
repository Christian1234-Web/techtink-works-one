import React from 'react';
import { Link } from 'react-router-dom';

const ReportMenu = () => {
	return (
		<>
			<li>
				<Link to="/report/frontdesk">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Front Desk</span>
				</Link>
			</li>
			<li>
				<Link to="/report/doctor">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Doctor</span>
				</Link>
			</li>
			<li>
				<Link to="/report/pharmacy">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Pharmacy</span>
				</Link>
			</li>
			<li>
				<Link to="/report/nursing">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Nursing</span>
				</Link>
			</li>
			<li>
				<Link to="/report/lab">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Lab</span>
				</Link>
			</li>
			<li>
				<Link to="/report/paypoint">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Pay Point</span>
				</Link>
			</li>
			<li>
				<Link to="/report/cafeteria">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Cafeteria</span>
				</Link>
			</li>
			<li>
				<Link to="/report/payable">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Payable</span>
				</Link>
			</li>
			<li>
				<Link to="/report/others">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Others</span>
				</Link>
			</li>
		</>
	);
};

export default ReportMenu;
