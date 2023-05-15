/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../NoMatch';
import Splash from '../../components/Splash';
import { useState } from 'react';

import CreateTherapyNotes from './CreateTherapyNotes';

const TherapyNotes = lazy(() => import('./TherapyNotes'));

const Home = ({ match, location }) => {
	const page = location.pathname.split('/').pop();

	const [openCreateNote, setOpenCreate] = useState(false);

	let pageTitle = 'Therapy Notes';

	const closeModal = () => {
		setOpenCreate(false);
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="row">
					<div className="col-sm-12">
						<div className="element-wrapper">
							<div className="element-actions">
								<button
									onClick={() => {
										setOpenCreate(true);
									}}
									className={`mx-2 btn btn-primary btn-sm  ${
										page === 'therapy' ? 'btn-outline-primary' : ''
									}`}
								>
									Create Notes
								</button>
							</div>
							<h6 className="element-header">{pageTitle}</h6>
							<Suspense fallback={<Splash />}>
								<Switch>
									<Route exact path={`${match.url}`} component={TherapyNotes} />
									<Route component={NoMatch} />
								</Switch>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
			{openCreateNote && <CreateTherapyNotes closeModal={closeModal} />}
		</div>
	);
};

export default Home;
