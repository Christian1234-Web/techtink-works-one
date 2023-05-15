import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const checkHash = (hash, path) => hash.find(h => h === path);

const LabourProfileMenu = ({ location }) => {
	const hash = location.hash.split('#');

	return (
		<div className="top-bar color-scheme-light">
			<ul>
				<li className={checkHash(hash, 'notes') ? 'active' : ''}>
					<Link to={`${location.pathname}#notes`} className="pointer">
						Notes
					</Link>
				</li>
				<li className={checkHash(hash, 'measurements') ? 'active' : ''}>
					<Link to={`${location.pathname}#measurements`} className="pointer">
						Measurements
					</Link>
				</li>
				<li className={checkHash(hash, 'lab') ? 'active' : ''}>
					<Link to={`${location.pathname}#lab`} className="pointer">
						Lab
					</Link>
				</li>
				<li className={checkHash(hash, 'partograph') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#partograph#Blood Pressure`}
						className="pointer"
					>
						Partograph
					</Link>
				</li>
				<li className={checkHash(hash, 'risk-assessments') ? 'active' : ''}>
					<Link
						to={`${location.pathname}#risk-assessments`}
						className="pointer"
					>
						Risk Assessments
					</Link>
				</li>
				<li className={checkHash(hash, 'delivery') ? 'active' : ''}>
					<Link to={`${location.pathname}#delivery`} className="pointer">
						Delivery
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default withRouter(LabourProfileMenu);
