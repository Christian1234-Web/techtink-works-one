import React from 'react';
import { Link } from 'react-router-dom';

const TherapyMenu = () => {
	return (
		<>
			<li>
				<Link to="/therapy">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Therapy</span>
				</Link>
			</li>
		</>
	);
};

export default TherapyMenu;
