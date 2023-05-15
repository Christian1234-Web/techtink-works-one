import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import Survey from './Survey';

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	let pageTitle = 'Surveys';

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions"></div>
							<h6 className="element-header">{pageTitle}</h6>
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={`${match.url}`} component={Survey} />
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
