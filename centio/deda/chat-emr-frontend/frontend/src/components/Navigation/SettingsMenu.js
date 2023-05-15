import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SettingsMenu = () => {
	const profile = useSelector(state => state.user.profile);

	return (
		<>
			<li className="sub-header">
				<span>CONFIGURATIONS</span>
			</li>
			<li>
				<Link
					to={
						profile.role.slug === 'lab-manager'
							? '/settings/lab-mgt'
							: '/settings'
					}
				>
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Settings</span>
				</Link>
			</li>
		</>
	);
};

export default SettingsMenu;
