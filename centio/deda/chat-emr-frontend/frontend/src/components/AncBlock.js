import React, { useState, forwardRef, useCallback, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import {
	formatDate,
	getGestationAge,
	parseFather,
	request,
} from '../services/utilities';
import { messageService } from '../services/message';
import { notifySuccess, notifyError } from '../services/notify';
import { antenatalAPI } from '../services/constants';
import { useDispatch } from 'react-redux';
import { startBlock, stopBlock } from '../actions/redux-block';
import { toggleSidepanel } from '../actions/sidepanel';

const AncBlock = ({ patient, enrollmentId }) => {
	const [loaded, isLoaded] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [item, setItem] = useState(null);

	const dispatch = useDispatch();

	const getEnrollment = useCallback(async () => {
		try {
			const url = `${antenatalAPI}/${enrollmentId}`;
			const rs = await request(url, 'GET', true);
			setItem(rs);

			const lmp = rs.lmp ? new Date(moment(rs.lmp)) : new Date();
			setStartDate(lmp);
			isLoaded(true);
		} catch (error) {
			isLoaded(true);
			notifyError('could not get enrollment');
		}
	}, [enrollmentId]);

	useEffect(() => {
		if (!loaded && enrollmentId) {
			getEnrollment();
		}
	}, [enrollmentId, getEnrollment, loaded]);

	let pregnancy_history = null;
	if (item) {
		try {
			pregnancy_history = JSON.parse(item.pregnancy_history);
		} catch (e) {
			pregnancy_history = item.pregnancy_history;
		}
	}

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<a className="text-bold ml-3" onClick={onClick} ref={ref}>
			<i className="os-icon os-icon-edit-32" />
		</a>
	));

	const onSelectLmpDate = async date => {
		try {
			dispatch(startBlock());
			const url = `patient/antenatal/${enrollmentId}/lmp`;

			const lmp = moment(date).format('YYYY-MM-DD');
			const edd = moment(date).add(40, 'w').format('YYYY-MM-DD');

			const rs = await request(url, 'POST', true, { lmp, edd });
			dispatch(stopBlock());
			if (rs.success) {
				const data = rs.data;
				const enrollment = { ...item, lmp: data.lmp, edd: data.edd };
				const info = { patient, type: 'antenatal', item: enrollment };
				messageService.sendMessage({ type: 'anc', data: enrollment });
				dispatch(toggleSidepanel(true, info));
				setItem(enrollment);
				notifySuccess('LMP saved!');
			} else {
				notifyError('Error saving LMP');
			}
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('Error saving LMP');
		}
	};

	return (
		item && (
			<div className="element-box m-0 p-0 mb-4">
				<ul className="breadcrumb px-3">
					<>
						<li className="breadcrumb-item">
							<a className="no-pointer text-bold">{`ANC #: ${item.serial_code}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Father - ${parseFather(
								item.father
							)}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Enrolled: ${formatDate(
								item.createdAt,
								'DD MMM, YYYY'
							)}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Package: ${
								item.ancpackage?.name || 'Nil'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Reason: ${item.booking_period}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">
								LMP:{' '}
								<span className="text-dotted-underline text-primary">{`${formatDate(
									item.lmp,
									'MMM Do, YYYY'
								)}`}</span>
							</a>
							{item.status === 0 && (
								<DatePicker
									selected={startDate}
									onChange={date => {
										setStartDate(date);
										onSelectLmpDate(date);
									}}
									customInput={<CustomInput />}
									dateFormat="dd-MMM-yyyy"
									maxDate={new Date()}
								/>
							)}
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`EDD: ${formatDate(
								item.edd,
								'DD MMM, YYYY'
							)}`}</a>
						</li>
					</>
				</ul>
				<ul className="breadcrumb px-3">
					<>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Gravida: ${
								pregnancy_history?.gravida
									? pregnancy_history?.gravida.replace(/[^0-9]/g, '')
									: '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Para: ${
								pregnancy_history?.para || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Alive: ${
								pregnancy_history?.alive || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Miscarriages: ${
								pregnancy_history?.miscarriage || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Abortions: ${
								pregnancy_history?.abortion || '--'
							}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`Gestation Age: ${getGestationAge(
								item.lmp
							)}`}</a>
						</li>
						<li className="breadcrumb-item">
							<a className="no-pointer">{`No. of days to delivery: ${moment(
								item.edd
							).diff(moment(), 'days')} day(s)`}</a>
						</li>
					</>
				</ul>
			</div>
		)
	);
};

export default AncBlock;
