/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const Payslips = lazy(() => import('./Payslips'));
const DutyRoster = lazy(() => import('./DutyRoster'));
const Appraisals = lazy(() => import('./Appraisals'));
const LeaveRequests = lazy(() => import('./LeaveRequests'));
const Requisitions = lazy(() => import('./Requisitions'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<Suspense fallback={<Splash />}>
					<Switch>
						<Route path={`${match.url}/payslips`} component={Payslips} />
						<Route path={`${match.url}/duty-roster`} component={DutyRoster} />
						<Route path={`${match.url}/appraisals`} component={Appraisals} />
						<Route
							path={`${match.url}/leave-requests`}
							component={LeaveRequests}
						/>
						<Route
							path={`${match.url}/requisitions`}
							component={Requisitions}
						/>
						<Route component={NoMatch} />
					</Switch>
				</Suspense>
			</div>
		</div>
	);
};

export default withRouter(Home);
