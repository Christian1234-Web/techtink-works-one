import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Splash from '../../components/Splash';

const HmoCompany = lazy(() => import('./HmoCompany'));
const HmoScheme = lazy(() => import('./HmoScheme'));
const AllTransaction = lazy(() => import('./AllTransaction'));
const PendingTransactions = lazy(() => import('./PendingTransactions'));
const Claims = lazy(() => import('./Claims'));
const NoMatch = lazy(() => import('../NoMatch'));

const Home = ({ match }) => {
	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={match.url} component={HmoCompany} />
									<Route path={`${match.url}/schemes`} component={HmoScheme} />
									<Route
										path={`${match.url}/transactions/pending`}
										component={PendingTransactions}
									/>
									<Route
										path={`${match.url}/transactions/all`}
										component={AllTransaction}
									/>
									<Route path={`${match.url}/claims`} component={Claims} />
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

export default withRouter(Home);
