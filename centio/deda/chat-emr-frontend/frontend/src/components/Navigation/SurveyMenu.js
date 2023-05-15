import React from 'react';
import { Link } from 'react-router-dom';

const SurveyMenu = () => {
	return (
		<>
			<li>
				<Link to="/survey">
					<div className="icon-w">
						<div className="os-icon os-icon-newspaper" />
					</div>
					<span>Survey</span>
				</Link>
			</li>
		</>
	);
};

export default SurveyMenu;
