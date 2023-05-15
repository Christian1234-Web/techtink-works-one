import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const AntenatalPatients = lazy(() => import('./AntenatalPatients'));
const EnrollPatient = lazy(() => import('./EnrollmentForm'));

const Home = ({ match, location }) => {
	const [activePage, setActivePage] = useState('enrolled');

	const page = location.pathname.split('/').pop();

	useEffect(() => {
		if (page !== activePage) {
			setActivePage(page);
		}
	}, [activePage, page]);

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
											<Link
												className={`nav-link ${
													activePage === 'enrolled' ? 'active' : ''
												}`}
												to="/antenatal/enrolled"
											>
												Enrolled Patients
											</Link>
										</li>
										<li className="nav-item">
											<Link
												className={`nav-link ${
													activePage === 'closed' ? 'active' : ''
												}`}
												to="/antenatal/closed"
											>
												Closed
											</Link>
										</li>
										<li className="nav-item nav-actions d-sm-block">
											<Link
												to="/antenatal/enroll-patient"
												className={`btn btn-primary btn-sm  ${
													page === 'enroll-patient' ? 'btn-outline-primary' : ''
												}`}
											>
												<i className="os-icon os-icon-plus-circle" /> Enroll
												Patient
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<Suspense fallback={<Splash />}>
										<Switch>
											<Route
												path={`${match.url}/enrolled`}
												component={AntenatalPatients}
											/>
											<Route
												path={`${match.url}/closed`}
												component={AntenatalPatients}
											/>
											<Route
												exact
												path={`${match.url}/enroll-patient`}
												component={EnrollPatient}
											/>
											<Route component={NoMatch} />
										</Switch>
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
