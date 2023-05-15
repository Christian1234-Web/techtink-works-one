import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';

const FrontDesk = lazy(() => import('./FrontDesk'));
const Doctor = lazy(() => import('./Doctor'));
const Pharmacy = lazy(() => import('./Pharmacy'));
const Nursing = lazy(() => import('./Nursing'));
const Lab = lazy(() => import('./Lab'));
const PayPoint = lazy(() => import('./PayPoint'));
const Store = lazy(() => import('./Store'));
const Cafeteria = lazy(() => import('./Cafeteria'));
const Payable = lazy(() => import('./Payable'));
const Others = lazy(() => import('./Others'));

const Home = ({ match }) => {
	return (
		<Suspense fallback={<Splash />}>
			<Switch>
				<Route path={`${match.url}/frontdesk`} component={FrontDesk} />
				<Route path={`${match.url}/doctor`} component={Doctor} />
				<Route path={`${match.url}/pharmacy`} component={Pharmacy} />
				<Route path={`${match.url}/nursing`} component={Nursing} />
				<Route path={`${match.url}/lab`} component={Lab} />
				<Route path={`${match.url}/paypoint`} component={PayPoint} />
				<Route path={`${match.url}/store`} component={Store} />
				<Route path={`${match.url}/cafeteria`} component={Cafeteria} />
				<Route path={`${match.url}/payable`} component={Payable} />
				<Route path={`${match.url}/others`} component={Others} />
				<Route component={NoMatch} />
			</Switch>
		</Suspense>
	);
};

export default Home;
