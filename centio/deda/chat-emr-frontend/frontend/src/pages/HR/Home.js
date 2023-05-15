import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StaffList from './StaffList';
import LeaveMgt from './LeaveMgt';
import Roster from './Roster';
import Appraisal from './Appraisal';
import Attendance from './Attendance';
import NoMatch from '../NoMatch';

const Home = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/staffs`} component={StaffList} />
			<Route path={`${match.url}/leave-mgt`} component={LeaveMgt} />
			<Route path={`${match.url}/duty-roster`} component={Roster} />
			<Route path={`${match.url}/attendance`} component={Attendance} />
			<Route path={`${match.url}/appraisal`}>
				<Appraisal />
			</Route>
			<Route path={`${match.url}/appraisal/:id/view`}>
				<Appraisal />
			</Route>
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Home;
