import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';
import kebabCase from 'lodash.kebabcase';
import { connect } from 'react-redux';

import Reading from '../Patient/Reading';
import { formatDate } from '../../services/utilities';

const unit = 'mmHg';

const info = {
	title: 'Blood Pressure',
	type: kebabCase('Blood Pressure'),
	inputs: [
		{ name: 'systolic', title: 'Systolic', weight: '' },
		{ name: 'diastolic', title: 'Diastolic', weight: '' },
	],
};

const BloodPressure = ({ vitals, task, patient }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			let data = [];
			const cloneVitals = [...vitals];
			cloneVitals
				.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
				.forEach((item, index) => {
					const date = formatDate(item.createdAt, 'DD-MMM-YYYY h:mma');
					const items = item.reading.blood_pressure.split('/');
					const res = {
						name: date,
						systolic: items[0],
						diastolic: items[1],
					};
					data = [...data, res];
				});

			if (vitals.length > 0) {
				let lastReading = vitals[0];
				setCurrentVitals({
					...lastReading,
					_reading: lastReading.reading.blood_pressure,
				});
			}
			//.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
			setData(data);
		} catch (e) {}
	}, [vitals]);

	return (
		<div className="row vital">
			<div className="col-8">
				<div className="el-chart-w">
					<LineChart
						width={640}
						height={300}
						data={data}
						margin={{ top: 5, right: 20, bottom: 5, left: 30 }}
					>
						<Line
							name="systolic"
							type="monotone"
							dataKey="systolic"
							stroke="#8884d8"
						/>
						<Line
							name="diastolic"
							type="monotone"
							dataKey="diastolic"
							stroke="#82ca9d"
						/>
						<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis
							label={{
								value: `Blood Pressure (${unit})`,
								angle: -90,
								position: 'left',
							}}
						/>
						<Tooltip />
						<Legend />
					</LineChart>
				</div>
			</div>
			<Reading
				patient={patient}
				visible={visible}
				vital={currentVitals}
				info={info}
				setVisible={setVisible}
				unit={unit}
				task={task}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		vitals: state.patient.vitals.filter(c => c.readingType === info.title),
	};
};

export default connect(mapStateToProps)(BloodPressure);
