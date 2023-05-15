/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useState } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const RadiologyQueue = lazy(() => import('./RadiologyQueue'));
const RadiologyRequest = lazy(() =>
	import('../../components/Patient/RadiologyRequest')
);
const AllRequest = lazy(() => import('./AllRequest'));

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	let pageTitle = 'Radiology Queue';
	let isRadiologyRequest = false;
	if (page === 'all-request') {
		pageTitle = 'Radiology Requests';
	} else if (page === 'new-request' || page === 'opd') {
		pageTitle = 'New Radiology Request';
		isRadiologyRequest = true;
	}

	const [isInPatient, setInPatient] = useState(true);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<Link
									to={`${match.path}`}
									className={`mx-2 btn btn-primary btn-sm  ${
										page === 'radiology' ? 'btn-outline-primary' : ''
									}`}
								>
									Radiology Queue
								</Link>
								<Link
									to={`${match.path}/all-request`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'all-request' ? 'btn-outline-primary' : ''
									}`}
								>
									Radiology Requests
								</Link>
								<Link
									to={`${match.path}/new-request`}
									className={`mr-2 btn btn-primary btn-sm  ${
										page === 'new-request' || page === 'opd'
											? 'btn-outline-primary'
											: ''
									}`}
								>
									New Radiology Request
								</Link>
							</div>
							{!isRadiologyRequest ? (
								<h6 className="element-header">{pageTitle}</h6>
							) : (
								<div className="os-tabs-controls os-tabs-complex">
									<ul className="nav nav-tabs upper">
										<li className="nav-item">
											<Link
												onClick={() => setInPatient(true)}
												className={`nav-link ${isInPatient ? 'active' : ''}`}
												to="/radiology/new-request"
											>
												Patient
											</Link>
										</li>
										<li className="nav-item">
											<Link
												onClick={() => setInPatient(false)}
												aria-expanded="false"
												className={`nav-link ${!isInPatient ? 'active' : ''}`}
												to="/radiology/new-request/opd"
											>
												OPD
											</Link>
										</li>
									</ul>
								</div>
							)}
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route
										exact
										path={`${match.url}`}
										component={RadiologyQueue}
									/>
									<Route
										exact
										path={`${match.url}/new-request`}
										component={RadiologyRequest}
									/>
									<Route
										exact
										path={`${match.url}/new-request/opd`}
										component={RadiologyRequest}
									/>
									<Route
										exact
										path={`${match.url}/all-request`}
										component={AllRequest}
									/>
									<Route component={NoMatch} />
								</Switch>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
