import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Payroll from './Payroll';
import StaffList from '../HR/StaffList';
import NoMatch from '../NoMatch';
import Transactions from './Transactions';

const Home = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/payroll`} component={Payroll} />
			<Route path={`${match.url}/staffs`} component={StaffList} />
			<Route path={`${match.url}/transactions`} component={Transactions} />
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Home;
