import React, { useState, useEffect } from 'react';
import AttendanceLists from './AttendanceLists';

const Others = () => {
	const [activePage, setActivePage] = useState('');

	useEffect(() => {
		if (!activePage) {
			setActivePage('Attendance');
		}
	}, [activePage]);

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						<li className="nav-item">
							<span
								className={`nav-link ${
									activePage === 'Attendance' ? 'active' : ''
								}`}
								onClick={() => {
									setActivePage('Attendance');
								}}
							>
								Attendance List
							</span>
						</li>
						{/* <li className="nav-item">
							<span
								className={`nav-link ${activePage === 'Users' ? 'active' : ''}`}
								onClick={() => {
									setActivePage('Users');
								}}>
								Staff Users
							</span>
						</li> */}
					</ul>
				</div>
			</div>
			{activePage === 'Attendance' && <AttendanceLists />}
		</div>
	);
};

export default Others;
