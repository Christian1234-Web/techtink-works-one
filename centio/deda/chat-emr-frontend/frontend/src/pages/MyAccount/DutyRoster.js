/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import { notifyError } from '../../services/notify';
import { rosterAPI } from '../../services/constants';
import { request, parseRoster } from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';

const DutyRoster = () => {
	const [loaded, setLoaded] = useState(false);
	const [rosters, setRosters] = useState([]);

	const dispatch = useDispatch();

	const profile = useSelector(state => state.user.profile);

	const fetchRoster = useCallback(
		async period => {
			try {
				dispatch(startBlock());
				const staff_id = profile.details.id;
				const department_id = profile.details.department.id;
				const uri = `${rosterAPI}/rosters?period=${period}&department_id=${department_id}&staff_id=${staff_id}`;
				const rs = await request(uri, 'GET', true);
				const rosters = parseRoster(rs);
				setRosters(rosters);
				dispatch(stopBlock());
				setLoaded(true);
			} catch (error) {
				console.log(error);
				dispatch(stopBlock());
				setLoaded(true);
				notifyError('could not fetch roster');
			}
		},
		[dispatch, profile]
	);

	useEffect(() => {
		if (!loaded) {
			const period = moment().format('YYYY-MM');
			fetchRoster(period);
		}
	}, [fetchRoster, loaded]);

	const handleDateClick = arg => {
		console.log(arg);
	};

	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Duty Rooster</h6>
					<div className="element-box m-0 p-3">
						<FullCalendar
							plugins={[dayGridPlugin, interactionPlugin]}
							events={rosters}
							dateClick={handleDateClick}
							eventClick={info => console.log(info)}
							showNonCurrentDates={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DutyRoster;
