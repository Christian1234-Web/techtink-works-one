/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useEffect } from 'react';

import RoleBlock from '../../components/RoleBlock';
import Permission from '../../components/Permission';
import { request } from '../../services/utilities';
import { notifyError } from '../../services/notify';

const Roles = () => {
	const [tab, setTab] = useState('roles');
	const [loaded, setLoaded] = useState(false);
	const [permissions, setPermissions] = useState([]);

	const fetchPermissions = useCallback(async () => {
		try {
			const rs = await request('settings/permissions', 'GET', true);
			setPermissions(rs);
			setLoaded(true);
		} catch (error) {
			setLoaded(true);
			notifyError(error.message || 'could not fetch permissions');
		}
	}, []);

	useEffect(() => {
		if (!loaded) {
			fetchPermissions();
		}
	}, [fetchPermissions, loaded]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="os-tabs-w mx-1">
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<a
												className={
													tab === 'roles' ? 'nav-link active' : 'nav-link'
												}
												onClick={() => setTab('roles')}
											>
												ROLES
											</a>
										</li>
										<li className="nav-item">
											<a
												className={
													tab === 'permissions' ? 'nav-link active' : 'nav-link'
												}
												onClick={() => setTab('permissions')}
											>
												PERMISSIONS
											</a>
										</li>
									</ul>
								</div>
							</div>
							{tab === 'roles' && <RoleBlock permissions={permissions} />}
							{tab === 'permissions' && (
								<Permission
									setPermissions={items => setPermissions(items)}
									loaded={loaded}
									permissions={permissions}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Roles;
