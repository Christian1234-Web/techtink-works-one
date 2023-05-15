import React, { useEffect, useState } from 'react';
import UsersAttendance from './UsersAttendance';

const Attendance = () => {
	const [activePage, setActivePage] = useState('');

	useEffect(() => {
		if (!activePage) {
			setActivePage('Users');
		}
	}, [activePage]);

	return (
		<div className="element-wrapper">
			<div className="os-tabs-w mx-1">
				<div className="os-tabs-controls os-tabs-complex">
					<ul className="nav nav-tabs upper">
						{/* */}
						<li className="nav-item">
							<span
								className={`nav-link ${activePage === 'Users' ? 'active' : ''}`}
								onClick={() => {
									setActivePage('Users');
								}}
							>
								Staff Users
							</span>
						</li>
					</ul>
				</div>
			</div>
			{activePage === 'Users' && <UsersAttendance />}
		</div>
	);
};

export default Attendance;
